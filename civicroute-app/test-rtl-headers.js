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
  await new Promise(resolve => server.listen(4195, resolve));
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const debugPort = 9245;

  const edge = spawn(edgePath, [
    `--remote-debugging-port=${debugPort}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + path.join(__dirname, '.temp-edge-profile-verify'),
    'http://localhost:4195/login',
  ]);

  let versionData = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (res.ok) { versionData = await res.json(); break; }
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

  await sendCDP('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });

  const languages = ['en', 'ur', 'sd'];

  for (const lang of languages) {
    console.log(`\n========================================`);
    console.log(`TESTING LANGUAGE: ${lang.toUpperCase()}`);
    console.log(`========================================`);

    // Go to login first to set language
    await evaluate("window.location.href = 'http://localhost:4195/login'");
    await new Promise(r => setTimeout(r, 600));

    // Click language toggle button
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const targetBtn = btns.find(b => {
        const text = b.textContent.trim();
        if ('${lang}' === 'ur') return text === 'اردو';
        if ('${lang}' === 'sd') return text === 'سنڌي';
        return text === 'English' || text === 'EN';
      });
      if (targetBtn) targetBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));

    // Check login header
    const loginHeader = await evaluate(`(() => {
      const logoSvg = document.querySelector('svg[aria-label="CivicRoute"]');
      const logoText = logoSvg ? logoSvg.querySelector('text') : null;
      const toggle = document.querySelector('[role="radiogroup"]');
      const logoBox = logoSvg ? logoSvg.getBoundingClientRect() : null;
      const textBox = logoText ? logoText.getBoundingClientRect() : null;
      const toggleBox = toggle ? toggle.getBoundingClientRect() : null;

      const overlap = (logoBox && toggleBox) ? (
        Math.max(logoBox.left, toggleBox.left) < Math.min(logoBox.right, toggleBox.right)
      ) : false;

      return {
        path: '/login',
        dir: document.documentElement.dir,
        logo: logoBox ? { left: Math.round(logoBox.left), right: Math.round(logoBox.right), width: Math.round(logoBox.width) } : null,
        toggle: toggleBox ? { left: Math.round(toggleBox.left), right: Math.round(toggleBox.right), width: Math.round(toggleBox.width) } : null,
        textBox: textBox ? { left: Math.round(textBox.left), right: Math.round(textBox.right) } : null,
        textInsideLogo: textBox && logoBox ? (textBox.left >= logoBox.left - 2 && textBox.right <= logoBox.right + 2) : false,
        overlap,
        gap: (logoBox && toggleBox) ? (
          document.documentElement.dir === 'rtl' ? Math.round(logoBox.left - toggleBox.right) : Math.round(toggleBox.left - logoBox.right)
        ) : null
      };
    })()`);
    console.log(`  Route /login (${lang}):`, loginHeader);

    // Now log in so other routes are accessible
    await evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const gBtn = btns.find(b => b.textContent.includes('Google'));
      if (gBtn) gBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 600));

    // Check /terms header
    const termsHeader = await evaluate(`(() => {
      const logoSvg = document.querySelector('svg[aria-label="CivicRoute"]');
      const logoText = logoSvg ? logoSvg.querySelector('text') : null;
      const toggle = document.querySelector('[role="radiogroup"]');
      const logoBox = logoSvg ? logoSvg.getBoundingClientRect() : null;
      const textBox = logoText ? logoText.getBoundingClientRect() : null;
      const toggleBox = toggle ? toggle.getBoundingClientRect() : null;

      const overlap = (logoBox && toggleBox) ? (
        Math.max(logoBox.left, toggleBox.left) < Math.min(logoBox.right, toggleBox.right)
      ) : false;

      return {
        path: '/terms',
        logo: logoBox ? { left: Math.round(logoBox.left), right: Math.round(logoBox.right) } : null,
        toggle: toggleBox ? { left: Math.round(toggleBox.left), right: Math.round(toggleBox.right) } : null,
        textInsideLogo: textBox && logoBox ? (textBox.left >= logoBox.left - 2 && textBox.right <= logoBox.right + 2) : false,
        overlap,
        gap: (logoBox && toggleBox) ? (
          document.documentElement.dir === 'rtl' ? Math.round(logoBox.left - toggleBox.right) : Math.round(toggleBox.left - logoBox.right)
        ) : null
      };
    })()`);
    console.log(`  Route /terms (${lang}):`, termsHeader);
  }

  ws.close();
  edge.kill();
  server.close();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
