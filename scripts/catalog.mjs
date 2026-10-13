const ORIGIN='https://arena-b66-delta-archive.vercel.app';
const line=value=>String(value??'').replace(/[\r\n|]/g,' ').replace(/[\[\]<>]/g,'').trim();
function link(value){
  try{const url=new URL(value,ORIGIN);return ['https:','http:'].includes(url.protocol)&&!url.username&&!url.password?url.href:null;}catch{return null;}
}
export function renderCatalog(data){
  const entries=data.entries||[],records=entries.filter(e=>e.category==='recordings').sort((a,b)=>a.recordingSerial-b.recordingSerial);
  const out=['# Delta Archive — পোস্ট ও রিসোর্স ক্যাটালগ','',
    'হালনাগাদ: '+line(data.updatedAt),'',
    `${records.length}টি মূল ক্লাস এবং ${entries.length}টি পোস্ট/রিসোর্সের বর্তমান সূচি। পূর্ণ লেখা ও নোট সাইট এবং data.json-এ আছে। এটি নতুন করে সকল মূল পোস্ট/ভিডিও সম্পূর্ণ যাচাই হয়েছে—এমন দাবি নয়।`,'',
    '## ক্লাসের সিরিয়াল','',
    '| ক্লাস | টপিক | ক্লাসের তারিখ | ভিডিও | পূর্ণ সামারি |',
    '|---|---|---|---|---|'];
  for(const record of records){
    const guide=entries.find(e=>e.id===record.searchStudyGuideId);
    out.push(`| ${record.recordingSerial} | [${line(record.topicTitle||record.title)}](${ORIGIN}/#class/${encodeURIComponent(record.id)}) | ${line(record.classDate||record.date)||'যাচাই বাকি'} | ${record.videoStatus==='ready'?'হোস্ট করা আছে':'যাচাই/হোস্টিং বাকি'} | ${guide?.fullRecordingSummaryReviewed?'ট্রান্সক্রিপ্ট যাচাই হয়েছে':'পূর্ণ বিশ্লেষণ বাকি'} |`);
  }
  out.push('','## সব পোস্ট ও রিসোর্স','');
  for(const entry of entries){
    const kind=entry.category==='recordings'?'class':'resource';
    out.push(`### ${line(entry.id)} — ${line(entry.topicTitle||entry.title)}`,'',
      `বিষয়: ${line(entry.topic)} · তারিখ: ${line(entry.classDate||entry.date)||'যাচাই বাকি'} · ধরন: ${line(entry.category)}`,'',
      `[বিস্তারিত, নোট ও সংযুক্তি](${ORIGIN}/#${kind}/${encodeURIComponent(entry.id)})`);
    const saved=[entry.documentUrl,entry.noteUrl,...(entry.preservedFiles||[]).map(f=>f.url)].filter(Boolean);
    for(const value of new Set(saved)){const href=link(value);if(href)out.push(`- [সংরক্ষিত ফাইল/নোট](${href})`);}
    for(const item of entry.downloadLinks||[]){const href=link(item.url);if(href)out.push(`- [${line(item.label)||'রিসোর্স'}](${href})`);}
    if(entry.publicationEdition)out.push('','প্রকাশিত পাঠ: '+line(entry.publicationEdition));
    out.push('');
  }
  out.push('## অফিসিয়াল সিলেবাস','');
  const syllabus=link(data.syllabus?.documentUrl);
  if(syllabus)out.push(`[মূল সংরক্ষিত syllabus PDF](${syllabus})`,'');
  out.push('## সংরক্ষণের সীমা','',
    'মূলে/বাহ্যিক হোস্টে থাকা লিংক নিজের স্বাধীন backup-এর সমান নয়। টুলসের card থাকলে সরাসরি installer আছে—এমন দাবি নয়। প্রথম চার ক্লাসের screen-date এবং সকল ভিডিওর পূর্ণ বিশ্লেষণের বাকি অবস্থা সাইটে দেখানো আছে।','');
  return out.join('\n');
}
