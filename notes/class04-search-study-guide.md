# ক্লাস 04 — পাঠনোট ও Google Advanced Search / Dork

টপিকভিত্তিক সহায়ক নোট · পূর্ণ রেকর্ডিংয়ের সামারি যাচাই বাকি

পর্যালোচনার ভিত্তি
ক্লাসের আগে যাচাই করা টপিক ও সংযুক্ত রিসোর্স থেকে নিচের সহায়ক অনুশীলন সাজানো। এটি পুরো ভিডিওর সামারি নয়। মূল Drive রেকর্ডিং এখন download quota-এর কারণে নেওয়া যায়নি; উপলব্ধ YouTube কপিতে ক্যাপশন নেই। তাই পুরো কথোপকথনের বিশ্লেষণ এখনও বাকি।

টপিকের সঙ্গে সম্পর্ক
Session, login flow এবং redirect আচরণকে search URL-এর শব্দ থেকে আলাদা করে বোঝা।

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। ভিডিও থেকে নিশ্চিত তালিকা পরে আলাদা করে যোগ হবে।

শেখার সময় খেয়াল রাখুন
• নিজের login flow-এর expected redirect লিখে রাখুন।
• Google ফল দিয়ে HTTP status বা no-redirect নিশ্চিত করা যায় না।
• শুধু নিজের/অনুমোদিত lab-এর URL ও server-side access checks পর্যালোচনা করুন।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. URL

```text
site:lab.example.org inurl:redirect
```

উদ্দেশ্য: নিজের domain-এর redirect শব্দযুক্ত indexed URL। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. URL

```text
site:lab.example.org inurl:return
```

উদ্দেশ্য: ল্যাবের return/callback-সম্পর্কিত URL। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Phrase + exclusion

```text
site:lab.example.org "login" -inurl:redirect
```

উদ্দেশ্য: Redirect শব্দ বাদ দিয়ে lab login নথি; এটি no-redirect-এর প্রমাণ নয়। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:cheatsheetseries.owasp.org "Unvalidated Redirects and Forwards"
```

উদ্দেশ্য: অফিসিয়াল redirect validation reference। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
