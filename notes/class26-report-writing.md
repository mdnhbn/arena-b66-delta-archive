# ক্লাস ২৬ — Report Writing: পাঠনোট ও হোমওয়ার্ক

রবিবার, ১৮ অক্টোবর ২০২৬ · প্রশিক্ষক: Syed Sakib Alam Mubin

পর্যালোচনার সীমা
দ্বিতীয় অংশের সম্পূর্ণ ৭৩:০৮ অডিও (৪৩৮৮.০১১ সেকেন্ড) NotebookLM-এ বিশ্লেষণ করা হয়েছে। প্রথম ২২:৩১ ভিডিওর শুধু ০৯:৩৭.৫০০–১৮:০৫.৬৪০-এর বিচ্ছিন্ন Facebook স্বয়ংক্রিয় captions পাওয়া গেছে। তাই এটি পাওয়া উৎসের সম্পাদিত নোট; পুরো দুই অংশের সম্পূর্ণ অডিও বা প্রতিটি ভিডিও ফ্রেম দেখার দাবি নয়। স্বয়ংক্রিয় লেখায় বানান ও নামের ভুল থাকতে পারে। দ্বিতীয় অংশ Dailymotion-এ সংরক্ষিত; প্রথম অংশের আলাদা hosting বাকি।

১. বাগ রিপোর্ট ও পূর্ণ pentest report
বাগ রিপোর্টে একটি নির্দিষ্ট finding-এর প্রমাণ ও প্রভাব বোঝানো হয়। পূর্ণ pentest report-এ কাজের scope, পদ্ধতি, একাধিক finding, সীমাবদ্ধতা এবং সামগ্রিক ফল সাজানো হয়। কোন audience-এর জন্য লেখা হচ্ছে, সেই অনুযায়ী ভাষা ও বিস্তারিত বাছতে হবে। শুধু scanner-এর output পাঠানো আর যাচাই করা নিজস্ব report লেখা একই কাজ নয়।

২. একটি finding-এর লেখার ধারা
স্পষ্ট title/name → সংক্ষিপ্ত description → অনুমোদিত affected component → যাচাইকৃত evidence ও reproduction-এর বিবরণ → পরীক্ষার environment → impact → remediation → প্রয়োজনীয় screenshot/সংক্ষিপ্ত PoC সংযুক্তি। ভিডিওতে প্রতিটি ধাপ পরিষ্কারভাবে লেখার গুরুত্ব এসেছে। এখানে বাস্তব target, exploit payload, credential বা ব্যক্তিগত IP প্রকাশ করা হয়নি। Public নমুনায় ব্যক্তিগত তথ্য ও secret ঢেকে দিন; অনুমোদিত recipient-কে প্রয়োজন অনুযায়ী মূল evidence দিন।

৩. Executive Summary ও Technical Details
Executive Summary অকারিগরি পাঠককে scope, গুরুত্বপূর্ণ ঝুঁকি ও পরবর্তী করণীয় অল্প কথায় বোঝাবে। Technical অংশে developer ও security reviewer-এর জন্য finding, প্রমাণ, environment, সীমা এবং সংশোধনের কারণ থাকবে। Cover page, confidentiality notice, document details/version, team roles, table of contents, findings ও test-case তালিকার নমুনা দেখানো হয়েছে। অন্য প্রতিষ্ঠানের নাম, logo বা ফল নিজের কাজ হিসেবে ব্যবহার করবেন না।

৪. Severity, impact ও ফল যাচাই
Critical/High/Medium/Low/Informational শ্রেণি এবং CVSS আলোচনায় এসেছে। Score finding-এর বাস্তব পরিস্থিতি ও প্রভাবের সঙ্গে মিলিয়ে ব্যাখ্যা করতে হবে; AI-এর বলা সংখ্যা একা প্রমাণ নয়। Scanner alert নিশ্চিত bug নয়; manual যাচাই ও scope দরকার। কোনো নির্দিষ্ট test-case সংখ্যা করলেই সব vulnerability ধরা পড়বে—এমন নিশ্চয়তা নেই। Impact না দেখানো আর finding আদৌ নেই—এই দুই সিদ্ধান্তও এক নয়; platform policy ও পরীক্ষার সীমা বিবেচ্য।

৫. টুলস, AI ও রেফারেন্সের ভূমিকা
ক্লাসে Acunetix, Nuclei, Nikto, Nessus, SQLmap, Burp Suite, OWASP ZAP ও Postman-এর কথা এসেছে। এগুলো ভিন্ন কাজের টুল; সবগুলো নতুন করে install করা এই ক্লাসের homework হিসেবে ঘোষণা পাওয়া যায়নি। আগের ক্লাসের tool cards ও official setup ব্যবহার করুন। ChatGPT, Gemini ও DeepSeek লেখার সহায়ক হিসেবে এসেছে; তাদের লেখা, score বা remediation নিজে যাচাই করতে হবে। Client-এর গোপন তথ্য অনুমতি ছাড়া AI-তে দেবেন না।

৬. Report template ও মূল ফাইল
গ্রুপে শেয়ার করা PentestReports.com report/template library সংযুক্ত আছে। ভিডিওতে Astra-র report format আলোচিত এবং শিক্ষকের PC-তে “BUG reportt.pdf” নামের চার পৃষ্ঠার sample দেখা গেছে। শিক্ষক demo দেবেন বলেছেন; ওই মূল PDF-এর downloadable copy পাওয়া যায়নি। নিচের নিজস্ব worksheet সেই মূল PDF নয়। কোর্সের ভবিষ্যৎ update-এ মূল ফাইল পাওয়া গেলে আলাদা provenance দিয়ে যুক্ত করা যাবে।

৭. শিক্ষকের নির্ধারিত হোমওয়ার্ক
নিজেদের আগের homework/practice থেকে একটি সাইটের একটি finding বেছে একটি নির্দিষ্ট bug report তৈরি করে submit করতে বলেছেন। সাধারণ scanner dump-এর বদলে নিজস্ব সাজানো report দরকার। জমার সংখ্যা: একটি report। নির্দিষ্ট deadline, জমার channel বা বাধ্যতামূলক file extension এই পর্যালোচিত অংশে নিশ্চিত হয়নি। আর্কাইভের scope নির্দেশনা: কেবল নিজের বা স্পষ্ট অনুমতিপ্রাপ্ত lab-এর কাজ ব্যবহার করুন। ডকুমেন্ট ট্যাবে homework ও worksheet আলাদা আছে।

৮. ঘোষণা ও পরের বিষয়
কোথায় client/site পাওয়া যায় এবং bug-bounty platform নিয়ে পরের ক্লাসে আলোচনা করার কথা এসেছে। HackerOne, Bugcrowd, Intigriti ও YesWeHack-এর পরিচয় উল্লেখ হয়েছে; account খোলা বা প্রথম report সত্যি submit করার পূর্ণ প্রক্রিয়া সম্পন্ন হয়েছে—এমন প্রমাণ পাওয়া যায়নি। তাই সিলেবাসে এগুলো পরিচিতি/আংশিক অগ্রগতি। নির্দিষ্ট পরের তারিখ নতুন করে অনুমান করা হয়নি।

আর্কাইভের যোগ করা অনুশীলন — শিক্ষকের নতুন assignment নয়
১. অনুমোদিত lab-এর একটি finding নিয়ে worksheet পূরণ করুন; evidence-এর সঙ্গে প্রতিটি দাবি মিলিয়ে দেখুন।
২. একই finding-এর জন্য তিন বাক্যের executive summary ও আলাদা technical explanation লিখুন।
৩. প্রকাশের আগে report থেকে ব্যক্তিগত তথ্য/secret সরিয়ে source attribution ও remediation যাচাই করুন।

পুনরালোচনার প্রশ্ন
বাগ রিপোর্ট ও পূর্ণ pentest report-এর পার্থক্য কী? Scanner alert যাচাই ছাড়া নিশ্চিত finding বলা যায় না কেন? Executive Summary কার জন্য? Severity-এর ব্যাখ্যা ছাড়া শুধু score দিলে কী অসম্পূর্ণ থাকে? মূল teacher PDF ও আর্কাইভের worksheet কীভাবে আলাদা করবেন?

সিলেবাসের সঙ্গে মিল
অফিসিয়াল Version 7.0 PDF পৃষ্ঠা ৫-এর Website Penetration Testing-এর scope/process ও tools/manual process-এর সঙ্গে এই report-writing lesson মেলে। একই পৃষ্ঠার HackerOne/Bugcrowd অংশে platform পরিচিতি ও report ধারণার আংশিক অগ্রগতি যুক্ত করা হয়েছে। সম্পূর্ণ module বা platform-এ First Bug Report জমা complete হিসেবে চিহ্নিত নয়।

উৎস: ক্লাসের মূল দুই Facebook replay, শিক্ষকপ্রদত্ত ৭৩:০৮ recording, NotebookLM-এর Part2 transcript/summary, Part1-এর পাওয়া captions এবং নির্বাচিত recording-screen date। যাচাই: ১৯ অক্টোবর ২০২৬। Raw transcript/ব্যক্তিগত report public করা হয়নি। নিচের চারটি search উদাহরণ আর্কাইভের reference search; শিক্ষক-উদ্ধৃত dork বা vulnerable-site তালিকা নয়।
