Maple Trail
A slapstick, Oregon‑Trail‑inspired road‑trip roguelike about fleeing a hilariously frozen Canada for the neon wonders of Greenwich, Connecticut—set in the brutal winter of 1995.

Table of Contents
Overview

Gameplay Features

Screenshots & Art

Quick Start

Project Structure

Development Workflow

Roadmap

Contributing

License

Credits

Overview
Maple Trail drops you into January 1995 with a rust‑speckled station wagon, four kids, and just enough cash to (maybe) cross the border.
Canada is portrayed as a snow‑blasted, dial‑up‑era wasteland; America is a hyperbolic paradise of fast food and indoor heating. Survive random calamities—moose stampedes, frozen gas pumps, rotary‑phone mishaps—and reach the promised land of Greenwich, CT.

The project is intentionally zero‑dependency: pure HTML + CSS + vanilla ES‑modules. Open index.html in any modern browser and you’re on the road.

Gameplay Features
Resource Management – Juggle Health, Morale, Warmth, Fuel, Cash; every choice matters when the heater core explodes on a dirt road.

Random Event Deck – Blizzard white‑outs, cassette‑tape morale boosts, border‑agent shenanigans… no two runs are identical.

Procedural Map – Each trek generates a fresh chain of road nodes between Québec and Connecticut.

Modal Storylets – Pop‑up comics illustrate every disaster (or miracle).

16‑Bit Pixel Art – Authentic 90s palette; Canada in icy blues, the U.S. in warm neons.

Screenshots & Art
All art is WIP placeholders—final pixel sets arrive via the Sora art‑pipeline.

Overworld Prototype	Event Modal (Placeholder)

Quick Start
bash
Copy
Edit
# 1. Clone
git clone https://github.com/your‑username/maple‑trail.git
cd maple‑trail

# 2. Launch (no build step!)
open index.html   # macOS
# or
start index.html  # Windows
# or serve with any static server if you prefer:
python -m http.server 8080
Note: If you develop on Chrome, enable “Live Reload” for instant canvas updates.

Project Structure
python
Copy
Edit
maple‑trail/
├─ index.html          # single‑page shell
├─ style.css           # HUD, modal, pixel helpers
├─ main.js             # boot + game loop
├─ state.js            # global stats store
├─ map.js              # map data & wagon travel
├─ eventEngine.js      # random event deck (Sprint #2)
├─ modal.js            # modal overlay
├─ ui.js               # HUD controls & effects
├─ loader.js           # sprite manifest & loader
└─ assets/             # art & audio (added in later sprints)
Development Workflow
Sprint	Focus	Status
#1	Canvas, HUD, wagon movement	✅ Completed
#2	Random event system + modal	✅ Completed
#3      Procedural map generator        ✅ Completed
#4      Vehicle breakdown & inventory   ✅ Completed
#5	Border paperwork mini‑game	⏳ In progress
#6	U.S. “upgrade burst” scene	🚧 Planned
#7	Greenwich finale & credits	🚧 Planned
#8	Save / load (localStorage)	🚧 Planned
#9	Final art & audio drop‑in	🚧 Planned
#10	Polish, accessibility, QA	🚧 Planned

All engineering tasks are executed via concise Codex prompts (see /docs/codex_prompts/ for history). Art arrives through the Sora agent pipeline under /assets.

Roadmap
Core Loop Finish – complete map generation, events, finale.

Balancing Pass – tune stat costs, event probabilities.

Pixel Art Integration – replace every placeholder box with final sprites.

Soundtrack & SFX – cassette mixtape music track, snow crunches, moose bellows.

Accessibility – keyboard navigation, reduced‑motion option.

Release Builds – itch.io ZIP & GitHub Pages demo.
