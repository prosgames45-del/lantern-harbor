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
