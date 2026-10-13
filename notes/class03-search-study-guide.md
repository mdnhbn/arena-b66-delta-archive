# ক্লাস 03 — পাঠনোট ও Google Advanced Search / Dork

পূর্ণ ট্রান্সক্রিপ্টভিত্তিক সামারি পর্যালোচিত

পর্যালোচনার ভিত্তি
সম্পূর্ণ ২:১১:১৩ রেকর্ডিং থেকে বাংলা auto-transcript তৈরি ও সংরক্ষণ করা হয়েছে। শুরু, OSINT আলোচনা এবং শেষের homework/বিদায় অংশ উপস্থিত। সময়চিহ্ন নেই; সামারি শ্রবণভিত্তিক।

টপিকের সঙ্গে সম্পর্ক
OSINT source verification ও নিজের organization's প্রকাশ্য content inventory।

রেকর্ডিংয়ের বিস্তারিত সারাংশ
OSINT ক্লাসে প্রকাশ্য তথ্য থেকে প্রয়োজনীয় পর্যবেক্ষণ সংগ্রহ, তথ্যের বিশ্বাসযোগ্যতা যাচাই এবং বিচ্ছিন্ন তথ্যকে একটি ব্যাখ্যায় সাজানোর ধারণা আলোচিত হয়েছে। প্রথম অংশে মোবাইল নেটওয়ার্ক, GSM, cellular tower ও last radio location নিয়ে আলোচনা আছে। এরপর IP address, shared/dedicated IP এবং network log-এর ভূমিকা ব্যাখ্যা করা হয়েছে। এই ধারণাগুলো location data-এর সীমাবদ্ধতা বোঝার জন্য; কারও ব্যক্তিগত অবস্থান অনুসরণ করার নির্দেশনা হিসেবে দেওয়া হচ্ছে না।

Domain registration তথ্য, Whois lookup এবং পুরোনো web page দেখার জন্য web archive-এর ব্যবহার উল্লেখ করা হয়েছে। পুরোনো ও বর্তমান পেজের তথ্য এক নাও হতে পারে; তাই source URL, সংগ্রহের তারিখ এবং তথ্যটি historical না current—তা লিখে রাখা জরুরি। প্রকাশ্য তথ্য পেলেও সেটিকে ব্যক্তির পরিচয় বা বর্তমান অবস্থানের নিশ্চিত প্রমাণ হিসেবে ধরা যাবে না। এ ব্যাখ্যা আর্কাইভের যোগ করা অংশ।

ট্রান্সক্রিপ্টে IP logging এবং social engineering-এর ঝুঁকির আলোচনা আছে। নোটে গোপনে visitor শনাক্ত করা, ব্যক্তিগত যোগাযোগ তথ্য উদ্ধার বা কারও পরিবার/বন্ধুদের লক্ষ্য করার workflow অন্তর্ভুক্ত করা হয়নি। অনুশীলনের জন্য নিজের organization বা অনুমোদিত lab-এর প্রকাশ্য content inventory ব্যবহার করুন।

Google search প্রসঙ্গে site: দিয়ে ফল সীমিত করার উল্লেখ পাওয়া গেছে। আলাদা জটিল Dork তালিকা এই অডিও থেকে নিশ্চিত হয়নি। নিচের exact phrase, filetype ও URL উদাহরণগুলো সহায়ক অনুশীলন। এগুলো দিয়ে নিজের সাইটের প্রকাশ্য documentation, about page ও security policy খুঁজে তথ্যের উৎস মিলিয়ে দেখা যাবে।

যোগ করা অনুশীলন: নিজের test organization's বর্তমান ও archived page তুলনা করুন, কোন তথ্য সরাসরি দেখা গেছে আর কোনটি অনুমান তা আলাদা করুন, এবং একটি source log লিখুন। তথ্য সংগ্রহের উদ্দেশ্য, scope ও privacy-এর সীমা শুরুতেই নির্ধারণ করুন।

রেকর্ডিংয়ে Dork-এর প্রমাণ ও যোগ করা উদাহরণ
অডিওতে site: অপারেটরের উল্লেখ আছে। অন্য query-গুলো আর্কাইভের যোগ করা, অনুমোদিত scope-এ সীমিত অনুশীলন।

শেখার সময় খেয়াল রাখুন
• Current এবং historical তথ্য আলাদা করুন।
• তথ্য ও অনুমান আলাদা কলামে লিখুন।
• ব্যক্তিগত পরিচয়, যোগাযোগ বা অবস্থান সংগ্রহের বদলে নিজের lab content ব্যবহার করুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. Exact phrase

```text
site:lab.example.org "about"
```

উদ্দেশ্য: নিজের organization-এর প্রকাশ্য পরিচিতি। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. File type

```text
site:lab.example.org filetype:pdf
```

উদ্দেশ্য: নিজের lab-এর প্রকাশ্য নথি। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. URL

```text
site:lab.example.org inurl:docs
```

উদ্দেশ্য: Documentation URL inventory। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Exact phrase

```text
site:lab.example.org "security policy"
```

উদ্দেশ্য: নিজের domain-এর প্রকাশিত policy। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://developers.google.com/search/docs/monitor-debug/search-operators
- https://support.google.com/websearch/answer/2466433?hl=en
