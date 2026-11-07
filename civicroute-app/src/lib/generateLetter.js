import { AUTHORITIES } from '../data/areas';

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function generateLetter({ date, email, area, issue, description, lang = 'en' }) {
  const authority = AUTHORITIES[area.authorityId];
  const dateStr = formatDate(date);
  const hasPhoto = !!description; // description existence hints at photo too

  if (lang === 'ur') {
    return generateUrduLetter({ dateStr, email, area, issue, description, authority });
  }

  const photoLine = hasPhoto
    ? '\n\nA photograph is attached for reference. Please acknowledge this complaint and advise on the expected time for action.'
    : '\n\nPlease acknowledge this complaint and advise on the expected time for action.';

  return `${dateStr}

To the ${authority.department} Officer,
${authority.department}
${authority.shortName}
${authority.city}, Pakistan

Subject: ${issue.label} at ${area.block}, ${area.label.split(',')[0]}

Dear ${authority.department} Officer,

I am writing to report a ${issue.label.toLowerCase()} at ${area.label}, ${authority.city}, in ${area.ward} (sample). ${description || `The issue has been noticed recently and requires immediate attention.`}

Please arrange an inspection and take the necessary action to address this issue promptly. Residents of the area are affected and require your urgent assistance.
${photoLine}

Thank you for your attention.

Yours faithfully,
A resident of ${area.block}
${area.label.split(',')[0]}, ${authority.city}
Email: ${email}`;
}

function generateUrduLetter({ dateStr, email, area, issue, description, authority }) {
  return `${dateStr}

جناب افسر صاحب،
${authority.department}
${authority.shortName}
${authority.city}، پاکستان

موضوع: ${area.block}، ${area.label.split(',')[0]} میں ${issue.label} کی اطلاع

جناب،

میں ${area.label}، ${authority.city}، ${area.ward} (نمونہ) میں ${issue.label.toLowerCase()} کی اطلاع دینا چاہتا/چاہتی ہوں۔ ${description || 'یہ مسئلہ حال ہی میں نوٹس میں آیا ہے اور فوری توجہ کا متقاضی ہے۔'}

براہ کرم معائنے کا انتظام کریں اور اس مسئلے کو جلد از جلد حل کریں۔ علاقے کے مکینوں کو آپ کی فوری مدد کی ضرورت ہے۔

آپ کا شکریہ۔

آپ کا مخلص،
${area.block} کا ایک مکین
${area.label.split(',')[0]}، ${authority.city}
ای میل: ${email}`;
}
