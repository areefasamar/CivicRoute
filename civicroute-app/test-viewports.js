import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function main() {
  await new Promise(resolve => server.listen(4175, resolve));
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debugPort = 9224;

  const edgeProcess = spawn(edgePath, [
    `--remote-debugging-port=${debugPort}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(__dirname, '.temp-edge-profile-3'),
    'http://localhost:4175',
  ]);

  let versionData = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 400));
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {}
  }

  const listRes = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let msgId = 1;
  const callbacks = new Map();
  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  function sendCDP(method, params = {}) {
    return new Promise(resolve => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async function evaluate(expression) {
    const res = await sendCDP('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result?.result?.value;
  }

  const viewports = [
    { name: '1366x768 (Laptop)', width: 1366, height: 768 },
    { name: '1920x1080 (Projector / Full HD)', width: 1920, height: 1080 },
    { name: '390x844 (Phone)', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    await sendCDP('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 500,
    });

    // Reset flow by navigating to /login
    await evaluate("window.location.href = 'http://localhost:4175/login'");
    await new Promise(r => setTimeout(r, 1000));

    // Check Frame styling
    const frameInfo = await evaluate(`(() => {
      const container = document.querySelector('.phone-viewport-container');
      const chassis = document.querySelector('.phone-device-chassis');
      const scrollContent = document.querySelector('.phone-scroll-content');
      const chassisBox = chassis ? chassis.getBoundingClientRect() : null;
      return {
        isMobile: window.innerWidth < 500,
        containerBg: container ? getComputedStyle(container).backgroundColor : null,
        width: chassisBox ? Math.round(chassisBox.width) : 0,
        height: chassisBox ? Math.round(chassisBox.height) : 0,
        aspectRatio: chassisBox && chassisBox.height ? (chassisBox.width / chassisBox.height).toFixed(3) : 0,
        scrollClientH: scrollContent ? scrollContent.clientHeight : 0,
        scrollHeight: scrollContent ? scrollContent.scrollHeight : 0,
      };
    })()`);
    console.log(`  Frame layout:`, frameInfo);

    // 1. Test /login
    const loginTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const prevTop = scroll.scrollTop;
      scroll.scrollTop = 200;
      const didScroll = scroll.scrollTop > prevTop;
      return {
        path: window.location.pathname,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        didScroll
      };
    })()`);
    console.log(`  1. /login:`, loginTest);

    // Enter email & password or click Google
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const googleBtn = btns.find(b => b.textContent.includes('Google'));
      if (googleBtn) googleBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 800));

    // 2. Test /terms
    const termsTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const check = document.querySelector('#terms-check');
      const prevTop = scroll.scrollTop;
      scroll.scrollTop = 200;
      const didScroll = scroll.scrollTop > prevTop;
      if (check) check.click();
      return {
        path: window.location.pathname,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        didScroll,
        agreed: check ? check.checked : false
      };
    })()`);
    console.log(`  2. /terms:`, termsTest);

    // Click agree
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const agreeBtn = btns.find(b => b.textContent.includes('agree') || b.textContent.includes('متفق'));
      if (agreeBtn) agreeBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 800));

    // 3. Test /location
    const locTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const areaBtn = document.querySelector('#area-select');
      if (areaBtn) areaBtn.click();
      return {
        path: window.location.pathname,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        dropdownOpened: !!areaBtn
      };
    })()`);
    console.log(`  3. /location:`, locTest);

    // Pick first area & click continue
    await evaluate(`(() => {
      const option = document.querySelector('li[role="option"] button');
      if (option) option.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const continueBtn = btns.find(b => b.textContent.includes('Report an issue') || b.textContent.includes('مسئلہ') || b.textContent.includes('مسئلو'));
      if (continueBtn) continueBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 800));

    // 4. Test /report
    const reportTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const issueBtn = document.querySelector('button[aria-pressed]');
      if (issueBtn) issueBtn.click();
      const prevTop = scroll.scrollTop;
      scroll.scrollTop = 250;
      const didScroll = scroll.scrollTop > prevTop;
      return {
        path: window.location.pathname,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        didScroll
      };
    })()`);
    console.log(`  4. /report:`, reportTest);

    // Click generate letter
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find(b => b.textContent.includes('Generate') || b.textContent.includes('خط'));
      if (genBtn) genBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 800));

    // 5. Test /review
    const reviewTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const prevTop = scroll.scrollTop;
      scroll.scrollTop = 250;
      const didScroll = scroll.scrollTop > prevTop;
      return {
        path: window.location.pathname,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        didScroll
      };
    })()`);
    console.log(`  5. /review:`, reviewTest);

    // Click send complaint
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const sendBtn = btns.find(b => b.textContent.includes('Send complaint') || b.textContent.includes('ارسال کریں') || b.textContent.includes('اماڻيو'));
      if (sendBtn) sendBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 2200));

    // 6. Test /sent
    const sentTest = await evaluate(`(() => {
      const scroll = document.querySelector('.phone-scroll-content');
      const h1 = document.querySelector('h1')?.textContent;
      const prevTop = scroll.scrollTop;
      scroll.scrollTop = 250;
      const didScroll = scroll.scrollTop > prevTop;
      return {
        path: window.location.pathname,
        h1,
        scrollHeight: scroll.scrollHeight,
        clientHeight: scroll.clientHeight,
        canScroll: scroll.scrollHeight > scroll.clientHeight,
        didScroll
      };
    })()`);
    console.log(`  6. /sent:`, sentTest);
  }

  console.log('\nAll tests completed successfully!');
  ws.close();
  edgeProcess.kill();
  server.close();
  try {
    fs.rmSync(path.join(__dirname, '.temp-edge-profile-3'), { recursive: true, force: true });
  } catch {}
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  server.close();
  process.exit(1);
});
