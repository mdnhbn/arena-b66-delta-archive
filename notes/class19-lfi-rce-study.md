# Advanced LFI / RCE — সহায়ক নোট

সংশ্লিষ্ট ক্লাস: ২৫ সেপ্টেম্বর ২০২৬ · শুক্রবার · রেকর্ড ১৯।
ক্লাস রেকর্ড: https://arena-b66-delta-archive.vercel.app/#class/entry-142

## উৎস ও সীমা
এটি যাচাই করা ক্লাসের বিষয় এবং OWASP ও PHP-এর অফিসিয়াল রেফারেন্স থেকে তৈরি নিজস্ব সংক্ষিপ্ত গাইড। শিক্ষক-প্রদত্ত আলাদা PDF বা lab package পর্যালোচিত ক্লাস পোস্ট ও LFI ফাইল অনুসন্ধানে পাওয়া যায়নি। এটি পূর্ণ লেকচারের প্রতিলিপি বা মূল lab package নয়।

## মূল ধারণা
- LFI: ব্যবহারকারীর ইনপুট যথাযথভাবে যাচাই না করলে অ্যাপ্লিকেশন সার্ভারের অনাকাঙ্ক্ষিত স্থানীয় ফাইল অন্তর্ভুক্ত করতে পারে।
- RCE: নির্দিষ্ট পরিবেশ ও অতিরিক্ত শর্তে সার্ভারে কোড চালানোর ঝুঁকি। প্রতিটি LFI-কে প্রমাণ ছাড়া RCE বলবেন না।
- PHP-এর include শুধু ফাইল পড়ে না; অন্তর্ভুক্ত ফাইলের কোডও মূল্যায়ন করে। ব্যবহারকারীর দেওয়া path সরাসরি এতে পাঠানো ঝুঁকিপূর্ণ।

## প্রতিরোধ ও পর্যালোচনা
ফাইলের raw path-এর বদলে অনুমোদিত identifier থেকে স্থির template নির্বাচন করুন। অজানা identifier প্রত্যাখ্যান করুন। সীমিত file permission এবং upload folder-এ code execution বন্ধ রাখার ব্যবস্থা পর্যালোচনা করুন। পরীক্ষার ফল, পরিবেশ ও প্রমাণ আলাদা করে লিখুন।

## অনুশীলন
ডকুমেন্ট ট্যাবে দেওয়া worksheet ব্যবহার করে নিজের অনুমোদিত training application-এর input থেকে file operation পর্যন্ত পথ আঁকুন; অনুমোদিত ও অজানা identifier-এর প্রত্যাশিত ফল লিখুন। এই worksheet কোনো exploit kit বা শিক্ষক-প্রদত্ত executable package নয়।

## অফিসিয়াল রেফারেন্স
- [OWASP: Local File Inclusion](https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/07-Input_Validation_Testing/11.1-Testing_for_Local_File_Inclusion/)
- [PHP: include](https://www.php.net/manual/en/function.include.php)

গাইড প্রস্তুত ও উৎস পরীক্ষা: ১১ অক্টোবর ২০২৬।
