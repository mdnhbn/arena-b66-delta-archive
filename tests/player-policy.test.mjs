import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
test('enrolled library player uses a video origin allowed by the shared site policy',()=>{const player=readFileSync('vault/course-player.js','utf8'),config=JSON.parse(readFileSync('vercel.json')),policy=config.headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;assert.match(player,/https:\/\/www\.youtube-nocookie\.com\/embed\//);assert.ok(policy.includes('https://www.youtube-nocookie.com'));assert.doesNotMatch(player,/https:\/\/www\.youtube\.com\/embed\//);});

