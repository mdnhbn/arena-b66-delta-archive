Warning: truncated output (original token count: 20214)
Total output lines: 2039

(()=>{'use strict';
const pairs=[
 ["Browse preserved resources →","সংরক্ষিত রিসোর্স খুলুন →"],
 ["Playback verification pending","প্লেব্যাক যাচাই বাকি"],
 [
  "Class recordings",
  "ক্লাস রেকর্ডিং"
 ],
 [
  "Classes & videos",
  "ক্লাস ও ভিডিও"
 ],
 [
  "Notes & documents",
  "নোট ও ডকুমেন্ট"
 ],
 [
  "Tools & setup",
  "টুলস ও সেটআপ"
 ],
 [
  "Information & guides",
  "তথ্য ও নির্দেশনা"
 ],
 [
  "Notices",
  "নোটিশ"
 ],
 [
  "Dashboard",
  "ড্যাশবোর্ড"
 ],
 [
  "All classes",
  "সব ক্লাস"
 ],
 [
  "Resource library",
  "রিসোর্স লাইব্রেরি"
 ],
 [
  "Schedule",
  "সময়সূচি"
 ],
 [
  "Notices & information",
  "নোটিশ ও তথ্য"
 ],
 [
  "About the archive",
  "আর্কাইভ সম্পর্কে"
 ],
 [
  "Class details",
  "ক্লাসের বিস্তারিত"
 ],
 [
  "Resource details",
  "রিসোর্সের বিস্তারিত"
 ],
 [
  "Date awaiting verification",
  "তারিখ যাচাই বাকি"
 ],
 [
  "Link not added yet",
  "লিংক যোগ করার অপেক্ষায়"
 ],
 [
  "Recording available · awaiting upload",
  "রেকর্ডিং পাওয়া গেছে · আপলোড বাকি"
 ],
 [
  "Live class · recording pending",
  "লাইভ ক্লাস · রেকর্ডিং বাকি"
 ],
 [
  "Video ready",
  "ভিডিও প্রস্তুত"
 ],
 [
  "Supporting videos in progress",
  "সহায়ক ভিডিওর কাজ চলছে"
 ],
 [
  "Video processing",
  "ভিডিও প্রস্তুত হচ্ছে"
 ],
 [
  "Some video parts are missing",
  "কিছু অংশের ভিডিও বাকি"
 ],
 [
  "Waiting for upload limit to reset",
  "আপলোড সীমা রিসেটের অপেক্ষায়"
 ],
 [
  "Upload retry pending",
  "আপলোড পুনরায় চেষ্টা বাকি"
 ],
 [
  "YouTube upload pending",
  "YouTube আপলোড অপেক্ষায়"
 ],
 [
  "Video will be added later",
  "ভিডিও পরে যোগ হবে"
 ],
 [
  "Notes available",
  "নোট পড়া যাবে"
 ],
 [
  "Resource",
  "রিসোর্স"
 ],
 [
  "YouTube processing or playback verification is in progress for this part.",
  "এই অংশের YouTube প্রসেসিং বা প্লেব্যাক যাচাই চলছে।"
 ],
 [
  "Video",
  "ভিডিও"
 ],
 [
  "Part ",
  "অংশ "
 ],
 [
  "Some video parts have not been added yet.",
  "কিছু অংশের ভিডিও এখনো যোগ করা বাকি।"
 ],
 [
  "Some videos are still processing or awaiting playback verification. Ready parts can be watched here.",
  "কিছু ভিডিওর প্রসেসিং বা প্লেব্যাক যাচাই চলছে। প্রস্তুত অংশগুলো এখানেই দেখা যাবে।"
 ],
 [
  "Watch on Dailymotion",
  "Dailymotion থেকে দেখুন"
 ],
 [
  "Watch on YouTube",
  "YouTube থেকে দেখুন"
 ],
 [
  "View all ↗",
  "সব দেখুন ↗"
 ],
 [
  "Resource options ↗",
  "রিসোর্স যোগ করার অপশন ↗"
 ],
 [
  "More resource details will be added later.",
  "রিসোর্সের বিস্তারিত তথ্য পরে যোগ হবে।"
 ],
 [
  "Details ↗",
  "বিস্তারিত ↗"
 ],
 [
  "Fri",
  "শুক্র"
 ],
 [
  "Friday",
  "শুক্রবার"
 ],
 [
  "9:30–11:30 PM",
  "রাত ৯:৩০–১১:৩০"
 ],
 [
  "Regular class",
  "নিয়মিত ক্লাস"
 ],
 [
  "Sun",
  "রবি"
 ],
 [
  "Sunday",
  "রবিবার"
 ],
 [
  "Tue",
  "মঙ্গল"
 ],
 [
  "Tuesday",
  "মঙ্গলবার"
 ],
 [
  "7 PM–1 AM",
  "সন্ধ্যা ৭টা–রাত ১টা"
 ],
 [
  "Practice & support",
  "প্র্যাকটিস ও সাপোর্ট"
 ],
 [
  "Official weekly batch schedule",
  "অফিশিয়াল ব্যাচের সাপ্তাহিক সময়সূচি"
 ],
 [
  " Original class announcement ↗",
  " মূল ক্লাসের ঘোষণা ↗"
 ],
 [
  "Advertisement",
  "বিজ্ঞাপন"
 ],
 [
  "Topic learning environment",
  "টপিকের শেখার পরিবেশ"
 ],
 [
  "Learn Cyber Security & AI.",
  "সাইবার সিকিউরিটি ও AI শিখুন।"
 ],
 [
  "Build skills through practice.",
  "প্র্যাকটিসে গড়ুন দক্ষতা।"
 ],
 [
  "Watch classes, understand each topic and practise in your own lab. Find recordings, notes, documents and tools at every step.",
  "ক্লাস দেখুন, বিষয় বুঝুন, নিজের ল্যাবে প্র্যাকটিস করুন। প্রতিটি ধাপে পাশে আছে ক্লাস রেকর্ড, নোট, ডকুমেন্ট ও প্রয়োজনীয় টুলস।"
 ],
 [
  "Start learning →",
  "ক্লাস শুরু করুন →"
 ],
 [
  "Learning roadmap ↗",
  "শেখার রোডম্যাপ ↗"
 ],
 [
  "Archive statistics",
  "আর্কাইভের পরিসংখ্যান"
 ],
 [
  "Organized classes",
  "সাজানো ক্লাস"
 ],
 [
  "Posts & resources",
  "পোস্ট ও রিসোর্স"
 ],
 [
  "Playback-verified videos",
  "প্লেব্যাক যাচাই করা ভিডিও"
 ],
 [
  "Full notes to read here",
  "সাইটে পড়ার পূর্ণ নোট"
 ],
 [
  "Start learning in order",
  "ধারাবাহিকভাবে শেখা শুরু করুন"
 ],
 [
  "All classes ↗",
  "সব ক্লাস ↗"
 ],
 [
  "Weekly schedule",
  "সাপ্তাহিক সময়সূচি"
 ],
 [
  "Schedule ↗",
  "সময়সূচি ↗"
 ],
 [
  "The original post does not specify a time zone. Special announcements may change the schedule.",
  "সময় অঞ্চল মূল পোস্টে উল্লেখ নেই। বিশেষ নোটিশ অনুযায়ী সময় বদলাতে পারে।"
 ],
 [
  "Explore by topic",
  "বিষয় অনুযায়ী ঘুরে দেখুন"
 ],
 [
  "All resources ↗",
  "সব রিসোর্স ↗"
 ],
 [
  " posts & resources",
  "টি পোস্ট ও রিসোর্স"
 ],
 [
  "Each class has space for videos, notes, documents and tools. Pending resources will be added later. Unverified dates are marked separately.",
  "সাইটের প্রতিটি ক্লাসে ভিডিও, নোট, ডকুমেন্ট ও টুলসের জায়গা প্রস্তুত। যেগুলো বাকি আছে, সেগুলো পরবর্তী ধাপে যুক্ত হবে। অনিশ্চিত তারিখ আলাদাভাবে দেখানো আছে।"
 ],
 [
  "Tool files & official downloads",
  "টুল ফাইল ও অফিসিয়াল ডাউনলোড"
 ],
 [
  "Preserved ZIP/RAR files and official software downloads are listed below. On a download page, choose the installer for your operating system.",
  "সংরক্ষিত ZIP/RAR এবং অফিসিয়াল software downloads নিচে আছে। যে বাটন download page খোলে, সেখানে নিজের OS অনুযায়ী installer বাছুন।"
 ],
 [
  " · preserved course file",
  " · সংরক্ষিত কোর্স ফাইল"
 ],
 [
  "File password: ",
  "ফাইল খোলার পাসওয়ার্ড: "
 ],
 [
  "Download ↓",
  "ডাউনলোড ↓"
 ],
 [
  "View file ↗",
  "ফাইল দেখুন ↗"
 ],
 [
  "Setup & instructions",
  "সেটআপ ও নির্দেশনা"
 ],
 [
  "Official source · not a hosted mirror",
  "অফিসিয়াল উৎস · নিজস্ব mirror নয়"
 ],
 [
  "Setup guides & posts",
  "সেটআপ নির্দেশনা ও পোস্ট"
 ],
 [
  "Classes are arranged in recording order. Open each class for its video or original live source and related resources.",
  "ক্লাসের সিরিয়াল ধরে সাজানো আছে। প্রতিটি ক্লাসে তার ভিডিও বা মূল লাইভ সোর্স এবং সংশ্লিষ্ট রিসোর্স দেখবেন।"
 ],
 [
  "Tool information, setup instructions and resource links. Additional tools can be added here later.",
  "টুলসের তথ্য, সেটআপ নির্দেশনা ও রিসোর্স লিংক। প্রয়োজনীয় নতুন টুল পরে একই জায়গায় যুক্ত করা যাবে।"
 ],
 [
  "Batch announcements, class instructions and important information in one place.",
  "ব্যাচের ঘোষণা, ক্লাসের নির্দেশনা ও গুরুত্বপূর্ণ তথ্য এক জায়গায়।"
 ],
 [
  "Find videos, notes, documents, tools and information by topic.",
  "ভিডিও, নোট, ডকুমেন্ট, টুলস ও তথ্য বিষয় অনুযায়ী খুঁজে নিন।"
 ],
 [
  " ",
  "টি "
 ],
 [
  "Class",
  "ক্লাস"
 ],
 [
  "Post",
  "পোস্ট"
 ],
 [
  "Search classes, topics or resources…",
  "ক্লাস, টপিক বা রিসোর্স খুঁজুন…"
 ],
 [
  "Search",
  "খুঁজুন"
 ],
 [
  "Choose topic",
  "টপিক বাছাই"
 ],
 [
  "All topics",
  "সব টপিক"
 ],
 [
  "Choose month",
  "মাস বাছাই"
 ],
 [
  "All months",
  "সব মাস"
 ],
 [
  "Clear filters",
  "ফিল্টার মুছুন"
 ],
 [
  "All",
  "সব"
 ],
 [
  " results",
  "টি ফলাফল"
 ],
 [
  " · recording order",
  " · রেকর্ডের সিরিয়াল অনুযায়ী"
 ],
 [
  " · date order",
  " · তারিখ অনুযায়ী"
 ],
 [
  "No resources found",
  "কোনো রিসোর্স পাওয়া যায়নি"
 ],
 [
  "Choose another topic or month, or clear your search and try again.",
  "অন্য টপিক বা মাস বেছে নিন, অথবা অনুসন্ধানটি মুছে আবার দেখুন।"
 ],
 [
  "Google Docs · class document",
  "Google Docs · ক্লাস ডকুমেন্ট"
 ],
 [
  "Google Drive · source file",
  "Google Drive · সোর্স ফাইল"
 ],
 [
  "YouTube video",
  "YouTube ভিডিও"
 ],
 [
  "Resource link",
  "রিসোর্স লিংক"
 ],
 [
  "Download preserved file ↓",
  "সংরক্ষিত ফাইল ডাউনলোড ↓"
 ],
 [
  "Preserved copy · ",
  "সংরক্ষিত কপি · "
 ],
 [
  "Extra copy on Drive ↗",
  "Drive-এ অতিরিক্ত কপি ↗"
 ],
 [
  "Related class ",
  "সংশ্লিষ্ট ক্লাস "
 ],
 [
  "Original Facebook post ↗",
  "মূল Facebook পোস্ট ↗"
 ],
 [
  "Preserved file information",
  "সংরক্ষিত ফাইলের তথ্য"
 ],
 [
  "Archive: ",
  "আর্কাইভের "
 ],
 [
  " supporting videos",
  "টি সহায়ক ভিডিও"
 ],
 [
  "These videos are inside the preserved RAR file. Download the copy above and use the password provided in the course post.",
  "ভিডিওগুলো সংরক্ষিত RAR ফাইলে আছে। উপরের কপি ডাউনলোড করে কোর্স পোস্টে দেওয়া পাসওয়ার্ড দিয়ে খোলা যায়।"
 ],
 [
  "Google Dorks by topic · ",
  "টপিক অনুযায়ী Google Dork · "
 ],
 [
  " examples",
  "টি উদাহরণ"
 ],
 [
  "These archive-added examples are restricted to authorized practice scopes. They are not a verbatim list of the instructor's queries.",
  "উদাহরণগুলো আর্কাইভের যোগ করা, scope-এ সীমিত অনুশীলন। এগুলো শিক্ষকের হুবহু query তালিকা নয়।"
 ],
 [
  "Copy",
  "কপি করুন"
 ],
 [
  "Copied",
  "কপি হয়েছে"
 ],
 [
  "Select the query text and copy it.",
  "Query-এর লেখা সিলেক্ট করে কপি করুন।"
 ],
 [
  "Copy dork · ",
  "ডর্ক কপি করুন · "
 ],
 [
  "Class notes will be added later",
  "ক্লাস নোট পরে যোগ হবে"
 ],
 [
  "No separate notes attached",
  "আলাদা নোট যুক্ত নেই"
 ],
 [
  "Space is ready for this class's written notes, summary and key points.",
  "এই ক্লাসের লিখিত নোট, সারাংশ ও গুরুত্বপূর্ণ বিষয় রাখার জায়গা প্রস্তুত।"
 ],
 [
  "See the resource description and available links in the “Resource information” tab.",
  "এই রিসোর্সের বিবরণ ও উপলব্ধ লিংক “রিসোর্সের তথ্য” ট্যাবে দেখুন।"
 ],
 [
  "Download preserved notes ↓",
  "সংরক্ষিত নোট ডাউনলোড ↓"
 ],
 [
  "Download full notes ↗",
  "পূর্ণ নোট ডাউনলোড করুন ↗"
 ],
 [
  "Back to all classes",
  "সব ক্লাসে ফিরুন"
 ],
 [
  "Back to library",
  "লাইব্রেরিতে ফিরুন"
 ],
 [
  "Class topics and the full resource list will be verified and added later.",
  "ক্লাসের টপিক ও পূর্ণ রিসোর্স তালিকা পরবর্তী ধাপে যাচাই করে যোগ হবে।"
 ],
 [
  "YouTube's daily upload limit has been reached. A preserved Drive copy is linked in the resources below.",
  "YouTube-এর দৈনিক আপলোড সীমায় আছে। সংরক্ষিত Drive কপি নিচের রিসোর্সে পাওয়া যাবে।"
 ],
 [
  "Upload progress is saved. Verified video links will play here when added.",
  "শুরু করা আপলোডের কাজ সংরক্ষিত আছে। যাচাই করা ভিডিও এখানে যুক্ত হলে সাইটের ভেতরেই দেখা যাবে।"
 ],
 [
  "The class player is ready. The video will play here when its link is added.",
  "এই ক্লাসের ভিডিও রাখার জায়গা প্রস্তুত। ভিডিও লিংক যোগ হলে এখানেই প্লে হবে।"
 ],
 [
  "Open original recording on Facebook ↗",
  "Facebook-এ মূল রেকর্ডিং খুলুন ↗"
 ],
 [
  "Open live / original recording on Facebook ↗",
  "Facebook-এ লাইভ / মূল রেকর্ডিং খুলুন ↗"
 ],
 [
  "Class date",
  "ক্লাসের তারিখ"
 ],
 [
  "Related class date",
  "সংশ্লিষ্ট ক্লাসের তারিখ"
 ],
 [
  "Post date",
  "পোস্টের তারিখ"
 ],
 [
  "Time stated in post",
  "পোস্টে দেওয়া সময়"
 ],
 [
  "Regular class time",
  "নিয়মিত ক্লাসের সময়"
 ],
 [
  "Time awaiting verification",
  "সময় যাচাই বাকি"
 ],
 [
  "Video duration",
  "ভিডিওর দৈর্ঘ্য"
 ],
 [
  "To be added",
  "পরে যোগ হবে"
 ],
 [
  "Class resources",
  "ক্লাসের রিসোর্স"
 ],
 [
  "Resource category",
  "রিসোর্সের বিভাগ"
 ],
 [
  "Class information",
  "ক্লাসের তথ্য"
 ],
 [
  "Resource information",
  "রিসোর্সের তথ্য"
 ],
 [
  "Topic: ",
  "বিষয়: "
 ],
 [
  "Recording #",
  "রেকর্ড #"
 ],
 [
  ". The class video and related resources are available in the sections below.",
  ". এই ক্লাসের ভিডিও ও সংশ্লিষ্ট রিসোর্স নিচের জায়গাগুলোতে পাওয়া যাবে।"
 ],
 [
  "The time above follows the weekly schedule. This recording's actual start time is awaiting verification.",
  "উপরের সময় সাপ্তাহিক শিডিউল অনুযায়ী। এই রেকর্ডের প্রকৃত শুরুর সময় যাচাই বাকি।"
 ],
 [
  "Class video",
  "ক্লাস ভিডিও"
 ],
 [
  "A video is connected to the site player.",
  "সাইটের প্লেয়ারে ভিডিও যুক্ত আছে।"
 ],
 [
  "The player is ready; a verified video will be added later.",
  "ভিডিওর জায়গা প্রস্তুত; যাচাই করা ভিডিও পরে যোগ হবে।"
 ],
 [
  "Class notes",
  "ক্লাস নোট"
 ],
 [
  "Read the preserved notes in the “Notes” tab.",
  "সংরক্ষিত নোট “নোট” ট্যাবে পড়া যাবে।"
 ],
 [
  "A class summary and written notes will be added later.",
  "ক্লাসের সারাংশ ও লিখিত নোট পরে যোগ হবে।"
 ],
 [
  "Documents",
  "ডকুমেন্ট"
 ],
 [
  "Related files are in the “Documents” tab.",
  "সংশ্লিষ্ট ডকুমেন্ট “ডকুমেন্ট” ট্যাবে আছে।"
 ],
 [
  "PDFs, slides and required files will be added later.",
  "PDF, স্লাইড ও প্রয়োজনীয় ফাইল পরে যোগ হবে।"
 ],
 [
  "Download and setup information is in the “Tools” tab.",
  "ডাউনলোড ও সেটআপের তথ্য “টুলস” ট্যাবে আছে।"
 ],
 [
  "Required tools and setup guides will be added later.",
  "প্রয়োজনীয় টুলস ও সেটআপ নির্দেশনা পরে যোগ হবে।"
 ],
 [
  "Related class date: ",
  "সংশ্লিষ্ট ক্লাসের তারিখ: "
 ],
 [
  "View details ↗",
  "বিস্তারিত দেখুন ↗"
 ],
 [
  "Class documents will be added later",
  "ক্লাস ডকুমেন্ট পরে যোগ হবে"
 ],
 [
  "Class tools will be added later",
  "ক্লাসের টুলস পরে যোগ হবে"
 ],
 [
  "No separate documents attached",
  "আলাদা ডকুমেন্ট যুক্ত নেই"
 ],
 [
  "No separate tools attached",
  "আলাদা টুল যুক্ত নেই"
 ],
 [
  "Space is ready for PDFs, slides, class files and other documents.",
  "PDF, স্লাইড, ক্লাস ফাইল ও অন্যান্য ডকুমেন্ট এখানে রাখার জায়গা প্রস্তুত।"
 ],
 [
  "Required tools, setup guides and instructions can be added here.",
  "এই ক্লাসের প্রয়োজনীয় টুল, সেটআপ গাইড ও ব্যবহারবিধি এখানে রাখা যাবে।"
 ],
 [
  "Notes",
  "নোট"
 ],
 [
  "Tools",
  "টুলস"
 ],
 [
  "← Previous class",
  "← আগের ক্লাস"
 ],
 [
  "Next class →",
  "পরের ক্লাস →"
 ],
 [
  "Class schedule",
  "ক্লাসের সময়সূচি"
 ],
 [
  "See regular class and support times. The list below shows the dates of collected recordings.",
  "নিয়মিত ক্লাস ও সাপোর্টের সময় দেখুন। নিচের তালিকায় সংগ্রহ করা রেকর্ডের তারিখ দেখানো আছে।"
 ],
 [
  "The post does not specify a time zone.",
  "পোস্টে সময় অঞ্চল উল্লেখ নেই।"
 ],
 [
  "Original official schedule post ↗",
  "অফিশিয়াল সময়সূচির মূল পোস্ট ↗"
 ],
 [
  "Class recordings by date",
  "তারিখ অনুযায়ী ক্লাস রেকর্ড"
 ],
 [
  "Choose calendar month",
  "ক্যালেন্ডারের মাস বাছাই"
 ],
 [
  "Time stated in post: ",
  "পোস্টে দেওয়া সময়: "
 ],
 [
  "Weekly time: 9:30–11:30 PM · actual time awaiting verification",
  "সাপ্তাহিক সময়: রাত ৯:৩০–১১:৩০ · প্রকৃত সময় যাচাই বাকি"
 ],
 [
  "Class details ↗",
  "ক্লাসের বিস্তারিত ↗"
 ],
 [
  "A place for organized learning",
  "শেখার জন্য সাজানো একটি জায়গা"
 ],
 [
  "Class sequence",
  "ক্লাসের ধারাবাহিকতা"
 ],
 [
  "Recordings have their own sequence. collectionIndex tracks post collection order; it is not used as a class number.",
  "ক্লাস রেকর্ড আলাদা সিরিয়াল অনুযায়ী সাজানো। collectionIndex পোস্ট সংগ্রহের ক্রম; সেটি ক্লাস নম্বর হিসেবে দেখানো হয় না।"
 ],
 [
  "More resources can be added later",
  "পরে রিসোর্স যোগ করা যাবে"
 ],
 [
  "Every class has space for video, notes, documents and tools. Newly verified resources can be linked to the relevant class.",
  "প্রতিটি ক্লাসে ভিডিও, নোট, ডকুমেন্ট ও টুলসের জায়গা আছে। নতুন যাচাই করা রিসোর্স সংশ্লিষ্ট ক্লাসে যুক্ত করা যাবে।"
 ],
 [
  "Date & time information",
  "তারিখ ও সময়ের তথ্য"
 ],
 [
  "Unverified post dates are marked separately. Recording dates and the weekly schedule are shown; confirmed class times can be added later.",
  "যাচাই না হওয়া পোস্টের তারিখ আলাদাভাবে দেখানো হয়। রেকর্ডের তারিখ ও সাপ্তাহিক শিডিউল দেখানো আছে; প্রকৃত ক্লাসের সময় নিশ্চিত হলে যুক্ত হবে।"
 ],
 [
  "Watching videos",
  "ভিডিও দেখার ব্যবস্থা"
 ],
 [
  "Connected YouTube and Dailymotion videos play on this website. Other videos have prepared slots. Facebook source links may require group membership.",
  "যুক্ত YouTube ও Dailymotion ভিডিও ওয়েবসাইটের ভেতরেই প্লে হবে। বাকি ভিডিওর জন্য প্রস্তুত জায়গা আছে। Facebook সোর্স লিংক দেখতে সদস্যপদ প্রয়োজন হতে পারে।"
 ],
 [
  "The website structure is ready. Collection of all course resources and date verification is not yet complete.",
  "ওয়েবসাইটের কাঠামো প্রস্তুত। কোর্সের সব রিসোর্স সংগ্রহ ও তারিখ যাচাই এখনো সম্পূর্ণ নয়।"
 ],
 [
  "Website GitHub repository ↗",
  "সাইটের GitHub repository ↗"
 ],
 [
  "This resource was not found",
  "এই রিসোর্সটি পাওয়া যায়নি"
 ],
 [
  "Choose a class or resource from the library.",
  "লাইব্রেরি থেকে একটি ক্লাস বা রিসোর্স বেছে নিন।"
 ],
 [
  "Open menu",
  "মেনু খুলুন"
 ],
 [
  "Close menu",
  "মেনু বন্ধ করুন"
 ],
 [
  "Data could not load",
  "তথ্য লোড হয়নি"
 ],
 [
  "Reload this page. The website structure and resources are stored separately.",
  "পেজটি আবার খুলুন। সাইটের কাঠামো ও রিসোর্স আলাদাভাবে সংরক্ষিত আছে।"
 ],
 [
  "Syllabus & roadmap",
  "সিলেবাস ও রোডম্যাপ"
 ],
 [
  "Preserved archive",
  "সংরক্ষিত আর্কাইভ"
 ],
 [
  "☾ Dark mode",
  "☾ ডার্ক মোড"
 ],
 [
  "☀ Light mode",
  "☀ লাইট মোড"
 ],
 [
  "Switch to dark mode",
  "ডার্ক মোড চালু করুন"
 ],
 [
  "Switch to light mode",
  "লাইট মোড চালু করুন"
 ],
 [
  "Class evidence found",
  "ক্লাস পাওয়া গেছে"
 ],
 [
  "Partially covered",
  "আংশিক পাওয়া গেছে"
 ],
 [
  "No class evidence found",
  "ক্লাসের প্রমাণ নেই"
 ],
 [
  "Learning roadmap",
  "শেখার রোডম্যাপ"
 ],
 [
  "Course syllabus & learning topics",
  "কোর্সের পাঠ্যসূচি ও শেখার বিষয়"
 ],
 [
  "Full course resources",
  "সম্পূর্ণ কোর্সের রিসোর্স"
 ],
 [
  "Syllabus in preparation",
  "সিলেবাস প্রস্তুত হচ্ছে"
 ],
 [
  "A verified syllabus will be added later.",
  "যাচাই করা সিলেবাস পরে যুক্ত হবে।"
 ],
 [
  "Syllabus & classes — side by side",
  "সিলেবাস ও ক্লাস — পাশাপাশি"
 ],
 [
  "Official PDF topics appear on the left; identified class dates, videos and verification appear on the right. Syllabus weeks and actual class order may differ.",
  "বাঁয়ে অফিসিয়াল PDF-এর বিষয়গুলো, ডানে পাওয়া ক্লাসের তারিখ, ভিডিও ও যাচাইয়ের অবস্থা। সিলেবাসের সপ্তাহ ও বাস্তব ক্লাসের ক্রম আলাদা হতে পারে।"
 ],
 [
  "Download original syllabus ↓",
  "মূল সিলেবাস ডাউনলোড ↓"
 ],
 [
  "Open original PDF ↗",
  "মূল PDF খুলুন ↗"
 ],
 [
  "Official course page ↗",
  "অফিসিয়াল কোর্স পেজ ↗"
 ],
 [
  "View original official syllabus · 6 pages",
  "মূল অফিসিয়াল সিলেবাস দেখুন · ৬ পৃষ্ঠা"
 ],
 [
  "Arena Web Security official syllabus",
  "Arena Web Security অফিসিয়াল সিলেবাস"
 ],
 [
  "Source verified: ",
  "উৎস যাচাই: "
 ],
 [
  "Preserved original classes",
  "সংরক্ষিত মূল ক্লাস"
 ],
 [
  "Finding a class means a related recording was identified; it does not confirm coverage of every subtopic, exam or the whole course. Missing evidence does not prove a class never happened.",
  "ক্লাস পাওয়া গেছে মানে সংশ্লিষ্ট বিষয়ের রেকর্ড শনাক্ত হয়েছে; সব উপবিষয়, পরীক্ষা বা কোর্স সম্পূর্ণ হওয়ার নিশ্চয়তা নয়। প্রমাণ নেই মানে ক্লাস হয়নি—এমন সিদ্ধান্ত নয়।"
 ],
 [
  "All subjects",
  "সব বিষয়"
 ],
 [
  "Partial",
  "আংশিক"
 ],
 [
  "Pending / awaiting verification",
  "বাকি / যাচাই বাকি"
 ],
 [
  "Official syllabus",
  "অফিসিয়াল সিলেবাস"
 ],
 [
  "Identified classes",
  "যে ক্লাসগুলো পাওয়া গেছে"
 ],
 [
  " · official syllabus",
  " · অফিসিয়াল সিলেবাস"
 ],
 [
  "Original PDF · page ",
  "মূল PDF · পৃষ্ঠা "
 ],
 [
  "Class ",
  "ক্লাস "
 ],
 [
  "No specific recording for this topic has been identified in the preserved class list.",
  "সংরক্ষিত মূল ক্লাসের তালিকায় এই বিষয়ের নির্দিষ্ট রেকর্ড শনাক্ত হয়নি।"
 ],
 [
  "Further verification / pending: ",
  "আরও যাচাই / বাকি: "
 ],
 [
  "Preserved course resources",
  "সংরক্ষিত কোর্সের রিসোর্স"
 ],
 [
  "Your archive beyond Facebook",
  "Facebook-এর বাইরে আপনার আর্কাইভ"
 ],
 [
  "Preserved text, notes and owned files remain available even if the original group closes.",
  "সংরক্ষিত লেখা, নোট ও নিজস্ব ফাইল থাকলে মূল গ্রুপ বন্ধ হলেও সেগুলো পাওয়া যাবে।"
 ],
 [
  "Posts & information",
  "পোস্ট ও তথ্য"
 ],
 ["Post text and source references are preserved in protected course storage. Authorized students can read them here even if the original Facebook post is removed.","পোস্টের লেখা ও উৎসের পরিচয় কোর্সের সুরক্ষিত ডেটাবেসে সংরক্ষিত। অনুমতি পাওয়া শিক্ষার্থী সাইটেই পড়তে পারেন; মূল Facebook পোস্ট মুছে গেলেও সংরক্ষিত কপি থাকে।"],
 [
  "Notes & PDFs",
  "নোট ও PDF"
 ],
 ["Full notes and preserved PDFs are served after course access is checked. File downloads require the same course permission.","পূর্ণ নোট ও সংরক্ষিত PDF কোর্সের অনুমতি যাচাই করে দেখানো হয়। ফাইল ডাউনলোডের সময়ও একই অনুমতি পরীক্ষা করা হয়।"],
 [
  "Verified recordings are hosted on YouTube as Unlisted, or on Dailymotion as link-accessible Private videos, and play in the site player. Downloaded copies are removed after upload and playback verification.",
  "যাচাই করা রেকর্ড আপনার YouTube-এ Unlisted অথবা Dailymotion-এ লিংক দিয়ে দেখা যায় এমন Private হিসেবে থাকে এবং সাইটের প্লেয়ারে চলে। আপলোড ও প্লেব্যাক যাচাইয়ের পর ডাউনলোড কপি সরানো হয়।"
 ],
 [
  "Tool files",
  "টুল ফাইল"
 ],
 ["Tool descriptions, setup guidance and preserved files are linked to their classes. An external source link does not by itself mean an independent copy has been preserved.","টুলের বিবরণ, সেটআপ ও সংরক্ষিত ফাইল সংশ্লিষ্ট ক্লাসের সঙ্গে যুক্ত। বাইরের উৎসের লিংক থাকলেই সেটির আলাদা কপি সংরক্ষিত আছে—এমন নিশ্চয়তা নেই।"],
 ["Online services cannot guarantee permanent retention. An encrypted private backup of preserved course content and files has been tested; scheduled backups and a full recovery drill are still pending.","অনলাইন সেবা স্থায়ী সংরক্ষণের নিশ্চয়তা দেয় না। সংরক্ষিত কোর্সের তথ্য ও ফাইলের একটি এনক্রিপ্টেড ব্যক্তিগত ব্যাকআপ পরীক্ষা করা হয়েছে; নিয়মিত ব্যাকআপ ও পূর্ণ পুনরুদ্ধার পরীক্ষা এখনও বাকি।"],
 [
  "Download JSON data ↓",
  "তথ্যের JSON কপি ↓"
 ],
 [
  "Download written post catalog ↓",
  "পোস্টের লিখিত ক্যাটালগ ↓"
 ],
 [
  "Preserved notes, files & ready videos",
  "সংরক্ষিত নোট, ফাইল ও প্রস্তুত ভিডিও"
 ],
 [
  "Too many attempts. Please wait and try again.",
  "অনেকবার চেষ্টা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
 ],
 [
  "The request could not be completed. Check your details and try again.",
  "অনুরোধটি সম্পন্ন হয়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।"
 ],
 [
  "Link account · ",
  "সংযুক্ত করুন · "
 ],
 [
  "Continue with · ",
  "প্রবেশ করুন · "
 ],
 [
  " · not configured yet",
  " · এখনো চালু নয়"
 ],
 [
  "The sign-in destination could not be verified.",
  "প্রবেশের ঠিকানা যাচাই হয়নি।"
 ],
 [
  "Google/GitHub connection status is unavailable.",
  "Google/GitHub সংযোগের অবস্থা পাওয়া যায়নি।"
 ],
 [
  "Close",
  "বন্ধ করুন"
 ],
 [
  "One account for your learning",
  "একটি অ্যাকাউন্টে আপনার শেখা"
 ],
 [
  "Sign in",
  "সাইন ইন"
 ],
 [
  "Register",
  "নিবন্ধন"
 ],
 [
  "Your name",
  "আপনার নাম"
 ],
 [
  "Email",
  "ইমেইল"
 ],
 [
  "Password",
  "পাসওয়ার্ড"
 ],
 [
  "Create account",
  "অ্যাকাউন্ট তৈরি করুন"
 ],
 [
  "Sign in",
  "সাইন ইন করুন"
 ],
 [
  "…2214 tokens truncated… সঙ্গে যুক্ত হয়। ভিজিট ইতিহাসে সরাসরি IP রাখা হয় না। Do Not Track / GPC মানা হয়।"
 ],
 [
  "Privacy · CyberNest",
  "গোপনীয়তা · CyberNest"
 ],
 [
  "Privacy information about CyberNest accounts, Google/GitHub sign-in, visitor history and advertising.",
  "CyberNest-এর অ্যাকাউন্ট, Google/GitHub প্রবেশ, ভিজিটের ইতিহাস ও বিজ্ঞাপন সম্পর্কে গোপনীয়তার তথ্য।"
 ],
 [
  "Course Library ↗",
  "কোর্স লাইব্রেরি ↗"
 ],
 [
  "Privacy & your information",
  "গোপনীয়তা ও আপনার তথ্য"
 ],
 [
  "Last updated: 27 October 2026",
  "সর্বশেষ হালনাগাদ: ২৭ অক্টোবর ২০২৬"
 ],
 [
  "CyberNest lets you explore courses, watch approved lessons and use learning materials. You do not need to sign in to read this page.",
  "CyberNest-এ কোর্স খোঁজা, অনুমোদিত পাঠ দেখা এবং শেখার উপকরণ ব্যবহার করা যায়। এই পেজ পড়তে সাইন ইন প্রয়োজন নেই।"
 ],
 [
  "Accounts & sign-in",
  "অ্যাকাউন্ট ও সাইন ইন"
 ],
 [
  "Email registration stores your name, email, a secure password hash and required session information. If you choose Google or GitHub, your approved name, email, profile photo and provider account identifier create or verify your account. CyberNest does not receive your Google/GitHub password. This sign-in does not request permission to read Gmail, Google Drive or GitHub repositories.",
  "ইমেইল দিয়ে নিবন্ধন করলে নাম, ইমেইল, পাসওয়ার্ডের সুরক্ষিত হ্যাশ ও প্রয়োজনীয় সেশন তথ্য রাখা হয়। Google বা GitHub বেছে নিলে আপনার অনুমোদিত নাম, ইমেইল, প্রোফাইলের ছবি ও provider account identifier দিয়ে অ্যাকাউন্ট তৈরি বা যাচাই করা হয়। Google/GitHub-এর পাসওয়ার্ড CyberNest পায় না। এই প্রবেশের জন্য Gmail, Google Drive বা GitHub repository পড়ার অনুমতি চাওয়া হয় না।"
 ],
 [
  "Provider connection tokens are encrypted on the server when needed. Accounts are not automatically merged just because they share an email address. Registration alone grants neither course nor admin access.",
  "Provider-এর সংযোগ-সংক্রান্ত টোকেন প্রয়োজন হলে সার্ভারে এনক্রিপ্ট করে রাখা হয়। একই ইমেইল দেখলেই দুটি অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে জোড়া হয় না। নিবন্ধন নিজে থেকে কোনো কোর্স বা অ্যাডমিনের অনুমতি দেয় না।"
 ],
 [
  "Visitor & learning history",
  "ভিজিট ও শেখার ইতিহাস"
 ],
 [
  "Visitor counting and detailed history require your analytics permission. Both use the same session records. Older aggregate records are kept separately and are not added to overlapping totals. With permission, pages, approximate country, visit times and estimated visible, active-tab time are saved. Signed-in activity may be linked to your account. Earlier guest history is not later reassigned to your name.",
  "দর্শক গণনা ও বিস্তারিত ইতিহাসের জন্য আপনার পরিসংখ্যানের অনুমতি প্রয়োজন। দুটিতেই একই সেশনের তথ্য ব্যবহৃত হয়। আগের মোট হিসাব আলাদাভাবে রাখা আছে; একই সময়ের নতুন হিসাবের সঙ্গে যোগ করা হয় না। অনুমতি দিলে দেখা পেজ, আনুমানিক দেশ, ভিজিটের সময় এবং ট্যাব সামনে ও সক্রিয় থাকার আনুমানিক সময় রাখা হয়। সাইন ইন করা অবস্থার ইতিহাস অ্যাকাউন্টের সঙ্গে যুক্ত হতে পারে। অতিথির আগের ইতিহাস পরে তার নামে বদলে দেওয়া হয় না।"
 ],
 [
  "Raw IP addresses are not stored in visitor history. Limited abuse-prevention counters use a changing, secret-key-derived network identifier. Sign-in security sessions are separate. Do Not Track/GPC disables visitor counting. Change detailed-history permission through “Analytics preferences” on the main page. Opting out stops new collection; it does not automatically erase earlier records.",
  "ভিজিট ইতিহাসে সরাসরি IP ঠিকানা রাখা হয় না। অপব্যবহার ঠেকানোর সীমিত হিসাবের জন্য পরিবর্তিত, গোপন কী দিয়ে তৈরি নেটওয়ার্ক শনাক্তক ব্যবহার করা হয়। সাইন-ইনের নিরাপত্তা সেশন আলাদা ব্যবস্থা। Do Not Track/GPC চালু থাকলে দর্শক গণনা বন্ধ থাকে। মূল পেজের “পরিসংখ্যানের পছন্দ” থেকে বিস্তারিত ইতিহাসের অনুমতি বদলাতে পারবেন। অনুমতি বন্ধ করলে নতুন সংগ্রহ বন্ধ হয়; আগে রাখা রেকর্ড নিজে থেকে মুছে যায় না।"
 ],
 [
  "Why information is used & who can see it",
  "কেন ও কারা তথ্য ব্যবহার করেন"
 ],
 [
  "Information supports sign-in verification, course access, account security and consented usage statistics. Only authorized admins see identifiable visitor history. Analysts and marketers see totals allowed by their roles, not personal history.",
  "তথ্য ব্যবহার হয় প্রবেশ যাচাই, কোর্সের অনুমতি, অ্যাকাউন্টের নিরাপত্তা ও অনুমতি দেওয়া ব্যবহারের পরিসংখ্যান দেখাতে। নামসহ ভিজিটের ইতিহাস কেবল অনুমোদিত অ্যাডমিন দেখেন। বিশ্লেষক ও মার্কেটার তাঁদের দায়িত্ব অনুযায়ী মোট সংখ্যা দেখেন; ব্যক্তিগত ইতিহাস পান না।"
 ],
 [
  "Personal information from Google/GitHub is not sent to ad code or used for sale. Use of information received from Google APIs follows the",
  "Google/GitHub থেকে পাওয়া ব্যক্তিগত তথ্য বিজ্ঞাপনের কোডে পাঠানো বা বিক্রির জন্য ব্যবহার করা হয় না। Google API থেকে পাওয়া তথ্যের ব্যবহার"
 ],
 [
  ", including its Limited Use requirements.",
  ", including its Limited Use requirements, মেনে সীমিত রাখা হয়।"
 ],
 [
  "External services & advertisements",
  "বাইরের সেবা ও বিজ্ঞাপন"
 ],
 [
  "Vercel hosts the website, and managed Postgres stores account and access information. Google/GitHub sign-in takes place on the provider's own pages. Playing videos may involve YouTube or Dailymotion; showing ads may involve advertising services. These services can process their own requests, cookies or usage information. Advertising code runs on a separate host and is not given the website's login tokens.",
  "সাইটের হোস্টিং Vercel-এ এবং অ্যাকাউন্ট ও অনুমতির তথ্য পরিচালিত Postgres ডেটাবেসে রাখা হয়। আপনার বেছে নেওয়া Google/GitHub সাইন-ইন তাদের নিজস্ব পেজে হয়। ভিডিও চালালে YouTube বা Dailymotion এবং বিজ্ঞাপন দেখালে সংশ্লিষ্ট বিজ্ঞাপন সেবা তাদের নিজস্ব নেটওয়ার্ক অনুরোধ, কুকি বা ব্যবহার-তথ্য প্রক্রিয়া করতে পারে। বিজ্ঞাপনের কোড অ্যাকাউন্টের পেজ থেকে পৃথক হোস্টে চালানো হয়; সেটিকে সাইটের লগইন টোকেন দেওয়া হয় না।"
 ],
 [
  "Retention & your choices",
  "সংরক্ষণ ও আপনার পছন্দ"
 ],
 [
  "Accounts, course permissions, management records and consented history remain in the database across deployments. There is currently no scheduled automatic expiry and deletion for these records. You may ask the site owner to access, correct or delete your data; there is not yet a self-service account deletion button.",
  "অ্যাকাউন্ট, কোর্সের অনুমতি, পরিচালনার রেকর্ড ও সম্মতিতে সংগ্রহ করা ইতিহাস ডেটাবেসে থাকে এবং নতুন সাইট প্রকাশের পরও থাকে। বর্তমানে এসব রেকর্ডের স্বয়ংক্রিয় মেয়াদ শেষে মুছে দেওয়ার সময়সূচি নেই। আপনি প্রবেশ, সংশোধন বা মুছে দেওয়ার অনুরোধ সাইটের মালিককে জানাতে পারেন; সরাসরি অ্যাকাউন্ট মুছে ফেলার বোতাম এখনো নেই।"
 ],
 [
  "You can revoke a connection from Google Account's connected-app list or GitHub's Authorized OAuth Apps. This does not automatically delete information already held by this website. Support:",
  "Google Account-এর সংযুক্ত অ্যাপের তালিকা বা GitHub-এর Authorized OAuth Apps থেকে সংযোগ প্রত্যাহার করতে পারবেন। এতে আগে সাইটে রাখা তথ্য স্বয়ংক্রিয়ভাবে মুছে যায় না। সহায়তার ঠিকানা:"
 ],
 [
  "← Back to CyberNest",
  "← CyberNest-এ ফিরুন"
 ],
 [
  "Courses",
  "কোর্সসমূহ"
 ],
 [
  "Course Library",
  "কোর্স লাইব্রেরি"
 ],
 [
  "Roadmap",
  "রোডম্যাপ"
 ],
 [
  "Library",
  "লাইব্রেরি"
 ],
 [
  "All Courses",
  "সব কোর্স"
 ],
 [
  "Categories",
  "বিভাগসমূহ"
 ],
 [
  "CATEGORIES",
  "বিভাগসমূহ"
 ],
 [
  "WORKSPACE",
  "শেখার জায়গা"
 ],
 [
  "LEARNING WORKSPACE",
  "শেখার জায়গা"
 ],
 [
  "Explore",
  "ঘুরে দেখুন"
 ],
 [
  "Course categories",
  "কোর্সের বিভাগ"
 ],
 [
  "Library navigation",
  "লাইব্রেরির নেভিগেশন"
 ],
 [
  "Workspace",
  "শেখার জায়গা"
 ],
 [
  "↗ Back to CyberNest",
  "↗ CyberNest-এ ফিরুন"
 ],
 [
  "Curated learning resources.",
  "বাছাই করা শেখার রিসোর্স।"
 ],
 [
  "Search, filter and open courses instantly.",
  "খুঁজুন, ফিল্টার করুন ও কোর্স খুলুন।"
 ],
 [
  "Learning space",
  "শেখার জায়গা"
 ],
 [
  "Learning archive",
  "শেখার আর্কাইভ"
 ],
 [
  "Close navigation",
  "নেভিগেশন বন্ধ করুন"
 ],
 [
  "Open navigation",
  "নেভিগেশন খুলুন"
 ],
 [
  "✦ A LITTLE CURIOSITY. A NEW SKILL.",
  "✦ একটু কৌতূহল। একটি নতুন দক্ষতা।"
 ],
 [
  "Build your next skill.",
  "পরের দক্ষতাটি গড়ে তুলুন।"
 ],
 [
  "Start with curiosity.",
  "শুরু হোক কৌতূহল থেকে।"
 ],
 [
  "A focused space for everything you want to learn. Find a course, explore a topic, and pick up where your curiosity takes you.",
  "আপনার শেখার জন্য একটি গোছানো জায়গা। কোর্স খুঁজুন, বিষয় জানুন ও নিজের আগ্রহ অনুযায়ী শেখা শুরু করুন।"
 ],
 [
  "Explore the library",
  "লাইব্রেরি দেখুন"
 ],
 [
  "in your learning vault",
  "আপনার শেখার সংগ্রহে"
 ],
 [
  "Library statistics",
  "লাইব্রেরির পরিসংখ্যান"
 ],
 [
  "Total Courses",
  "মোট কোর্স"
 ],
 [
  "Resources currently indexed",
  "তালিকায় থাকা রিসোর্স"
 ],
 [
  "Browse by learning topic",
  "বিষয় অনুযায়ী ঘুরে দেখুন"
 ],
 [
  "Quick Access",
  "দ্রুত প্রবেশ"
 ],
 [
  "1-click",
  "এক ক্লিক"
 ],
 [
  "Open a course from its vault card",
  "কার্ড থেকে কোর্স খুলুন"
 ],
 [
  "Browse Categories",
  "বিভাগ অনুযায়ী দেখুন"
 ],
 [
  "Pick a topic to explore its courses.",
  "একটি বিষয় বেছে কোর্সগুলো দেখুন।"
 ],
 [
  "Find your next course",
  "আপনার পরের কোর্স খুঁজুন"
 ],
 [
  "Search by name, topic or a skill you want to learn.",
  "নাম, বিষয় বা শেখার দক্ষতা দিয়ে খুঁজুন।"
 ],
 [
  "Your collection",
  "আপনার সংগ্রহ"
 ],
 [
  "Loading",
  "লোড হচ্ছে"
 ],
 [
  "Unavailable",
  "পাওয়া যাচ্ছে না"
 ],
 [
  "Your saved catalog is available. Original categories may overlap; unsorted courses are under Other. Admin changes are temporarily unavailable.",
  "সংরক্ষিত ক্যাটালগ দেখা যাচ্ছে। একই কোর্স একাধিক বিভাগে থাকতে পারে; অবিন্যস্ত কোর্স Other বিভাগে আছে। অ্যাডমিনের পরিবর্তন সাময়িকভাবে পাওয়া যাচ্ছে না।"
 ],
 [
  "Search courses, topics, skills",
  "কোর্স, বিষয় বা দক্ষতা খুঁজুন"
 ],
 [
  "Search courses, topics, skills…",
  "কোর্স, বিষয় বা দক্ষতা খুঁজুন…"
 ],
 [
  "Clear filter ×",
  "ফিল্টার মুছুন ×"
 ],
 [
  "Show 50 more courses",
  "আরও ৫০টি কোর্স দেখুন"
 ],
 [
  "No courses found",
  "কোনো কোর্স পাওয়া যায়নি"
 ],
 [
  "Try a different search or category.",
  "অন্যভাবে খুঁজুন বা অন্য বিভাগ বেছে নিন।"
 ],
 [
  "Show all courses",
  "সব কোর্স দেখুন"
 ],
 [
  "The library could not load. Please refresh the page.",
  "লাইব্রেরি লোড হয়নি। পেজটি রিফ্রেশ করুন।"
 ],
 [
  "Course lessons",
  "কোর্সের পাঠ"
 ],
 [
  "A place for your next discovery.",
  "আপনার পরের আবিষ্কারের জায়গা।"
 ],
 [
  "Open course ↗",
  "কোর্স খুলুন ↗"
 ],
 [
  "No courses have been added to this category yet.",
  "এই বিভাগে এখনো কোর্স যোগ করা হয়নি।"
 ],
 [
  "AI",
  "AI"
 ],
 [
  "Cyber Security",
  "সাইবার সিকিউরিটি"
 ],
 [
  "Artificial Intelligence",
  "কৃত্রিম বুদ্ধিমত্তা"
 ],
 [
  "YouTube & AI",
  "YouTube ও AI"
 ],
 [
  "Programming",
  "প্রোগ্রামিং"
 ],
 [
  "Marketing",
  "মার্কেটিং"
 ],
 [
  "Video Editing",
  "ভিডিও এডিটিং"
 ],
 [
  "Editing",
  "এডিটিং"
 ],
 [
  "Trading",
  "ট্রেডিং"
 ],
 [
  "Coding",
  "কোডিং"
 ],
 [
  "Design",
  "ডিজাইন"
 ],
 [
  "Ecommerce",
  "ইকমার্স"
 ],
 [
  "Other courses",
  "অন্যান্য কোর্স"
 ],
 [
  "Other Courses",
  "অন্যান্য কোর্স"
 ],
 [
  "Paid course",
  "পেইড কোর্স"
 ],
 [
  "Enrolled",
  "ভর্তি হয়েছে"
 ],
 [
  "Continue",
  "চালিয়ে যান"
 ],
 [
  "Preview",
  "প্রিভিউ"
 ],
 [
  "Find a course",
  "কোর্স খুঁজুন"
 ],
 [
  "Search courses",
  "কোর্স খুঁজুন"
 ],
 [
  "Topics",
  "বিষয়সমূহ"
 ],
 [
  "Explore the courses",
  "কোর্সগুলো দেখুন"
 ],
 [
  "Loading courses…",
  "কোর্স লোড হচ্ছে…"
 ],
 [
  "Show more courses",
  "আরও কোর্স দেখুন"
 ],
 [
  "Cyber Security course · Library will load shortly",
  "সাইবার সিকিউরিটি কোর্স · লাইব্রেরি শিগগিরই লোড হবে"
 ],
 [
  "♡ Saved courses",
  "♡ সংরক্ষিত কোর্স"
 ],
 [
  "Your saved courses and progress stay on this browser.",
  "সংরক্ষিত কোর্স ও অগ্রগতি এই ব্রাউজারে থাকে।"
 ],
 [
  "YOUR LEARNING SPACE",
  "আপনার শেখার জায়গা"
 ],
 [
  "LEARNING LIBRARY",
  "শেখার লাইব্রেরি"
 ],
 [
  "☀ Light",
  "☀ লাইট"
 ],
 [
  "☾ Dark",
  "☾ ডার্ক"
 ],
 [
  "Saved on this browser · completion is marked by you",
  "এই ব্রাউজারে সংরক্ষিত · পাঠ শেষ হয়েছে আপনি নিজে চিহ্নিত করেন"
 ],
 [
  "Synced to your account.",
  "আপনার অ্যাকাউন্টে সিঙ্ক হয়েছে।"
 ],
 [
  "Saving progress…",
  "অগ্রগতি সংরক্ষণ হচ্ছে…"
 ],
 [
  "Progress saved to your account.",
  "অগ্রগতি আপনার অ্যাকাউন্টে সংরক্ষিত হয়েছে।"
 ],
 [
  "Progress could not sync. Try again.",
  "অগ্রগতি সিঙ্ক হয়নি। আবার চেষ্টা করুন।"
 ],
 [
  "Saved courses stay on this browser. Enrolled lesson progress syncs to your account.",
  "সংরক্ষিত কোর্স এই ব্রাউজারে থাকে। ভর্তি হওয়া কোর্সের পাঠের অগ্রগতি আপনার অ্যাকাউন্টে সিঙ্ক হয়।"
 ],
 [
  "For signed-in learners with active access, CyberNest saves lesson completion and the most recently opened lesson to the learner account so they can continue on another device. This progress data is linked to the account and retrievable by that account holder.",
  "অনুমতি থাকা কোর্সে সাইন ইন করে পড়লে CyberNest সম্পন্ন করা পাঠ ও সর্বশেষ খোলা পাঠ আপনার অ্যাকাউন্টে রাখে, যাতে অন্য ডিভাইস থেকেও চালিয়ে যেতে পারেন। এই অগ্রগতি আপনার অ্যাকাউন্টের সঙ্গে যুক্ত থাকে এবং সেই অ্যাকাউন্ট থেকেই দেখা যায়।"
 ],
 [
  "✓ Completed",
  "✓ সম্পন্ন"
 ],
 [
  "Mark lesson completed",
  "পাঠ সম্পন্ন চিহ্নিত করুন"
 ],
 [
  "Your completion progress",
  "আপনার শেখার অগ্রগতি"
 ],
 [
  "← All courses",
  "← সব কোর্স"
 ],
 [
  "PRIVATE LEARNING SPACE",
  "অনুমতিভিত্তিক শেখার জায়গা"
 ],
 [
  "Original course folder ↗",
  "মূল কোর্সের ফোল্ডার ↗"
 ],
 [
  "Lesson inventory, private video uploads and reviewed resources have not been added yet.",
  "পাঠের তালিকা, প্রাইভেট ভিডিও ও যাচাই করা রিসোর্স এখনো যোগ হয়নি।"
 ],
 [
  "Previous and next video parts",
  "ভিডিওর আগের ও পরের অংশ"
 ],
 [
  "Use your signed-in owner account if the player cannot verify access.",
  "প্লেয়ার অনুমতি যাচাই করতে না পারলে সাইন ইন করা মালিকের অ্যাকাউন্ট ব্যবহার করুন।"
 ],
 [
  "Open private video on YouTube ↗",
  "YouTube-এ প্রাইভেট ভিডিও খুলুন ↗"
 ],
 [
  "← Previous part",
  "← আগের অংশ"
 ],
 [
  "Next part →",
  "পরের অংশ →"
 ],
 [
  "Unlisted",
  "আনলিস্টেড"
 ],
 [
  "Private",
  "প্রাইভেট"
 ],
 [
  "Video is awaiting upload and playback verification.",
  "ভিডিও আপলোড ও প্লেব্যাক যাচাই বাকি আছে।"
 ],
 [
  "Previous and next lessons",
  "আগের ও পরের পাঠ"
 ],
 [
  "← Previous lesson",
  "← আগের পাঠ"
 ],
 [
  "Next lesson →",
  "পরের পাঠ →"
 ],
 [
  "First lesson",
  "প্রথম পাঠ"
 ],
 [
  "Last lesson",
  "শেষ পাঠ"
 ],
 [
  "Lesson resources",
  "পাঠের রিসোর্স"
 ],
 [
  "Homework",
  "বাড়ির কাজ"
 ],
 [
  "Detailed information has not been reviewed yet.",
  "বিস্তারিত তথ্য এখনো যাচাই হয়নি।"
 ],
 [
  "Reviewed lesson notes have not been added yet.",
  "যাচাই করা পাঠের নোট এখনো যোগ হয়নি।"
 ],
 [
  "No reviewed documents attached to this lesson yet.",
  "এই পাঠে এখনো যাচাই করা ডকুমেন্ট যোগ হয়নি।"
 ],
 [
  "No reviewed tools attached to this lesson yet.",
  "এই পাঠে এখনো যাচাই করা টুলস যোগ হয়নি।"
 ],
 [
  "Homework has not been verified yet.",
  "বাড়ির কাজ এখনো যাচাই হয়নি।"
 ],
 [
  "Course content",
  "কোর্সের পাঠ্যবস্তু"
 ],
 [
  "Awaiting upload",
  "আপলোডের অপেক্ষায়"
 ],
 [
  "This course is not in your library.",
  "এই কোর্সটি আপনার লাইব্রেরিতে নেই।"
 ],
 [
  "Loading course lessons…",
  "কোর্সের পাঠ লোড হচ্ছে…"
 ],
 [
  "Course lessons could not load. Refresh to try again.",
  "কোর্সের পাঠ লোড হয়নি। আবার রিফ্রেশ করুন।"
 ],
 [
  "Open resource ↗",
  "রিসোর্স খুলুন ↗"
 ],
 [
  "Main website",
  "মূল সাইট"
 ],
 [
  "Class information",
  "ক্লাসের তথ্য"
 ],
 [
  "COURSE PREVIEW",
  "কোর্সের প্রিভিউ"
 ],
 [
  "YOUR LEARNING ACCOUNT",
  "আপনার শেখার অ্যাকাউন্ট"
 ],
 [
  "CLASS CALENDAR",
  "ক্লাসের ক্যালেন্ডার"
 ],
 [
  "SYLLABUS PREVIEW",
  "সিলেবাসের প্রিভিউ"
 ],
 [
  "ARCHIVE PREVIEW",
  "আর্কাইভের প্রিভিউ"
 ],
 [
  "PRESERVED LEARNING RESOURCES",
  "সংরক্ষিত শেখার রিসোর্স"
 ],
 [
  "ABOUT THE ARCHIVE",
  "আর্কাইভ সম্পর্কে"
 ],
 [
  "Course enrollment",
  "কোর্সে ভর্তি"
 ],
 [
  "Enrollment options",
  "কোর্সে ভর্তির অপশন"
 ],
 [
  "Privacy · account and visitor information",
  "গোপনীয়তা · অ্যাকাউন্ট ও ভিজিটরের তথ্য"
 ],
 [
  "COURSE",
  "কোর্স"
 ],
 [
  "Lesson inventory and private video uploads pending.",
  "পাঠের তালিকা ও প্রাইভেট ভিডিও আপলোড বাকি আছে।"
 ],
 [
  "Minimize",
  "ছোট করুন"
 ],
 [
  "Expand",
  "বড় করুন"
 ],
 [
  "Show advertisement",
  "বিজ্ঞাপন দেখুন"
 ],
 [
  "Hide advertisement",
  "বিজ্ঞাপন আড়াল করুন"
 ],
 [
  "Advertisement",
  "বিজ্ঞাপন"
 ],
 [
  "Collapse advertisement",
  "বিজ্ঞাপন ছোট করুন"
 ],
 [
  "Expand advertisement",
  "বিজ্ঞাপন বড় করুন"
 ]
];
// Shared display-only localization. Never rewrites input values, URLs or course data.
const storageKey='cybernest-language',languages=new Set(['en','bn']);
let language='en',ready=false;
try{const saved=localStorage.getItem(storageKey);if(languages.has(saved))language=saved;}catch{}
const normalize=value=>value.replace(/\s+/gu,' ').trim(),english=new Map(),bengali=new Map();
for(const [en,bn]of pairs){const a=normalize(en),b=normalize(bn);if(!a||!b)continue;english.set(b,en.trim());english.set(b.replace(/[০-৯]/g,c=>String('০১২৩৪৫৬৭৮৯'.indexOf(c))),en.trim());english.set(a,en.trim());if(!bengali.has(a))bengali.set(a,bn.trim());bengali.set(b,bn.trim());}
const digits=value=>value.replace(/[০-৯]/g,c=>String('০১২৩৪৫৬৭৮৯'.indexOf(c))),bnDigits=value=>value.replace(/[0-9]/g,c=>'০১২৩৪৫৬৭৮৯'[Number(c)]);
const datePairs=[['January','জানুয়ারি'],['February','ফেব্রুয়ারি'],['March','মার্চ'],['April','এপ্রিল'],['May','মে'],['June','জুন'],['July','জুলাই'],['August','আগস্ট'],['September','সেপ্টেম্বর'],['October','অক্টোবর'],['November','নভেম্বর'],['December','ডিসেম্বর'],['Monday','সোমবার'],['Tuesday','মঙ্গলবার'],['Wednesday','বুধবার'],['Thursday','বৃহস্পতিবার'],['Friday','শুক্রবার'],['Saturday','শনিবার'],['Sunday','রবিবার']];
const fragments=pairs.filter(([en,bn])=>en!==en.trim()||bn!==bn.trim()).filter(([en,bn])=>en.trim().length>2&&bn.trim().length>2).sort((a,b)=>b[1].length-a[1].length);
function dynamicEnglish(source){
 let value=digits(source);
 for(const [en,bn]of fragments)value=value.split(bn).join(en);
 value=value.replace(/(\d+)টি /g,'$1 ').replace(/(\d+)টি$/g,'$1');
 value=value.replace(/^(\d+) (পোস্ট ও রিসোর্স|ফলাফল|সহায়ক ভিডিও|উদাহরণ|ক্লাস|পোস্ট)$/u,(_,n,word)=>n+' '+({'পোস্ট ও রিসোর্স':'posts & resources','ফলাফল':'results','সহায়ক ভিডিও':'supporting videos','উদাহরণ':'examples','ক্লাস':'classes','পোস্ট':'posts'}[word]));
 for(const [en,bn]of datePairs)value=value.split(bn).join(en).split(bn.replaceAll('য়','য়')).join(en);
 return value;
}
function dynamicBengali(source){
 let value=source;
 const patterns=[
  [/^(\d+) (courses?|results?)$/i,(_,n,w)=>n+(w.toLowerCase().startsWith('course')?'টি কোর্স':'টি ফলাফল')],
  [/^(\d+) of (\d+) lessons ready$/i,(_,n,total)=>total+'টি পাঠের মধ্যে '+n+'টি প্রস্তুত'],
  [/^LESSON (\d+) OF (\d+)$/,(_,n,total)=>total+'টি পাঠের মধ্যে পাঠ '+n],
  [/^Part (\d+) of (\d+)$/,(_,n,total)=>total+'টি অংশের মধ্যে অংশ '+n],
  [/^COURSE (\d+)$/,(_,n)=>'কোর্স '+n],
  [/^Course (\d+)/,(_,n)=>'কোর্স '+n],
  [/^(\d+) of (\d+) lessons marked complete on this browser$/,(_,n,total)=>'এই ব্রাউজারে '+total+'টি পাঠের মধ্যে '+n+'টি সম্পন্ন চিহ্নিত'],
  [/^Save (.+)$/,(_,title)=>'সংরক্ষণ করুন · '+title],
  [/^Unsave (.+)$/,(_,title)=>'সংরক্ষণ সরান · '+title],
  [/^Open (.+)$/,(_,title)=>'খুলুন · '+title],
  [/^Continue: (.+)$/,(_,title)=>'শেখা চালিয়ে যান: '+title],
  [/^Original file: (.+)$/,(_,name)=>'মূল ফাইল: '+name]
 ];
 for(const [index,[pattern,replace]]of patterns.entries())if(pattern.test(value))return index<7?bnDigits(value.replace(pattern,replace)):value.replace(pattern,replace);
 if(/[0-9]/.test(value))for(const [en,bn]of datePairs)value=value.replace(new RegExp('\\b'+en+'\\b','g'),bn);
 return /^[\d\s,.:%/–—#·+-]+$/.test(value)||value!==source?bnDigits(value):value;
}
function t(source,target=language){
 if(typeof source!=='string'||!source.trim()||!languages.has(target)||/^(?:https?:\/\/|mailto:)/.test(source.trim()))return source;
 const key=normalize(source),map=target==='en'?english:bengali;
 if(map.has(key))return source.match(/^\s*/)[0]+map.get(key)+source.match(/\s*$/)[0];
 let result=target==='en'?dynamicEnglish(source):dynamicBengali(source);
 // Combined UI labels keep separators and independently translated parts.
 if(result.includes(' · '))result=result.split(' · ').map(part=>map.get(normalize(part))||part).join(' · ');
 if(target==='en'&&/[\u0980-\u09ff]/u.test(result)){
  for(const [bn,en]of english)if(bn.length>=5&&result===bn)result=en;
 }
 return result;
}
const textSources=new WeakMap(),attributeSources=new WeakMap();
const ignored='script,style,noscript,textarea,code,pre,kbd,svg,[translate="no"],[data-i18n-skip]';
function skip(node){return !node?.parentElement||!!node.parentElement.closest(ignored);}
function translateText(node){
 if(skip(node))return;
 let record=textSources.get(node);
 if(!record||node.data!==record.rendered)record={source:node.data,rendered:node.data};
 const rendered=t(record.source);record.rendered=rendered;textSources.set(node,record);
 if(node.data!==rendered)node.data=rendered;
}
function translateAttributes(element){
 if(element.closest(ignored))return;
 let records=attributeSources.get(element);if(!records){records={};attributeSources.set(element,records);}
 for(const name of ['aria-label','placeholder','title','alt']){
  const value=element.getAttribute(name);if(value===null)continue;
  let record=records[name];if(!record||value!==record.rendered)record={source:value,rendered:value};
  const rendered=t(record.source);record.rendered=rendered;records[name]=record;if(value!==rendered)element.setAttribute(name,rendered);
 }
}
function apply(root=document){
 if(root.nodeType===3){translateText(root);return;}
 if(root.nodeType===1)translateAttributes(root);
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
 for(let node=walker.nextNode();node;node=walker.nextNode())if(node.nodeType===3)translateText(node);else translateAttributes(node);
}
function originalText(element){if(!element)return '';const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);let value='';for(let node=walker.nextNode();node;node=walker.nextNode())value+=textSources.get(node)?.source??node.data;return value;}
function syncControls(){document.querySelectorAll('[data-language-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.languageChoice===language)));}
function setLanguage(value){
 if(!languages.has(value))return false;
 language=value;document.documentElement.lang=value;try{localStorage.setItem(storageKey,value);}catch{}
 if(ready){apply();syncControls();window.dispatchEvent(new CustomEvent('cybernest:language',{detail:{language:value}}));}
 return true;
}
window.CyberNestLanguage=Object.freeze({t,set:setLanguage,get:()=>language,locale:()=>language==='bn'?'bn-BD':'en-GB',originalText});
document.documentElement.lang=language;
function init(){
 ready=true;
 const host=document.querySelector('.topbar-right')||document.querySelector('.learning-top-actions')||document.querySelector('body>header')||document.querySelector('.topbar');
 if(host&&!document.querySelector('.language-control')){
  const control=document.createElement('div');control.className='language-control';control.setAttribute('role','group');control.setAttribute('aria-label','Language / ভাষা');control.setAttribute('translate','no');
  for(const [value,label]of [['en','English'],['bn','বাংলা']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.lang=value;button.dataset.languageChoice=value;button.setAttribute('aria-label',value==='en'?'View in English':'বাংলায় দেখুন');button.addEventListener('click',()=>setLanguage(value));control.append(button);}host.append(control);
 }
 apply();syncControls();
 new MutationObserver(records=>{
  for(const record of records){
   if(record.type==='characterData'){if(textSources.get(record.target)?.rendered!==record.target.data)translateText(record.target);}
   else if(record.type==='attributes')translateAttributes(record.target);
   else for(const node of record.addedNodes)if(node.nodeType===1||node.nodeType===3)apply(node);
  }
 }).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','alt']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
