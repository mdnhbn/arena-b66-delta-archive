# CyberNest Blogger foundation

A Blogger theme that applies CyberNest's light green and white visual foundation to the existing blog at [purechemus.blogspot.com](https://purechemus.blogspot.com/).

## Files

- `cybernest-foundation.xml`: self-contained Blogger theme for installation.
- `build-theme.mjs`: source generator for the theme and local review artifacts.
- `README.md`: installation, editing, and scope notes.

Run `node build-theme.mjs` in a writable directory to regenerate the XML, a standalone preview, and an extracted JavaScript file. Use `node build-theme.mjs --emit xml`, `--emit preview`, or `--emit script` to write a single artifact to standard output without modifying files.

## Included behavior

The responsive theme includes CyberNest navigation, dashboard and learning-area routes, light/dark appearance, English/Bangla interface controls, and native Blogger search. Device preferences stay on the current device. User-authored Blogger content keeps its original language.

Classes, resources, schedules, and private course materials are not migrated. Empty states describe the current foundation. The theme does not invent enrollment, completion, activity, or lesson records.

## Native Blogger editing

The native `Blog1` widget renders posts, individual posts, static pages, comments, and pagination. The theme does not delete posts or pages.

The Layout editor exposes these native sections:

- **CyberNestAnnouncements**: editable HTML announcement widget.
- **CyberNestLinks**: editable Link List widget.
- **BlogPosts**: native Blog widget.

Before replacing a theme, save a theme backup and a separate content backup in Blogger. Install `cybernest-foundation.xml` through Blogger's Theme controls, then check the live homepage, mobile layout, a post, a static page, search, and Layout gadgets.

## Secure Studio entry

The Sign in link opens the existing [CyberNest learning app](https://cybernest-learn.vercel.app/vault/). The Admin & Studio route (`#studio`) links to [CyberNest Studio](https://cybernest-learn.vercel.app/studio) and native Blogger management.

This package provides native Blogger sections and an entry to the existing secure Studio. It does not implement an account system, enrollment service, payment service, private course backend, or client-side admin unlock. The theme grants no permissions. Private course content, protected media URLs, credentials, and backend secrets are excluded.

Blogger management links may require the owner to sign in or choose the correct Google account.

## Verification

Validate generated XML with an XML parser and check the generator and extracted application script with `node --check`. Theme installation and Blogger-generated markup require live verification; the standalone preview cannot simulate Blogger's server-rendered posts, account selection, or Layout editor.
