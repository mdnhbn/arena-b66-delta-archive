# ক্লাস 09 — পাঠনোট ও Google Advanced Search / Dork

NotebookLM-ভিত্তিক সম্পাদিত পাঠনোট — ক্লাস ০৯

পর্যালোচনার ভিত্তি
শিক্ষক-দেওয়া ২:০১:৫১ দৈর্ঘ্যের সম্পূর্ণ রেকর্ড থেকে অডিও তৈরি করে NotebookLM-এ ট্রান্সক্রিপ্ট ও সারাংশ প্রস্তুত করা হয়েছে। সারাংশের সঙ্গে মূল ট্রান্সক্রিপ্টের homework, টুলের নাম ও শেষের ঘোষণা মিলিয়ে এই নোট সম্পাদিত। স্বয়ংক্রিয় transcription-এ উচ্চারণ ও নামের ভুল থাকতে পারে। প্রতিটি ভিডিও ফ্রেম সম্পূর্ণ পুনরায় দেখা হয়নি; নির্ভরযোগ্য chapter timestamp পাওয়া যায়নি। মূল রেকর্ড ক্লাসের ভিডিও অংশে আছে।

ক্লাসের ধারাবাহিক বিষয়
১. Cyber warfare-এর আলোচনার পর website defacement-এর ধারণা এসেছে: অনুমতি ছাড়া কোনো সাইটের দৃশ্যমান চেহারা বা বার্তা বদলানো। এখানে শেখার অনুশীলন নিজের স্থানীয় HTML পেজে সীমিত রাখুন।
২. নমুনা পেজের গঠন: একটি নাম, ছবি, বার্তা, greetings এবং presentation। HTML কাঠামো, CSS রং ও বিন্যাস, JavaScript অতিরিক্ত interaction বা animation দিতে পারে। সব উদাহরণে JavaScript বাধ্যতামূলক নয়।
৩. টেমপ্লেটের HTML/CSS পড়া, নিজের লেখা বসানো, ছবি ও styling সম্পাদনা এবং browser preview দেখানো হয়েছে। টেমপ্লেট কপি করলেই তার বাইরের script বা asset বিশ্বাসযোগ্য হয়ে যায় না।
৪. দৃশ্যমান static HTML পেজ এবং server-side web shell এক জিনিস নয়। পেজের চেহারা বদলানো আর server-এ code execution-এর ঝুঁকি আলাদা বিষয়।
৫. সাধারণ uploader এবং বেশি ক্ষমতার web shell-এর পার্থক্য দেখানো হয়েছে। নিরাপত্তার শিক্ষাটি হলো—আপলোড গ্রহণ, ফাইল সংরক্ষণ এবং executable code চালানোর অনুমতি আলাদা করে নিয়ন্ত্রণ করতে হয়। এখানে shell payload বা upload/bypass করার কার্যকর ধাপ দেওয়া হয়নি।
৬. Backdoor-কে বিকল্প অননুমোদিত প্রবেশপথ ও persistence-এর ধারণা দিয়ে বোঝানো হয়েছে। প্রাথমিক ত্রুটি ঠিক করলেই পূর্বে ঢোকানো অননুমোদিত পরিবর্তন দূর হয়েছে—এমন ধরে নেওয়া যায় না।

শিক্ষক-উল্লিখিত টুলস ও রিসোর্স
VS Code ও বিকল্প হিসেবে Notepad/অন্য text editor; CodePen-এর HTML/CSS/JS নমুনা; ছবি প্রসঙ্গে Imgur ও Remove.bg; পুরোনো Cyberfox browser; leet-name generator এবং GitHub-এর উল্লেখ আছে। WSO ও Alpha-সহ shell-এর নাম আলোচনা করা হয়েছে; এগুলোকে সাধারণ editor-এর মতো নিরাপদ software হিসেবে ধরে নেওয়া যাবে না। অস্পষ্ট নাম, নির্দিষ্ট release বা শিক্ষকের repository URL অনুমান করা হয়নি। সংশ্লিষ্ট টুলস ট্যাবে VS Code-এর অফিসিয়াল download/setup এবং CodePen-এর অফিসিয়াল documentation দেওয়া হয়েছে। এগুলো বর্তমান vendor reference; রেকর্ডিংয়ে একই version ব্যবহৃত হয়েছিল—এমন দাবি নয়।

শিক্ষকের নির্দিষ্ট homework
নিজের একটি HTML পেজ তৈরি করুন, স্থানীয় browser-এ খুলে পেজটির screenshot নিন। Screenshot Google Docs-এ দিয়ে সেই document-এর link আগের নিয়মে homework panel-এ জমা দিতে বলেছেন। শিক্ষক আলাদা practice site দিলে কেবল সেই অনুমোদিত lab-এর নির্দেশ অনুসরণ করুন। এই অংশের homework হিসেবে বাস্তব তৃতীয় পক্ষের সাইটে shell বা backdoor বসানোর কথা নেওয়া হয়নি। জমার নির্দিষ্ট deadline বা অতিরিক্ত screenshot-এর সংখ্যা নিশ্চিত পাওয়া যায়নি। কোর্সের আসল homework panel/ঘোষণার সঙ্গে জমার নিয়ম মিলিয়ে নিন।

পরবর্তী ক্লাস ও অনুসন্ধানের সীমা
পরের ক্লাসে shell/file-upload প্রসঙ্গ আরও বিস্তারিত আসবে বলে জানিয়েছেন; backdoor নিয়ে আলাদা advanced class হবে—এমন প্রতিশ্রুতি দেননি। ভিডিওর অডিও থেকে হুবহু Google Dork-এর পূর্ণ তালিকা যাচাই হয়নি। নিচের সীমিত search উদাহরণ আর্কাইভের যোগ করা; শিক্ষক ভিডিওতে ঠিক এই query বলেছেন—এমন দাবি নয়।

সম্পাদকীয় স্পষ্টীকরণ — ক্লাসের বক্তব্য থেকে আলাদা
Backdoor সবসময় encrypted হয় না, এবং সেটি কখনোই খুঁজে পাওয়া যাবে না—এটি ঠিক নয়। Code review, file-integrity পরীক্ষা ও যাচাই করা পরিচ্ছন্ন backup incident response-এর অংশ হতে পারে। Extension, ঘোষিত MIME type এবং file content/signature আলাদা পরীক্ষা; শুধু নাম বা MIME দেখে নিরাপত্তা নিশ্চিত হয় না। বাড়তি প্রতিরক্ষামূলক পড়া: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

আর্কাইভের যোগ করা ৩টি অনুশীলন
১. স্থানীয় HTML/CSS দিয়ে নিজের পরিচিতি পেজ বানিয়ে HTML ও CSS-এর পরিবর্তন আলাদা করে পর্যবেক্ষণ করুন; কোনো বাইরের script প্রয়োজন নেই।
২. নিজের দুটি test file-এর আগে-পরে hash বা version-control diff তুলনা করে অনাকাঙ্ক্ষিত পরিবর্তন শনাক্ত করার ছোট checklist লিখুন।
৩. নিজের upload feature-এর জন্য extension allowlist, content validation, সংরক্ষণস্থল, execution permission ও access control-এর আলাদা checklist তৈরি করুন। কোনো web shell চালানোর প্রয়োজন নেই।

নিজেকে প্রশ্ন করুন
Static page, server-side shell এবং backdoor-এর পার্থক্য কী? নিজের পেজে ছবির path ভুল হলে কী দেখাবে? একটি upload সফল হওয়া কেন server-side execution-এর প্রমাণ নয়? মূল ত্রুটি সংশোধনের পরও কেন integrity ও backup যাচাই দরকার?

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। এগুলো আর্কাইভের নিজস্ব সীমিত উদাহরণ; মূল ভিডিওর হুবহু query-list হিসেবে দাবি করা হচ্ছে না।

শেখার সময় খেয়াল রাখুন
• নিজের app-এর অনুমোদিত upload entry points তালিকাভুক্ত করুন।
• Upload page পাওয়া মানেই executable file গ্রহণ বা shell execution সম্ভব নয়।
• File storage ও execution permission আলাদা রাখার ধারণা পড়ুন; shell payload এখানে দেওয়া হয়নি।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. URL

```text
site:lab.example.org inurl:upload
```

উদ্দেশ্য: নিজের indexed upload URL inventory। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. Title

```text
site:lab.example.org intitle:"Upload"
```

উদ্দেশ্য: নিজের upload-সম্পর্কিত page title। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Exact phrase

```text
site:lab.example.org "file storage"
```

উদ্দেশ্য: নিজের storage design note। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:cheatsheetseries.owasp.org "File Upload Cheat Sheet"
```

উদ্দেশ্য: অফিসিয়াল upload defense reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
