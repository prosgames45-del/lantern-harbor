# Lantern Harbor

An original browser simulation about maintaining a small coastal port through twelve tides. Build a skiff quay, freight dock or breakwater in three bays; unload vessels, trade timber and fuel, anticipate deterministic storms, and protect reputation. Choose Calm Coast (9 deliveries, 100 coins), Working Harbor (10, 90), or Storm Season (10, 85). Storms stop fuel deliveries; each tide costs 2 coins. Preview consequences before ringing the bell.

This is a **local preparation prototype**, not a submitted jam entry, accepted project or paid work. Every coin displayed in the game is fictional. No real money, keys, payments, external assets, paid APIs, accounts or installation are required.

## Play

Public demo: https://prosgames45-del.github.io/lantern-harbor/

Source: https://github.com/prosgames45-del/lantern-harbor

## Play locally

From this folder, run `python serve.py`, then open http://127.0.0.1:8810. The server listens only on loopback. Stop it with Ctrl+C. On Windows, `.mjs` is explicitly served as JavaScript.

Run the model tests with `node --test test-model.mjs` (Node 18+). Browser controls use semantic buttons and text, support keyboard focus and touch, and announce action results. The map is CSS and HTML; there is no opaque canvas. An original generated harbor illustration is bundled locally in harbor-dusk.png; no runtime image download, external fonts or libraries are used.

## Local preparation for Game Gauntlet SIM Jam

Official listing: https://itch.io/jam/game-gauntlet-sim-jam. The listing states a September 23–November 4, 2026 window, closing at 19:00 UTC; worldwide participation; first and second prizes of USD 1,000 and USD 500; and disclosed AI artwork, code and text permission. These are announced prizes, not guaranteed or earned payments.

The build format is **HTML, CSS and JavaScript ES modules**, rendered with semantic DOM elements. It does not use WebGL. The jam's browser/WebGL wording requires confirmation that this exact format is admissible; do not describe it as a WebGL build. Free entry is stated in the official organizer update: https://itch.io/t/7000961/new-judges-joining-the-game-gauntlet-sim-jam.

Personal registration, Discord participation, signature, legal attestations and final eligibility remain **pending Jordan's own review and actions**. The required human ratings of five entries on November 5–10, and any November 14 live event obligations, need Jordan's review and personal participation. Nothing was submitted or registered, no account was created, and no personal facts were fabricated. Recheck the current official rules and required declarations before submitting. `SUBMISSION.md` is a draft with actual public links and personal entry requirements still pending.

## AI disclosure and authorship

**Fully AI-generated:** all code, game design, interface, original generated harbor illustration, procedural visuals, documentation and submission copy in this prototype were generated with OpenAI Codex. Jordan is the prospective entrant; this document does not claim human coding, human playtesting, lived maritime experience or completed legal attestation. No third-party artwork, music or asset packs are included.

## Scope and limitations

This is a small playable prototype, not a finished multi-week entry. Fourteen model tests check accounting, deterministic events, actual winning sequences for all three scenarios, failure, invalid actions, restart, dock capacity, preview consistency and zero external spending. The browser was checked for actual construction and unloading. Human and mobile playtesting remain valuable. No audio, saves or multiplayer. Source publication is authorized as part of preparing the submission; final prize entry and personal attestations remain pending.

Files: `model.mjs` is the pure game model; `ui.mjs` renders semantic HTML; `style.css` draws the harbor; `test-model.mjs` validates behavior. Code and procedural visual output are offered under the MIT license in `LICENSE`, copyright Jordan 2026.
