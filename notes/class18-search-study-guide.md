# ক্লাস 18 — পাঠনোট ও Google Advanced Search / Dork

টপিকভিত্তিক সহায়ক নোট · পূর্ণ রেকর্ডিংয়ের সামারি যাচাই বাকি

পর্যালোচনার ভিত্তি
ক্লাসের আগে যাচাই করা টপিক ও সংযুক্ত রিসোর্স থেকে নিচের সহায়ক অনুশীলন সাজানো। এটি পুরো ভিডিওর সামারি নয়। মূল Drive রেকর্ডিং এখন download quota-এর কারণে নেওয়া যায়নি; উপলব্ধ YouTube কপিতে ক্যাপশন নেই। তাই পুরো কথোপকথনের বিশ্লেষণ এখনও বাকি।

টপিকের সঙ্গে সম্পর্ক
Java, Go ও Burp setup-এর version-উপযোগী official reference।

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। ভিডিও থেকে নিশ্চিত তালিকা পরে আলাদা করে যোগ হবে।

শেখার সময় খেয়াল রাখুন
• নিজের OS, architecture ও tool version লিখুন।
• পুরোনো ক্লাসের command ও বর্তমান installer আলাদা করে দেখুন।
• Installation verification-এর help/version output সংরক্ষণ করুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. Official reference

```text
site:go.dev/doc/install
```

উদ্দেশ্য: অফিসিয়াল Go installation guide। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. Official reference

```text
site:portswigger.net/burp/documentation "install"
```

উদ্দেশ্য: অফিসিয়াল Burp installation documentation। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Official reference

```text
site:kali.org/docs "Java"
```

উদ্দেশ্য: অফিসিয়াল Kali/Java reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Exact phrase

```text
site:lab.example.org "tools setup"
```

উদ্দেশ্য: নিজের setup checklist। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://go.dev/doc/install
- https://portswigger.net/burp/documentation
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
