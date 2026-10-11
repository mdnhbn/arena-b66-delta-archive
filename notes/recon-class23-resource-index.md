# Recon — সংরক্ষিত রিসোর্স সূচি

ক্লাস ২৩ · ৯ অক্টোবর ২০২৬। প্রস্তুত: ১১ অক্টোবর ২০২৬।
এটি বর্তমান গাইডের ধাপভিত্তিক নিজস্ব সূচি; পূর্ণ মূল গাইডের অনুলিপি নয়। API key, account details ও access token রাখা হয়নি। সব ধাপ ক্লাসে সম্পন্ন হয়েছে—এমন দাবি নেই। সফটওয়্যার নিজের OS অনুযায়ী মূল maintainer-এর source/release থেকে নিন।

| ধাপ | টুল ও মূল সোর্স |
|---|---|
| প্রস্তুতি | [Go](https://go.dev/dl/), Python, Git |
| Passive recon | [Censys](https://search.censys.io/), [Shodan](https://www.shodan.io/), [DNSDumpster](https://dnsdumpster.com/), [Whois](https://www.whois.com/), [ViewDNS](https://viewdns.info/) |
| Subdomain | [Subfinder](https://github.com/projectdiscovery/subfinder), [Amass](https://github.com/owasp-amass/amass), [Puredns](https://github.com/d3mondev/puredns), [Massdns](https://github.com/blechschmidt/massdns) |
| Live host | [httpx](https://github.com/projectdiscovery/httpx), [gowitness](https://github.com/sensepost/gowitness) |
| Technology | [Wappalyzer](https://www.wappalyzer.com/), [WhatWeb](https://github.com/urbanadventurer/WhatWeb), [BuiltWith](https://builtwith.com/) |
| Directory | [ffuf](https://github.com/ffuf/ffuf), [Feroxbuster](https://github.com/epi052/feroxbuster), [dirsearch](https://github.com/maurosoria/dirsearch) |
| URLs | [Katana](https://github.com/projectdiscovery/katana), [gau](https://github.com/lc/gau), [waybackurls](https://github.com/tomnomnom/waybackurls), [hakrawler](https://github.com/hakluke/hakrawler) |
| JavaScript | [SecretFinder](https://github.com/m4ll0k/SecretFinder) |
| Parameters | [Arjun](https://github.com/s0md3v/Arjun), [ParamSpider](https://github.com/devanshbatham/ParamSpider) |
| Scanning | [Nuclei](https://github.com/projectdiscovery/nuclei), [SQLMap](https://github.com/sqlmapproject/sqlmap), [Ghauri](https://github.com/r0oth3x49/ghauri), [Dalfox](https://github.com/hahwul/dalfox), [Nmap](https://nmap.org/) |
| Wordlists | [SecLists](https://github.com/danielmiessler/SecLists), [Payloadbox](https://github.com/payloadbox) |

শুধু নিজের ল্যাব বা অনুমোদিত scope ব্যবহার করুন। নিজের provider key স্থানীয় config-এ রাখুন; GitHub বা shared note-এ নয়। ইনস্টলেশনের বর্তমান নির্দেশনা মূল project README-তে দেখুন।

মূল শিক্ষক-প্রদত্ত গাইড: https://arenauser.notion.site/Recon-for-Web-Application-bc489086047f4320802b919f0cdeb70e
