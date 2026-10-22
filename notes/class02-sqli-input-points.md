# SQL Injection Points — সম্পাদিত ধারণানোট

উৎস ও পরিধি
২৫ জুলাইয়ের শিক্ষক-পোস্টে URL-এর query parameter, তার নাম এবং value দেখে একটি app-এর input চিহ্নিত করার আলোচনা আছে। এটি সেই পোস্টের সম্পাদিত শিক্ষাসংস্করণ; মূল পোস্টের তৃতীয় পক্ষের সাইট ও দেশভিত্তিক target-finding তালিকা এখানে রাখা হয়নি।

মূল ধারণা
নিজের app-এর URL-এ query string থাকলে parameter-এর নাম ও value আলাদা করে পড়তে শিখুন। একটি parameter থাকা কিংবা তার নাম id হওয়া SQL Injection-এর প্রমাণ নয়। Parameter আদৌ database query-তে যায় কি না, server কীভাবে input প্রক্রিয়াকরণ করে এবং query কীভাবে তৈরি হয়—এসব আলাদা বিষয়। একটি URL দেখে নিশ্চিত vulnerability ঘোষণা করা ঠিক নয়।

ক্লাসের সঙ্গে মিল
ক্লাস ০২-এর SQL Injection বিষয়টির সহায়ক পাঠ হিসেবে এটি যুক্ত করা হয়েছে। পোস্টের তারিখকে live class-এর তারিখ হিসেবে ব্যবহার করা হয়নি। ক্লাসের নোট ট্যাবে নিজের/অনুমোদিত lab-এ সীমিত Google Advanced Search-এর উদাহরণ আলাদা আছে; সেগুলোকে শিক্ষকের হুবহু query-list বলা হচ্ছে না।

আর্কাইভের যোগ করা অনুশীলন
নিজের test app-এর কয়েকটি URL থেকে parameter-name ও value-এর তালিকা করুন। কোন input কোন server handler-এ যায় তা নথিভুক্ত করুন। ফলাফলকে input inventory বলুন; vulnerability report হিসেবে ঘোষণা করবেন না।

