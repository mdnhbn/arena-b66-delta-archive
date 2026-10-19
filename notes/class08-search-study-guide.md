# ক্লাস 08 — পাঠনোট ও Google Advanced Search / Dork

NotebookLM-ভিত্তিক পূর্ণ অডিওর পাঠনোট · মূল ট্রান্সক্রিপ্ট ও AI সারাংশ মিলিয়ে সম্পাদিত

পর্যালোচনার ভিত্তি
১৬ আগস্ট ২০২৬, রবিবারের Burp Suite ক্লাস। সম্পূর্ণ মূল ভিডিও ৮৭৩৭.৭ সেকেন্ড; বিশ্লেষিত অডিও ৮৭৩৭.৬২১ সেকেন্ড। ট্রান্সক্রিপ্টে শুরু থেকে শেষের প্রশ্নোত্তর ও বিদায় পর্যন্ত বক্তব্য আছে। এটি পূর্ণ অডিওর বিষয়ভিত্তিক নোট; প্রতিটি ভিডিও ফ্রেম, পর্দার URL বা নির্ভুল chapter timestamp যাচাইয়ের দাবি নয়। আগের screen-date যাচাইয়ের তারিখ বহাল আছে।

১. Burp Suite শেখার উদ্দেশ্য
শিক্ষক পেশাদার সফটওয়্যার ধাপে ধাপে শেখার গুরুত্ব বোঝান। Burp Suite-এর Community ও Professional edition-এর পার্থক্য এবং HTTP traffic পর্যবেক্ষণ করার ধারণা আসে। এক ক্লাস দেখেই সব অংশ আয়ত্ত হবে না; নিজের অনুমোদিত lab-এ পর্যবেক্ষণ ও পুনরালোচনা দরকার।

২. Browser, proxy ও server-এর সম্পর্ক
Browser request পাঠায়, server response দেয়। পরীক্ষার proxy মাঝখানে সেই আদান-প্রদান পর্যবেক্ষণ করতে পারে। Intercept চালু থাকলে request অপেক্ষা করতে পারে—তাই পেজ না খোলা মানেই ইন্টারনেট নষ্ট নয়। ক্লাসে localhost proxy ও HTTPS certificate-এর ভূমিকা এসেছে। Certificate trust বদলানোর কাজ সাধারণ browsing-এর বাইরে আলাদা test environment-এর বিষয়; ব্যক্তিগত account-এর গোপন traffic এই অনুশীলনে ব্যবহার করবেন না।

৩. ক্লাসে আলোচিত মূল অংশগুলো
• Proxy ও HTTP history: কোন request/response হয়েছে তার ধারাবাহিকতা দেখা।
• Repeater: নির্দিষ্ট lab request আবার পাঠিয়ে response তুলনা করা।
• Intruder: নির্ধারিত পরীক্ষার input বদলে পাওয়া ফল সাজিয়ে দেখা। এটি নিজের বা স্পষ্ট অনুমতিপ্রাপ্ত lab-এর নিয়ন্ত্রিত পরীক্ষার প্রসঙ্গ। এখানে password guessing বা public site-এ স্বয়ংক্রিয় অনুরোধের নির্দেশ নেই।
• Header, cookie, parameter ও body: request-এর বিভিন্ন অংশ। 200, 302 বা 500 status এবং response length পর্যবেক্ষণ করা হয়। শুধু status/length বদলালেই নিরাপত্তার ত্রুটি প্রমাণ হয় না; application-এর প্রত্যাশিত আচরণ ও প্রাসঙ্গিক প্রমাণ মিলতে হবে।
• ক্লাসের দাম/অর্ডার-সম্পর্কিত উদাহরণের মূল শিক্ষা: browser থেকে পাঠানো তথ্য server-এর যাচাই ছাড়া বিশ্বাস করা উচিত নয়। এই নোটে বাস্তব দোকান বা অন্যের account পরীক্ষার ধাপ রাখা হয়নি।

৪. পুরোনো demo ও বর্তমান setup আলাদা
অডিওতে পুরোনো 1.7.37, ১০ আগস্ট ২০১৮ এবং তুলনার জন্য 2026.7.3 version-এর উল্লেখ আছে। এগুলো রেকর্ডিংয়ের বক্তব্য; বর্তমান latest release বা নিরাপত্তার নিশ্চয়তা নয়। ছোট file বা কম RAM-এ চলা মানেই software নিরাপদ/সমর্থিত নয়। শিক্ষক legacy JAR চালাতে Java 8, batch file ও icon-এর প্রসঙ্গ দেখিয়েছেন। Java 8-কে বর্তমান সব Burp release-এর বাধ্যতামূলক নিয়ম ধরে নেবেন না; নিজের release-এর official installation ও requirements দেখুন।
টুলস ট্যাবে অফিসিয়াল Community download এবং সংশ্লিষ্ট reference আছে। Professional-এর জন্য বৈধ license লাগে। ভবিষ্যৎ license/কোর্স-পরবর্তী update বা support নিশ্চিত—এমন প্রতিশ্রুতি এই নোটে নেই। কোনো পুরোনো custom JAR/batch package-এর নিরাপত্তা বা বর্তমান সামঞ্জস্য নিশ্চিত করা হয়নি।

৫. FoxyProxy ও browser resource
পূর্ণ অডিওতে FoxyProxy দিয়ে পরীক্ষার proxy বাছাই করার কথা আছে। এটি browser-এর proxy-management extension; নিজে vulnerability scanner বা বিনামূল্যের proxy server নয়। Chrome, Firefox ও Edge-এর অফিসিয়াল store link টুলস ট্যাবে যুক্ত করা হয়েছে। নিজের test profile-এর জন্য vendor-এর নির্দেশনা ও permissions দেখুন। এই আর্কাইভে extension install করা বা PC-র certificate/security setting বদলানো হয়নি।

৬. শিক্ষক-নির্ধারিত কাজ ও ঘোষণা
শেষে শিক্ষক স্পষ্টভাবে আলাদা official written homework না দেওয়ার কথা বলেন। শেখানো tools নিজের PC/test environment-এ setup করে সমস্যা হলে resource post-এ জানাতে বলেন। কোনো report-এর সংখ্যা, জমার format বা deadline পাওয়া যায়নি। নতুন পরীক্ষার বা পরের ক্লাসের নির্দিষ্ট তারিখও নেই। Resource পরে দেওয়ার কথা আছে; ট্রান্সক্রিপ্টে অদৃশ্য নতুন file/URL উদ্ধার হয়েছে বলে দাবি করা হচ্ছে না।

৭. আর্কাইভের যোগ করা পুনরালোচনা
এ অংশ নতুন শিক্ষক-নির্ধারিত homework নয়।
• নিজের lab-এর browser → proxy → server → response পথটি আঁকুন। Intercept-এ অপেক্ষা করা ও server error-এর পার্থক্য লিখুন।
• History ও Repeater-এর উদ্দেশ্য তুলনা করুন। নিজের lab-এর সাধারণ, non-sensitive request-এর দুই response দেখে কী নিশ্চিত এবং কী অনিশ্চিত লিখুন।
• Browser-এর পাঠানো price/value কেন server-side যাচাই দরকার, নিজের ভাষায় ব্যাখ্যা করুন।
• নিজের জন্য তিনটি প্রশ্ন রাখুন: request কোথায় অপেক্ষা করছে? Status code একা কী প্রমাণ করে? পুরোনো demo version ও বর্তমান official setup-এর নির্দেশ একই ধরে নেওয়া ঠিক কি না?

অতিরিক্ত অফিসিয়াল রেফারেন্স
• Burp installation: https://portswigger.net/burp/documentation/desktop/getting-started/download-and-install
• Community download: https://portswigger.net/burp/communitydownload
• FoxyProxy-এর browser download ও নির্দেশনা: https://getfoxyproxy.org/downloads/

উদাহরণের উৎস
নিচের query-গুলো আর্কাইভের তৈরি, টপিক অনুযায়ী সীমিত অনুশীলন। এগুলো শিক্ষকের ভিডিওতে হুবহু বলা হয়েছে—এমন দাবি করা হচ্ছে না। এগুলো আর্কাইভের নিজস্ব সীমিত উদাহরণ; মূল ভিডিওর হুবহু query-list হিসেবে দাবি করা হচ্ছে না।

শেখার সময় খেয়াল রাখুন
• নিজের lab request/response আলাদা করে সংরক্ষণ করুন।
• Cookie ও authorization header নোটে প্রকাশ করবেন না।
• Burp ব্যবহার করে অনুমোদিত scope-এর বাইরে traffic পাঠাবেন না।

Google Dork ও scope
Google Dork বলতে Google Advanced Search-এর query বোঝায়; Google Docs দলিল সম্পাদনার আলাদা সেবা। site: domain সীমিত করে, inurl: URL-এর শব্দ, intitle: title, quotes নির্দিষ্ট phrase এবং filetype: file type বাছাইয়ে কাজে লাগে। অপারেটরের colon-এর পরে ফাঁকা দেবেন না।
lab.example.org একটি সংরক্ষিত উদাহরণ domain। শুধু নিজের বা লিখিত অনুমতিপ্রাপ্ত, scope-এর মধ্যে থাকা domain দিয়ে বদলাবেন। নিজের private/local lab Google-এ indexed না হলে ফল নাও আসতে পারে; তখন নিজের route/document inventory ব্যবহার করুন।

ফল ও সীমাবদ্ধতা
এখানে উদাহরণের সংখ্যা দেখানো হয়েছে, সব সম্ভাব্য Dork-এর সংখ্যা নয়। বাস্তবে কতটি site/page মিলবে তা পরীক্ষা করা হয়নি। Google-এর index ও আনুমানিক result count সম্পূর্ণ তালিকা নয়; কোনো ফলই vulnerability, no-redirect বা shell execution-এর প্রমাণ নয়। কোনো public target list বা active scan তৈরি/চালানো হয়নি।

## টপিক অনুযায়ী Google Dork-এর উদাহরণ

### 1. URL

```text
site:lab.example.org inurl:api
```

উদ্দেশ্য: নিজের indexed API documentation। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 2. Exact phrase

```text
site:lab.example.org "request" "response"
```

উদ্দেশ্য: নিজের workflow note। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 3. Official reference

```text
site:portswigger.net/burp/documentation "Proxy"
```

উদ্দেশ্য: অফিসিয়াল Burp Proxy guide। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

### 4. Official reference

```text
site:portswigger.net/burp/documentation "Intruder"
```

উদ্দেশ্য: অফিসিয়াল Intruder documentation। উৎস: আর্কাইভের যোগ করা scope-এ সীমিত উদাহরণ।

## অফিসিয়াল রেফারেন্স

- https://portswigger.net/burp/documentation
- https://support.google.com/websearch/answer/2466433?hl=en
- https://developers.google.com/search/docs/monitor-debug/search-operators
