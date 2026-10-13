# ক্লাস 01 — পাঠনোট ও Google Advanced Search / Dork

পূর্ণ ট্রান্সক্রিপ্টভিত্তিক সামারি পর্যালোচিত

পর্যালোচনার ভিত্তি
পূর্ণ উপলব্ধ বাংলা auto-caption পর্যালোচনা: ২১:৩৯ থেকে ২:০৭:০৫; ভিডিও ২:০৭:১৩। শুরুর অপেক্ষার অংশে কথোপকথনের ক্যাপশন নেই। গুরুত্বপূর্ণ বিষয় ট্রান্সক্রিপ্টের সঙ্গে মিলিয়ে দেখা হয়েছে; প্রতিটি দৃশ্যের আলাদা ভিজ্যুয়াল পরীক্ষা দাবি করা হচ্ছে না।

টপিকের সঙ্গে সম্পর্ক
Domain, TLD, front end/back end ও Google Advanced Search-এর মৌলিক ধারণা।

রেকর্ডিংয়ের বিস্তারিত সারাংশ
অরিয়েন্টেশনে কোর্সের কাঠামো, ক্লাসে অংশগ্রহণ, নির্দেশনা অনুসরণ ও অনুশীলনের গুরুত্ব নিয়ে আলোচনা হয়েছে। ট্রান্সক্রিপ্টে সাইবার সিকিউরিটি, ইথিক্যাল হ্যাকিং, Linux এবং freelancing-কে শেখার ধারাবাহিকতার অংশ হিসেবে উল্লেখ করা হয়েছে। এরপর domain name-এর গঠন, সাধারণ TLD এবং country-code TLD বোঝানো হয়। একটি domain-এর শেষ অংশ দেখে তার ধরন সম্পর্কে ধারণা পাওয়া গেলেও সেটি সাইটের নিরাপত্তা বা মালিকের পরিচয়ের প্রমাণ নয়।

Front end ও back end-এর পার্থক্য, ব্যবহারকারীর সামনে দৃশ্যমান পেজ এবং প্রশাসনিক কাজের ধারণা আলোচিত হয়েছে। প্রশাসনিক পেজ আলাদা রাখার ধারণা শেখানো হলেও শুধু লিংক আড়াল করলেই access control তৈরি হয় না: server-side authentication ও authorization দরকার। এটি সারাংশের সঙ্গে যুক্ত ব্যাখ্যা।

শেষের অংশে Google Dork-কে advanced search technique হিসেবে পরিচয় করানো হয়েছে এবং URL-এর শব্দ ও domain দিয়ে ফল সীমাবদ্ধ করার ধারণা আছে। লিট বা 1337 লেখার পরিচয়ও দেওয়া হয়েছে। নিচের উদাহরণগুলো সেই ধারণাকে নিজের ল্যাবের scope-এ সাজানো সংস্করণ; এগুলো তৃতীয় পক্ষের সাইটের লক্ষ্য তালিকা নয়।

নিরাপত্তা শেখার সময় কেবল search result পাওয়া, কোনো URL খুঁজে পাওয়া এবং একটি ত্রুটি প্রমাণ করা—এই তিনটি আলাদা পর্যায়। অনুশীলনের আগে scope লিখে নিন, পর্যবেক্ষণ ও ব্যাখ্যা আলাদা রাখুন এবং cookie, password বা ব্যক্তিগত তথ্য নোটে প্রকাশ করবেন না। এ অংশটি আর্কাইভের যোগ করা অনুশীলন নির্দেশনা।

ক্যাপশনের যাচাই করা সময়চিহ্ন
৩৭:২৫ — ব্যবহারিক অনুশীলনের ওপর জোর
১:০৩:১৭ — top-level domain আলোচনা
১:১১:১৫ — front end/back end প্রসঙ্গ শুরু
১:৩১:০১ — Dork পরিচিতি

রেকর্ডিংয়ে Dork-এর প্রমাণ ও যোগ করা উদাহরণ
শিক্ষকের নোট ও ক্যাপশনে site: এবং URL-ভিত্তিক অনুসন্ধানের ধারণা আছে। অতিরিক্ত exact phrase ও filetype উদাহরণ আর্কাইভের যোগ করা অনুশীলন।

শেখার সময় খেয়াল রাখুন
• Domain ও URL-এর অংশ আলাদা করুন।
• Search result পাওয়া আর access permission পাওয়া আলাদা বিষয়।
• নিজের lab-এর প্রকাশ্য pages ও নথির ছোট inventory তৈরি করুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. Domain scope

```text
site:lab.example.org
```

উদ্দেশ্য: নিজের অনুমোদিত domain-এর indexed pages। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. URL

```text
site:lab.example.org inurl:login
```

উদ্দেশ্য: ল্যাবের login-সম্পর্কিত indexed URL। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Exact phrase

```text
site:lab.example.org "course policy"
```

উদ্দেশ্য: নির্দিষ্ট বাক্যযুক্ত lab নথি। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. File type

```text
site:lab.example.org filetype:pdf
```

উদ্দেশ্য: ল্যাবের প্রকাশ্য PDF documentation। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
