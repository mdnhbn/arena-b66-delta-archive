# ক্লাস 02 — পাঠনোট ও Google Advanced Search / Dork

পূর্ণ ট্রান্সক্রিপ্টভিত্তিক সামারি পর্যালোচিত

পর্যালোচনার ভিত্তি
মূল রেকর্ডিংয়ের সম্পূর্ণ অডিও ২:০০:৩৫ থেকে বাংলা auto-transcript তৈরি ও সংরক্ষণ করা হয়েছে। শুরু ও শেষের কথোপকথন উপস্থিত। অডিও ট্রান্সক্রিপ্টে নির্ভরযোগ্য সময়চিহ্ন নেই; টাইমস্ট্যাম্প বানিয়ে যোগ করা হয়নি।

টপিকের সঙ্গে সম্পর্ক
Cyber safety এবং SQLi tool-এর ফলকে সঠিকভাবে বোঝা।

রেকর্ডিংয়ের বিস্তারিত সারাংশ
এই ক্লাসের রেকর্ডিংয়ে প্রথমে cyber safety, এরপর cyber security-এর গুরুত্ব এবং শেষে tools দিয়ে SQL injection-এর পরিচয় দেওয়া হয়েছে। ক্লাউডে রাখা ছবি, password ও account activity-এর গোপনীয়তা, ভেতরের কর্মী বা insider-এর ঝুঁকি এবং hardware keylogger-এর মতো ডিভাইস নিয়ে আলোচনা রয়েছে। হার্ডওয়্যারের উল্লেখ এখানে ঝুঁকি বোঝানোর প্রসঙ্গে রাখা হয়েছে; ব্যক্তিগত তথ্য সংগ্রহের কৌশল দেওয়া হচ্ছে না।

ওয়েব অ্যাপের database কেন গুরুত্বপূর্ণ এবং অনিরাপদ input handling-এর ফলে তথ্য প্রকাশের ঝুঁকি কীভাবে তৈরি হতে পারে, তা আলোচিত হয়েছে। URL-এ id-এর মতো parameter চিনে নেওয়া ও tool-এর ফল দেখার ধারণা আছে। Havij-এর নাম এবং database table/column নিয়ে demonstration-এর উল্লেখ পাওয়া গেছে। কোনো tool report-কে একা চূড়ান্ত প্রমাণ হিসেবে ধরে নেওয়া যাবে না; নিজের test data ও অনুমোদিত পরিবেশে ফল যাচাই করতে হয়। এটি আর্কাইভের যোগ করা ব্যাখ্যা।

অডিওতে inurl: ব্যবহার করে id-ধরনের URL খোঁজার কথা আছে। নিচের lab-scoped উদাহরণগুলো সেই search ধারণার রূপান্তর। id= আছে মানেই SQL injection আছে—এমন সিদ্ধান্ত ভুল। একই parameter নিরাপদ prepared statement দিয়েও ব্যবহার করা যায়। ফলের URL, পর্যবেক্ষণ ও অনুমতির সীমা আলাদা লিখে রাখুন।

ট্রান্সক্রিপ্টে ক্লাউডে মুছে দেওয়া তথ্য নিয়ে সাধারণীকরণ রয়েছে। সংশোধিত ব্যাখ্যা: local deletion, cloud sync, trash এবং backup retention আলাদা ব্যবস্থা; সব provider সব data আজীবন রাখে—এমন দাবি এখানে করা হচ্ছে না। কোনো নির্দিষ্ট account-এর অবস্থা জানতে সেই service-এর বর্তমান settings ও policy দেখতে হবে।

যোগ করা অনুশীলন হিসেবে নিজের demo application's input map তৈরি করুন, synthetic data ব্যবহার করুন এবং একই input নিরাপদভাবে handle করার পরে ফলের পার্থক্য নথিভুক্ত করুন। নিচের reference query-গুলো প্রতিরোধ ও lab শেখার জন্য।

রেকর্ডিংয়ে Dork-এর প্রমাণ ও যোগ করা উদাহরণ
অডিওতে inurl: এবং id= ধরনের URL অনুসন্ধানের উল্লেখ আছে। নিচের site: সীমা ও অতিরিক্ত document/reference query আর্কাইভের যোগ করা অংশ।

শেখার সময় খেয়াল রাখুন
• Input/parameter inventory নিজের lab-এ তৈরি করুন।
• id= বা tool warning দুর্বলতার প্রমাণ নয়।
• Synthetic data ব্যবহার করে পর্যবেক্ষণ ও সংশোধনের ফল আলাদা রাখুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. URL

```text
site:lab.example.org inurl:"id="
```

উদ্দেশ্য: নিজের lab-এর parameter-যুক্ত indexed URL। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. URL

```text
site:lab.example.org inurl:product
```

উদ্দেশ্য: ল্যাবের product/details page inventory। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. File type + phrase

```text
site:lab.example.org filetype:pdf "input validation"
```

উদ্দেশ্য: Input handling-এর নিজের প্রকাশ্য নথি। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:portswigger.net/web-security/sql-injection "Lab"
```

উদ্দেশ্য: অফিসিয়াল training lab/reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://portswigger.net/web-security/sql-injection
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
