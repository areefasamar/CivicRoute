import { AUTHORITIES } from '../data/areas';
import { translations } from '../data/translations';

function formatDate(date, lang = 'en') {
  if (lang === 'sd') {
    const sindhiMonths = [
      'جنوري', 'فيبروري', 'مارچ', 'اپريل', 'مئي', 'جون',
      'جولاءِ', 'آگسٽ', 'سيپٽمبر', 'آڪٽوبر', 'نومبر', 'ڊسمبر'
    ];
    return `${date.getDate()} ${sindhiMonths[date.getMonth()]} ${date.getFullYear()}`;
  }
  if (lang === 'ur') {
    const urduMonths = [
      'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
      'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'
    ];
    return `${date.getDate()} ${urduMonths[date.getMonth()]} ${date.getFullYear()}`;
  }
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function generateLetter({ date, email, area, issue, description, hasVoice = false, hasPhoto = false, lang = 'en' }) {
  const authority = AUTHORITIES[area.authorityId];
  const dateStr = formatDate(date, lang);

  if (lang === 'sd') {
    return generateSindhiLetter({ dateStr, email, area, issue, description, authority, hasVoice, hasPhoto });
  }

  if (lang === 'ur') {
    return generateUrduLetter({ dateStr, email, area, issue, description, authority, hasVoice, hasPhoto });
  }

  const attachments = [];
  if (hasPhoto) attachments.push('photograph');
  if (hasVoice) attachments.push('voice recording');
  const attachmentText = attachments.length > 0
    ? `\n\nA ${attachments.join(' and ')} is attached for reference. Please acknowledge this complaint and advise on the expected time for action.`
    : '\n\nPlease acknowledge this complaint and advise on the expected time for action.';

  return `${dateStr}

To the ${authority.department} Officer,
${authority.department}
${authority.shortName}
${authority.city}, Pakistan

Subject: ${issue.label} at ${area.block}, ${area.label.split(',')[0]}

Dear ${authority.department} Officer,

I am writing to report a ${issue.label.toLowerCase()} at ${area.label}, ${authority.city}, in ${area.ward} (sample). ${description || 'The issue has been noticed recently and requires immediate attention.'}

Please arrange an inspection and take the necessary action to address this issue promptly. Residents of the area are affected and require your urgent assistance.
${attachmentText}

Thank you for your attention.

Yours faithfully,
A resident of ${area.block}
${area.label.split(',')[0]}, ${authority.city}
Email: ${email}`;
}

function generateUrduLetter({ dateStr, email, area, issue, description, authority, hasVoice, hasPhoto }) {
  const issueLabel = translations.ur.issues[issue.id] || issue.label;

  const attachments = [];
  if (hasPhoto) attachments.push('تصویر');
  if (hasVoice) attachments.push('صوتی ریکارڈ');
  const attachmentText = attachments.length > 0
    ? `\n\nحوالے کے لیے ${attachments.join(' اور ')} منسلک ہے۔ براہ کرم اس شکایت کی تصدیق فرمائیں اور حل کا متوقع وقت بتائیں۔`
    : '\n\nبراہ کرم اس شکایت کی تصدیق فرمائیں اور حل کا متوقع وقت بتائیں۔';

  return `${dateStr}

جناب افسر صاحب،
${authority.department}
${authority.shortName}
${authority.city}، پاکستان

موضوع: ${area.block}، ${area.label.split(',')[0]} میں ${issueLabel} کی اطلاع

جناب،

میں ${area.label}، ${authority.city}، ${area.ward} (نمونہ) میں ${issueLabel} کی اطلاع دینا چاہتا/چاہتی ہوں۔ ${description || 'یہ مسئلہ حال ہی میں نوٹس میں آیا ہے اور فوری توجہ کا متقاضی ہے۔'}

براہ کرم معائنے کا انتظام کریں اور اس مسئلے کو جلد از جلد حل کریں۔ علاقے کے مکینوں کو آپ کی فوری مدد کی ضرورت ہے۔
${attachmentText}

آپ کا شکریہ۔

آپ کا مخلص،
${area.block} کا ایک مکین
${area.label.split(',')[0]}، ${authority.city}
ای میل: ${email}`;
}

function generateSindhiLetter({ dateStr, email, area, issue, description, authority, hasVoice, hasPhoto }) {
  const issueLabel = translations.sd.issues[issue.id] || issue.label;

  const attachments = [];
  if (hasPhoto) attachments.push('تصوير');
  if (hasVoice) attachments.push('آواز جو رڪارڊ');
  const attachmentText = attachments.length > 0
    ? `\n\nحوالي لاءِ ثبوت طور ${attachments.join(' ۽ ')} منسلڪ آهي. مهرباني ڪري هن شڪايت جي رسيد ڏيو ۽ ڪارروائيءَ جو وقت ٻڌايو.`
    : '\n\nمهرباني ڪري هن شڪايت جي رسيد ڏيو ۽ مسئلي جي حل بابت آگاهي ڏيو.';

  return `${dateStr}

جناب آفيسر صاحب،
${authority.department}
${authority.shortName}
${authority.city}، پاڪستان

موضوع: ${area.block}، ${area.label.split(',')[0]} ۾ ${issueLabel} بابت شڪايت

محترم جناب،

مان هن خط ذريعي ${area.label}، ${authority.city}، ${area.ward} (نمونو) ۾ ${issueLabel} جي نشاندهي ڪرڻ چاهيان ٿو/ٿي. ${description || 'هي مسئلو گذريل ڪجهه وقت کان موجود آهي ۽ فوري ڌيان جو محتاج آهي.'}

مهرباني ڪري علائقي جي معائني لاءِ هدايت جاري ڪريو ۽ هي مسئلو جلد حل ڪيو وڃي ته جيئن شهري ڏکيائن کان بچي سگهن.
${attachmentText}

توهان جي سهڪار جي مهرباني.

توهان جو خيرانديش،
${area.block} جو رهواسي
${area.label.split(',')[0]}، ${authority.city}
اي ميل: ${email}`;
}
