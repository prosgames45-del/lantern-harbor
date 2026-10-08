# Local verification — 2026-10-08

Implementation began at 00:24:07 UTC. The playable prototype, model tests, server checks and documentation were ready at 00:28:36 UTC, approximately 4 minutes 29 seconds of observed elapsed development. Packaging followed. This is elapsed tool-session time, not a claim about human effort or a multi-week game development schedule.

## Executed checks

- Final `node --test test-model.mjs`: 14 tests passed, zero failed. Resource accounting, deterministic outcomes, actual winning sequences for every scenario, failure, invalid structure names, restart, storms, per-dock capacity, tide-preview consistency and zero external financial spending are covered. An interrupted improvement pass left an outdated strategy test failing; the final test strategy now executes valid fuel and timber trades and wins each scenario.
- `node --check ui.mjs`: passed.
- `python serve.py`: started on `127.0.0.1:8810`.
- HTTP smoke checks returned 200 for `/`, `/model.mjs`, `/ui.mjs` and `/style.css`.
- MIME types were respectively `text/html`, `text/javascript`, `text/javascript` and `text/css`.

## Limits of verification

The first builder could not access a browser. The main agent subsequently opened the real local browser build, selected the quay, built it, unloaded a skiff and observed coins changing 20→13→21, fuel 3→2, deliveries 0→1. This is automated browser verification, not a human playtest. An authentic screenshot is included as demo.png. Mobile rendering and assistive-technology behavior still require further testing.

The build is semantic DOM/CSS with ES modules, not WebGL. Jam compatibility under the browser/WebGL wording remains unconfirmed. Personal registration, Discord activity, signed attestations, five human ratings on November 5–10 and any live-event duties remain pending Jordan's review. No external submission or account creation occurred.

## Public publication verified

Source commit d6aa224ca3022a5f7dd1e61b2f80dbdc0abca84a. GitHub Pages run37730531215 completed successfully; actual public URL https://prosgames45-del.github.io/lantern-harbor/ loaded the three-scenario interface. Public deployment is separate from contest entry; nothing submitted to the jam.

## Original generated scenery — 2026-10-08

Generated a 2332681-byte panoramic harbor image with the built-in OpenAI image tool; copied the selected PNG into harbor-dusk.png and documented its exact prompt in ARTWORK.md. The header and playable harbor consume it locally. Storm scenes use a darker overlay; reduced-motion settings disable the transition. Buttons remain opaque semantic controls.

Repeated model checks: all14 pass; ui.mjs syntax passes. Local browser construction20→13coins and skiff unloading13→21coins, fuel3→2, deliveries0→1 were observed after the visual change. The requested390px browser viewport override did not apply: actual DOM width1280px was measured. Do not claim a successful phone-size browser test from this attempt. CSS mobile changes require a real narrower browser check.
