# ক্লাস ১২ — Acunetix: Scanner Setup ও Reports

সংশ্লিষ্ট ক্লাস: ৩০ আগস্ট ২০২৬ · রবিবার · রেকর্ড ১২।
ক্লাস রেকর্ড: https://arena-b66-delta-archive.vercel.app/#class/entry-112

উৎস ও সীমা: এটি ক্লাসের যাচাই করা টপিক এবং নির্মাতার অফিসিয়াল নির্দেশনা থেকে তৈরি সংক্ষিপ্ত সহায়ক পাঠনোট। গ্রুপের ফাইল তালিকা ও Acunetix পোস্ট সার্চে মূল শিক্ষক-প্রদত্ত PDF পাওয়া যায়নি। ভিডিওর পূর্ণ প্রতিলিপি বা সব আলোচনার তালিকা এখানে দাবি করা হচ্ছে না।

১. সেটআপ
নিজের লাইসেন্সের জন্য নির্মাতা-প্রদত্ত installer ব্যবহার করুন। প্রশাসনিক account দিয়ে scanner-এর Web UI পরিচালিত হয়। ল্যাপের configuration-এ remote UI access প্রয়োজন কি না ঠিক করুন; ব্যক্তিগত password প্রকাশিত নোটে রাখবেন না।

২. টার্গেট ও স্ক্যান
নিজের training application বা অনুমোদিত target যোগ করুন। Targets থেকে সংশ্লিষ্ট address খুলে settings দেখুন। কোন URL পরীক্ষা করবেন এবং কোন অংশ বাদ দেবেন—আগে scope লিখে নিন। স্ক্যানের ফলকে যাচাইযোগ্য finding হিসেবে পরীক্ষা করুন।

৩. রিপোর্ট
Scans-এ সংশ্লিষ্ট scan নির্বাচন করে Generate Report দিন এবং উপযুক্ত template বেছে নিন। তৈরি রিপোর্ট Reports-এ পাওয়া যায়; PDF বা HTML হিসেবে নামানো যায়। একই target-এর দুটি scan তুলনা করতে Compare Scans ব্যবহার করা যায়।

৪. অনুশীলনের রেকর্ড
Target, scope, scanner version, scan time এবং রিপোর্টের নাম লিখুন। যাচাই করা finding, প্রমাণ, সমাধান ও পুনরায় পরীক্ষার ফল সংরক্ষণ করুন। নিজের test account ও সংবেদনশীল তথ্য প্রকাশিত রিপোর্ট থেকে সরান।

অফিসিয়াল রেফারেন্স:
- সেটআপ: https://www.acunetix.com/support/docs/wvs/installing-acunetix-wvs/
- টার্গেট সেটিং: https://www.acunetix.com/support/docs/wvs/configuring-targets/
- রিপোর্ট: https://www.acunetix.com/support/docs/wvs/generating-reports/

নোট প্রস্তুত ও উৎস পরীক্ষা: ১১ অক্টোবর ২০২৬।
