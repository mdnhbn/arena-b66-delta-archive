# ক্লাস 07 — পাঠনোট ও Google Advanced Search / Dork

NotebookLM-ভিত্তিক পূর্ণ অডিওর পাঠনোট · ট্রান্সক্রিপ্ট ও AI সারাংশ মিলিয়ে সম্পাদিত

পর্যালোচনার ভিত্তি
১৪ আগস্ট ২০২৬, শুক্রবারের SQLi WAF ও IDS ক্লাসের সম্পূর্ণ অডিও NotebookLM-এ বিশ্লেষণ করা হয়েছে। মূল রেকর্ডিং ৭৯৭৭.৪০১ সেকেন্ড; অডিও ৭৯৭৭.২৫৯ সেকেন্ড। ট্রান্সক্রিপ্টে শুরুর আলোচনা থেকে শেষের প্রশ্নোত্তর ও বিদায় পর্যন্ত বক্তব্য আছে। এটি অডিওর সম্পাদিত পাঠনোট; ভিডিওর প্রতিটি ফ্রেম, পর্দার সব URL বা tool version যাচাইয়ের দাবি নয়। আগের রেকর্ড-পর্দা যাচাইয়ের তারিখ বহাল আছে; অডিও থেকে নতুন কোনো নির্দিষ্ট পঞ্জিকা তারিখ বা নির্ভুল chapter timestamp পাওয়া যায়নি।

১. শেখার ধারাবাহিকতা
শুরুতে আগের SQL Injection ও XSS ক্লাসের প্রশ্ন আলোচনা হয়েছে। এরপর Web Application Firewall (WAF), Intrusion Detection System (IDS) ও Intrusion Prevention System (IPS)-এর ভূমিকা বোঝানো হয়। পরবর্তী প্রদর্শনগুলোতে request-এর গঠন, application response, filtering এবং backend ব্যাখ্যার পার্থক্য আলোচনা হয়। তৈরি করা query বা script কপি করার বদলে কোন input কোথায় পৌঁছায় এবং কেন ভিন্ন ফল আসে, তা বুঝতে বলা হয়েছে।

২. WAF, IDS ও IPS কী করে
• WAF HTTP application traffic-এর ওপর নিয়ম প্রয়োগ করতে পারে। এটি appliance, software module বা অন্য deployment-এ থাকতে পারে; শুধু আলাদা hardware box নয়। কোনো rule একটি request আটকাতে পারে, কিন্তু WAF থাকা মানেই application-এর SQLi ত্রুটি সারানো হয়েছে—এমন নয়।
• IDS সন্দেহজনক কার্যক্রম শনাক্ত ও সতর্ক করার কাজে ব্যবহৃত হয়। IPS প্রতিরোধমূলক ব্যবস্থা নিতে পারে। একটি IPS সবসময় আলাদা IDS-এর অনুমতির ওপর নির্ভর করে—এমন বাধ্যবাধকতা নেই।
• Signature, anomaly ও protocol analysis-এর মতো পদ্ধতির সীমাবদ্ধতা আছে। “নতুন হুমকি কোনো IDS-ই ধরতে পারে না” বা “একটি আপডেট হলেই সব ধরা যাবে”—এমন চূড়ান্ত সিদ্ধান্ত নেওয়া ঠিক নয়। ক্লাসে threat intelligence ও VirusTotal-এর প্রসঙ্গ এই আলোচনার সঙ্গে এসেছে।

৩. Request, response ও ভুল ফল ব্যাখ্যা
ক্লাসে GET/POST, input filtering, 403 Forbidden/Access Denied এবং Not Acceptable ধরনের response নিয়ে প্রশ্ন এসেছে। শুধু এমন response দেখে WAF বা SQLi নিশ্চিত করা যায় না; application permissions, server rules, authentication ও অন্যান্য কারণও থাকতে পারে। নিজের অনুমোদিত ল্যাবে request-এর প্রেক্ষাপট, response এবং প্রাসঙ্গিক log মিলিয়ে কারণ লিখুন। Cookies বা browser data মুছলেই server-side access control উঠে যায়—এমন দাবি করা হচ্ছে না।
কোনো table-এর ফল না পাওয়া মানেই WAF আটকেছে নয়। Data না থাকা, permission, query logic বা application-এর আচরণও কারণ হতে পারে। শিক্ষার জন্য নিজস্ব test database-এর পরিচিত data ও empty table-এর পার্থক্য দেখুন; তৃতীয় পক্ষের data সংগ্রহের নির্দেশ এখানে রাখা হয়নি।

৪. প্রদর্শনের সীমা ও প্রতিরক্ষা
শিক্ষক query representation ও filter interpretation-এর পার্থক্যের মাধ্যমে WAF-এর সীমাবদ্ধতা আলোচনা করেছেন। এ নোটে কার্যকর evasion payload, third-party target list বা data extraction-এর নির্দেশনা নেই। শেখার মূল বিষয় হলো একটি filtering layer-এর ফলকে application-এর নিরাপত্তার সম্পূর্ণ প্রমাণ ধরে না নেওয়া।
আর্কাইভের অতিরিক্ত প্রতিরক্ষা ব্যাখ্যা: SQL query-এর code ও data আলাদা রাখতে parameterized query/prepared statement ব্যবহার করুন। প্রয়োজনমতো allow-list validation ও সীমিত database privileges যোগ করুন। Parameterization-কে শুধু “ইনপুট পরিষ্কার করা” বলা যথার্থ নয়; এটি query structure থেকে parameter value আলাদা রাখে। WAF সহায়ক স্তর, এই code-level প্রতিরক্ষার বিকল্প নয়।

৫. শিক্ষক-উল্লিখিত টুলস ও সংরক্ষিত রিসোর্স
• VirusTotal: file/URL বিশ্লেষণ ও একাধিক উৎসের ফল একত্র করার web service। এটি নিশ্চিত নিরাপত্তার সনদ নয়; false positive ও detection gap থাকতে পারে। “টুলস” ট্যাবে অফিসিয়াল service ও ব্যবহারবিধির লিংক আছে। কোনো installer দরকার বলে শিক্ষক নির্দেশ দিয়েছেন—এমন প্রমাণ পাওয়া যায়নি।
• Chrome, Edge, Firefox ও Brave নিয়ে আলোচনা আছে। অডিওতে বলা তুলনামূলক security শতাংশের পরীক্ষাপদ্ধতি বা নির্ভরযোগ্য উৎস পাওয়া যায়নি; সেগুলো বর্তমান browser ranking হিসেবে রাখা হয়নি। Edge ও পুরোনো Internet Explorer একই পণ্য নয়।
• WAF resource/cheat sheet, Security Idiots ব্লগ ও Notepad.pw-এ শেয়ার করা resource-এর উল্লেখ আছে। “ডকুমেন্ট” ট্যাবে আগে সংরক্ষিত SQLi WAF Class Resource এবং এই পাঠনোট পাওয়া যাবে। অডিওতে URL স্পষ্ট নয় বলে নতুন মূল file/link উদ্ধার হয়েছে বলে দাবি করা হচ্ছে না।
• কোনো নির্দিষ্ট IDS/IPS software package বা তার version নিশ্চিত হয়নি; ধারণাকে downloadable software হিসেবে দেখানো হয়নি।

৬. শিক্ষক-নির্ধারিত হোমওয়ার্ক ও প্রশাসনিক নির্দেশ
রেকর্ডিংয়ে WAF-সংক্রান্ত তিনটি কেসের URL ও পরিষ্কার screenshot-সহ কাজ জমা দেওয়ার নির্দেশ আছে। নির্দিষ্ট deadline বা PDF format-এর নিশ্চিত নির্দেশ পাওয়া যায়নি; কোনোটিই অনুমান করে যোগ করা হয়নি। মূল প্রদর্শনে data-সংক্রান্ত কাজ আলোচনা হয়েছে। বর্তমান অনুশীলনে নিজের বা নির্দিষ্ট অনুমতিপ্রাপ্ত ল্যাবের তিনটি কেস ব্যবহার করে পর্যবেক্ষণ, প্রমাণ ও প্রতিরক্ষা লিখুন—এটি আর্কাইভের পরিসর-সীমিত প্রয়োগ।
Resource group ও comments-এ দেওয়া হয়েছে বলে শিক্ষক জানান। Exam result পরে প্রকাশের কথা আছে, নতুন তারিখ নেই। One-to-one support-এর ব্যবস্থা জানতে support team-এর সঙ্গে কথা বলতে বলেন; ব্যবস্থা নিশ্চিত করেছেন—এমন দাবি নয়। পরের ক্লাসের নির্দিষ্ট তারিখও পাওয়া যায়নি।

৭. আর্কাইভের যোগ করা পুনরালোচনা ও অনুশীলন
এগুলো নতুন শিক্ষক-নির্ধারিত homework নয়।
• নিজের lab-এর request → WAF/application → response flow আঁকুন। একই HTTP status-এর অন্তত দুটি সম্ভাব্য কারণ লিখুন।
• IDS-এর alert ও IPS-এর prevention event-এর উদ্দেশ্য তুলনা করুন। একটি alert সত্য কি না যাচাই করতে কোন অতিরিক্ত প্রমাণ দরকার লিখুন।
• নিজের development app-এ parameter binding ও database least privilege পর্যালোচনা করুন। Query value ও query structure-এর পার্থক্য ব্যাখ্যা করুন।
• একটি public, non-sensitive sample-এর বিদ্যমান VirusTotal report পড়ে engine verdict, analysis date ও uncertainty আলাদা করুন। ব্যক্তিগত/গোপন file বা private URL সেখানে upload করবেন না। Public submissions ও report শেয়ার হতে পারে—অফিসিয়াল ব্যবহারবিধি আগে দেখুন।
• প্রশ্ন: WAF থাকলেই SQLi বন্ধ কেন বলা যায় না? 403 একা কী প্রমাণ করে? Table-এ data নেই ও access denied কীভাবে আলাদা করবেন? একটি browser-এর নিরাপত্তা শতাংশ যাচাই করতে কোন test context প্রয়োজন?

সম্পাদিত ব্যাখ্যার অফিসিয়াল রেফারেন্স
• OWASP WAF: https://owasp.org/www-community/Web_Application_Firewall
• OWASP SQLi প্রতিরক্ষা: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
• NIST SP 800-94 (IDPS): https://csrc.nist.gov/pubs/sp/800/94/final
• VirusTotal ব্যবহার ও sharing: https://docs.virustotal.com/docs/how-it-works

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। এগুলো আর্কাইভের নিজস্ব সীমিত উদাহরণ; মূল ভিডিওর হুবহু query-list হিসেবে দাবি করা হচ্ছে না।

শেখার সময় খেয়াল রাখুন
• নিজের lab-এর protection ও expected logs লিখুন।
• WAF আছে/নেই—Google ফল থেকে নিশ্চিত করবেন না।
• WAF/IDS ও নিরাপদ application code-এর কাজ আলাদা করে দেখুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. Exact phrase

```text
site:lab.example.org "WAF"
```

উদ্দেশ্য: নিজের প্রকাশ্য protection note। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. Exact phrase

```text
site:lab.example.org "security policy"
```

উদ্দেশ্য: নিজের policy documentation। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. File type + phrase

```text
site:lab.example.org filetype:pdf "IDS"
```

উদ্দেশ্য: নিজের প্রকাশ্য detection guide। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:owasp.org "Web Application Firewall"
```

উদ্দেশ্য: অফিসিয়াল background reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://owasp.org/www-community/Web_Application_Firewall
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
