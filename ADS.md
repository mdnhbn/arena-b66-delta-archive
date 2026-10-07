# Advertisement placement

One Adsterra 300x250 banner appears at the beginning of the page, below the header and before main content, in a labelled advertisement area. The visitor-facing label is only “বিজ্ঞাপন”; no provider name is displayed. The same slot persists during hash navigation.

Website: arena-b66-delta-archive.vercel.app
Website ID: 6106188
Ad unit ID: 31612240
Publisher account status: Approved / Active

Code: ads/banner.html, in an iframe with scripts, same-origin cookie access, and ad links allowed. The provider reads cookies, so an opaque sandbox origin prevents its banner from rendering. Top-level navigation is not granted. Adult ads were not enabled. No Direct Link installed.

Banner rendering depends on the provider's available campaigns and visitors' browser settings.

## Visitor experience

Only one banner loads per full page visit. Hash navigation keeps the same frame; there is no timed refresh. The close button hides the slot for the current browser tab session and unloads the ad. Autoplay, camera, microphone and geolocation are disallowed on the frame. No pop-under, redirect, push subscription or interstitial tags are installed. Ad links may open a new tab when a visitor clicks them. The current provider list contains only the verified active banner; add new verified provider files to ads/controller.js after obtaining their code.
