# SQLMap ও Dalfox — ক্লাস ২৪-এর সহায়ক পাঠনোট

ক্লাসের তারিখ: **১১ অক্টোবর ২০২৬, রবিবার**। প্রশিক্ষক: Md. Khaledul Islam। মূল পোস্টের শিরোনাম: **SqlMap and Dalfox**। রেকর্ডিংয়ের দৈর্ঘ্য: **১:৪৩:০৯**।

প্রশিক্ষকের ঘোষণা অনুযায়ী শুরু হওয়ার কথা ছিল বাংলাদেশ সময় রাত **৯:৪৫**, সৌদি সময় সন্ধ্যা **৬:৪৫**। এটি ঘোষিত সময়; ভিডিওর প্রকৃত শুরু/শেষের সময় এখনও আলাদাভাবে যাচাই করা হয়নি। নির্বাচিত ভিডিও অংশে SQLMap-এর লগে `2026-10-11` দেখা গেছে।

এটি Delta Archive-এর তৈরি সহায়ক নোট, শিক্ষকের মূল PDF বা পুরো ভিডিওর প্রতিলিপি নয়। নির্বাচিত অংশে SQLMap terminal এবং Dalfox-এর GitHub repository দেখা গেছে। বাকি আলোচনা সম্পূর্ণ পর্যালোচনা করা হয়নি।

## ক্লাসের সঙ্গে সম্পর্কিত বিষয়

- SQLMap: SQL injection পরীক্ষার টুল; Python-এ চলে। ক্লাসের চ্যাটে এর অফিসিয়াল GitHub লিংক দেওয়া হয়েছে।
- Dalfox: XSS ও parameter analysis-এর টুল। মূল ক্লাসের শিরোনাম এবং ভিডিওর GitHub পেজ থেকে এর সম্পর্ক যাচাই করা হয়েছে।
- Linux terminal/WSL: ক্লাসের পরিবেশের সঙ্গে নিজের OS ও টুলের সংস্করণ মিলিয়ে সেটআপ করতে হবে। সহপাঠীর মন্তব্যকে প্রশিক্ষকের চূড়ান্ত নির্দেশনা হিসেবে ধরা হয়নি।

## ডাউনলোড ও সেটআপ

SQLMap-এর অফিসিয়াল ZIP নামিয়ে extract করুন, অথবা repository clone করুন। Python উপলব্ধ আছে কি না দেখে টুলের folder থেকে `python sqlmap.py -h` চালালে সহায়িকা দেখা যাবে।

Dalfox-এর অফিসিয়াল releases থেকে নিজের OS/CPU অনুযায়ী package বেছে নিন এবং প্রকাশিত checksum মিলিয়ে নিন। বর্তমান Dalfox v3 এবং পুরোনো Go-ভিত্তিক v2-এর সেটআপ এক নয়। ভিডিওতে ব্যবহৃত সংস্করণ এখনও নিশ্চিত করা হয়নি; পুরোনো ক্লাসের command ও বর্তমান installer মিশিয়ে ব্যবহার করবেন না। সংস্করণ ও help যাচাই করে এগোন।

নিজের অনুশীলনের অ্যাপ বা অনুমোদিত ল্যাবে কাজ করুন। নোটে টুলের version, environment, পর্যবেক্ষণ ও সংশোধনের ফল লিখে রাখুন; ব্যক্তিগত cookie, password বা token প্রকাশ করবেন না।

## মূল রেকর্ডিং ও অফিসিয়াল রেফারেন্স

- ক্লাসের পোস্ট: https://www.facebook.com/groups/awsb66delta/posts/1677570770612178/
- Facebook রেকর্ডিং: https://www.facebook.com/khaleddevsec/videos/1116400244211783/
- SQLMap repository ও সেটআপ: https://github.com/sqlmapproject/sqlmap
- SQLMap source ZIP: https://github.com/sqlmapproject/sqlmap/zipball/master
- SQLMap নির্দেশিকা: https://github.com/sqlmapproject/sqlmap/wiki
- Dalfox repository: https://github.com/hahwul/dalfox
- Dalfox releases: https://github.com/hahwul/dalfox/releases
- Dalfox installation: https://dalfox.hahwul.com/getting-started/installation/

নোটটি এই সাইটে সংরক্ষিত, তাই মূল Facebook পোস্ট সরিয়ে ফেললেও এটি পড়া ও নামানো যাবে। পূর্ণ ১:৪৩:০৯ রেকর্ডিং YouTube-এ Unlisted হিসেবে সংরক্ষিত এবং ক্লাসের সাইট-প্লেয়ারে যাচাই করা হয়েছে। মূল আপলোডের রেজোলিউশন ১৯২০×১০৮০।

YouTube রেকর্ডিং: https://www.youtube.com/watch?v=akKImCYFXbA
