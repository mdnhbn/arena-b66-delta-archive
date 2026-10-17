# ক্লাস 05 — পাঠনোট ও Google Advanced Search / Dork

NotebookLM-ভিত্তিক পূর্ণ অডিওর পাঠনোট · মূল ট্রান্সক্রিপ্ট ও AI সারাংশ মিলিয়ে সম্পাদিত

পর্যালোচনার ভিত্তি
পূর্ণ ২:১৩:০৪ রেকর্ডিংয়ের অডিও (৭৯৮৪.৩৬৭ সেকেন্ড) থেকে NotebookLM ট্রান্সক্রিপ্ট ও সারাংশ প্রস্তুত হয়েছে। প্রদর্শিত ভিডিও সময় rounding-এর কারণে ২:১৩:০৫ হতে পারে। ট্রান্সক্রিপ্টে নির্ভরযোগ্য chapter timestamp নেই; সময় বানিয়ে দেওয়া হয়নি। প্রতিটি ভিডিও ফ্রেম আলাদাভাবে দেখা হয়নি; স্বয়ংক্রিয় বাংলা ট্রান্সক্রিপশনে শব্দের ভুল থাকতে পারে।

ক্লাসের মূল আলোচনা
১. আগের টুলভিত্তিক SQL Injection আলোচনার পরে এখানে manual analysis-এর যুক্তি বোঝানো হয়েছে। একটি টুলের ফল ব্যাখ্যা করতে ওয়েব রিকোয়েস্ট ও ডাটাবেসের সম্পর্ক জানা দরকার।
২. URL ও URI দিয়ে রিসোর্সের ঠিকানা ও পরিচয় বোঝা, query string-এ parameter name এবং value আলাদা করা আলোচনা হয়েছে। URL-এর নাম বা parameter-এর ধরন একা কোনো দুর্বলতার প্রমাণ নয়।
৩. HTTP ও HTTPS-এর পার্থক্য এসেছে। HTTPS চলাচলের তথ্য encrypt করে; ইনপুটের ভুল ব্যবহার বা SQL Injection নিজে থেকে ঠেকায় না।
৪. ইনপুট কীভাবে ডাটাবেস query-এর অর্থ বদলে দিতে পারে, তার ম্যানুয়াল বিশ্লেষণ দেখানো হয়। এখানে ব্যবহারযোগ্য exploit payload, database extraction command বা তৃতীয় পক্ষের টার্গেট তালিকা পুনর্মুদ্রণ করা হয়নি।
৫. Error-based, union-based, boolean/time-based blind এবং out-of-band SQL Injection-এর ধারণাগত শ্রেণিবিভাগ আলোচনা হয়েছে। Response ও application context মিলিয়ে পর্যবেক্ষণ ব্যাখ্যা করতে হয়।
৬. Bug ও vulnerability-এর পার্থক্য: সব প্রোগ্রামিং ভুলের নিরাপত্তার প্রভাব এক নয়। ফলাফল, প্রভাব ও পুনরায় যাচাইয়ের প্রমাণ আলাদা করে লিখতে হবে।
৭. ক্লাসে Link Gopher দিয়ে পেজের লিংক সংগ্রহ, duplicate বাদ দিয়ে URL পর্যবেক্ষণের কথা এসেছে। এটি vulnerability scanner নয়। Cyberfox/Waterfox পরিবেশ ও HackBar-এর উল্লেখ ঐতিহাসিক কোর্স-প্রসঙ্গ হিসেবে রাখা হয়েছে।

শিক্ষকের হোমওয়ার্ক
প্রদানকৃত practice link-এ করা কাজের ফলের পরিষ্কার screenshot হোমওয়ার্ক প্যানেলে জমা দেওয়ার কথা আছে। অডিওতে আলাদা নির্দিষ্ট জমার তারিখ বা সময় নিশ্চিত হয়নি। এই আর্কাইভের ব্যবহারকারীরা কেবল নিজেদের বা স্পষ্ট অনুমতিপ্রাপ্ত practice environment ব্যবহার করবেন; screenshot-এ ব্যক্তিগত বা সংবেদনশীল তথ্য রাখবেন না। ডকুমেন্ট ও ছোট গাইডলাইন ভিডিওর উল্লেখ আছে; নোট তৈরি করাকে হারানো মূল instructor file উদ্ধার বলা হচ্ছে না।

টুল ও সেটআপ
Link Gopher-এর Firefox ও Chrome-এর অফিসিয়াল স্টোর লিংক এই ক্লাসের “টুলস” ও “ডকুমেন্ট” ট্যাবে যুক্ত। নিজের পরীক্ষামূলক পেজে পাওয়া লিংক sort ও deduplicate করে inventory বানানো যায়। Extension install করার সময় browser-এর দেখানো permissions নিজে পর্যালোচনা করুন।

আর্কাইভের যোগ করা প্রতিরক্ষামূলক ব্যাখ্যা ও অনুশীলন
• নিজস্ব ছোট অ্যাপে test data ব্যবহার করে parameter name, value ও expected response-এর একটি তালিকা তৈরি করুন।
• নিজের source code-এ parameterized query/prepared statement ব্যবহার হচ্ছে কি না review করুন; validation-কে তার বিকল্প ধরে নেবেন না।
• নিজের test page থেকে Link Gopher দিয়ে পাওয়া unique link-এর inventory তৈরি করুন এবং হাতে লেখা তালিকার সঙ্গে মিলিয়ে দেখুন।
এগুলো আর্কাইভের সংযোজন; শিক্ষকের দেওয়া হোমওয়ার্কের হুবহু তালিকা নয়। Google ফল, HTTPS, error message বা AI সারাংশ কোনোটি একা vulnerability নিশ্চিত করে না।

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। এগুলো আর্কাইভের নিজস্ব সীমিত উদাহরণ; মূল ভিডিওর হুবহু query-list হিসেবে দাবি করা হচ্ছে না।

শেখার সময় খেয়াল রাখুন
• নিজের app-এর input থেকে query পর্যন্ত flow আঁকুন।
• Search result বা error message থেকে সরাসরি vulnerability ঘোষণা করবেন না।
• Prepared statements ও least privilege-এর documentation পড়ুন।

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

উদ্দেশ্য: নিজের app-এর indexed input-যুক্ত page। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. URL

```text
site:lab.example.org inurl:details
```

উদ্দেশ্য: নিজের details page inventory। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Exact phrase

```text
site:lab.example.org "prepared statement"
```

উদ্দেশ্য: নিজের প্রকাশ্য development note। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:cheatsheetseries.owasp.org "SQL Injection Prevention"
```

উদ্দেশ্য: অফিসিয়াল prevention reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
