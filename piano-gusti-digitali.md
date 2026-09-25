# Gusti Digitali — Full Plan (Phase 0, live today)

Confirmed scope: Phase 0 only, in full version, published today 25 September, with a useful life of about 2 days (through Sunday 27th evening). After the event this version is no longer needed. Format: a website (not an app), so it can be translated automatically by Chrome's built-in Google Translate.

---

## 1. The most important question: real data, not fake data

This is the question to answer before anything else, because the rest of the plan is pointless if the content inside the app is made up.

**The technical reality:** I don't have a body, I can't be physically in Gorizia, I can't photograph a menu posted at a stand, I can't taste a dish or read a price written by hand on a chalkboard. Any real price, photo or video in the app has to come from someone who is physically there, or from an official channel that already has that data. I can do all the work very quickly *after* the raw material exists: transcribe a photographed menu, resize and optimise photos, assemble everything into the page, update prices. But the raw material has to come from outside.

Since the event is already underway and about 2 days remain, here is the realistic plan, in order of speed:

### 1.1 Direct on-site collection (the most reliable)
One person (even just one) with a smartphone walks the borghi and, for each stand, does three things in under 2 minutes:
- Photographs the chalkboard/sign with the menu and prices (almost every stand displays one, by law or common practice)
- Takes 2–3 photos of the dish or the counter
- Records a 10–15 second video (finished dish, counter, or preparation)

Then sends me the photos/videos as they are (even just uploading them in chat) — I transcribe the prices and dishes, optimise the files, and put them online within minutes per stand. This is the slowest channel to scale (one person can probably cover 15–25 stands in a couple of hours on foot) but it's the only one that guarantees data that is definitely real and verifiable.

**Collection template**: if it helps to structure this, a very simple form (even just on paper or in a phone's notes app) with these fields per stand helps whoever is collecting not to forget anything:
`Borgo | Stand name | 3-6 dishes with price | Photo (yes/no) | Video (yes/no) | Hours if posted`

### 1.2 Incremental coverage, not all-or-nothing
With 300+ stands and only a few hours, the realistic goal isn't "all 17 borghi complete by tonight." It's: publish the 3-4 most central or most photogenic borghi right away with real data, and honestly show users that the others are "coming soon" (never leave a fake menu online in place of an empty one). The app is already designed to grow during the event: every borgo/stand has an "updated X hours ago" timestamp and a source, so showing "menu coming soon" for a stand not yet covered is normal and honest, while showing a made-up price as if it were real is never acceptable, not even temporarily.

### 1.3 Getting people who are already there involved (crowdsourcing)
A post on your social channels (or on the Facebook/Instagram page if you have access) like "At Gusti di Frontiera? Send us a photo of your favourite stand's menu, we'll put it online" with a WhatsApp number or a simple form can bring in material from several places at once. It does need a quick check before publishing (correct stand name, readable photo, no inappropriate content) — I can act as that filter myself if you forward me what comes in.

### 1.4 The organiser channel (the fastest if it responds in time)
Exhibitors registered through the Comune di Gorizia's "expression of interest" process: it's possible the events/press office already has a list with stand names and maybe a declared food offering from the registration stage. A direct contact today (phone/email to the Comune's events office, or to the Gusti di Frontiera organisation) to ask whether such a file exists is worth it: if so, it's the fastest shortcut to a base dataset for all 300 stands at once, even if generic, which can then be enriched with real photos over time.

### 1.5 Already-public social content (use with care)
On Instagram/TikTok with the hashtags #gustidifrontiera2026 there are already real photos and videos from visitors. These can be used as reference or, if time allows, you can ask the author's permission before reposting (a simple comment or direct message) rather than lifting the content without asking — it's the person who took the photo, not the app, who has to authorise its public use elsewhere. For generic atmosphere photos (not of a specific stand) the risk is lower; for a specific dish/stand attributed to a vendor, it's better to ask.

### 1.6 The rule that doesn't get touched
From here on, every menu item or price published needs a real source behind it (a collected photo, organiser data, or verified material). The current dataset in the app (example menus/prices for 17 stands) stays as a placeholder **only until real data arrives to replace it, one stand at a time**. Fake prices are never published to people who are deciding what to eat with real money.

---

## 2. What's already ready (verified today)

### 2.1 Official map — positions corrected using the black-line method

**Important correction to the previous version of this plan.** The first round of verification relied mostly on the colour of each numbered box to place it on the map. You pointed out that this is wrong for at least one borgo (#5, "Mare": I had placed it on "Corso Verdi" while its real position is on **Via Boccaccio**) and that the correct method is different: every numbered box has a thin **black line** running from the box to the real street — it's the point where that line *touches the street* that is the exact stand location, not the position of the box itself. Colour remains useful only as a rough indicator (the map often also tints the street segment associated with that borgo, which helps confirm, but isn't enough on its own).

I redid the verification using this method, borgo by borgo, with three cross-checks: (1) I traced the black line by eye to its point of contact with the street, on crops of the original image at very high resolution (4125×2820 pixels, not the compressed version used in the app); (2) I checked whether the street segment at that point is tinted the same colour as the borgo; (3) I checked that the position made sense relative to neighbouring borghi and the actual street names written on the map at that spot. A second, independent method (a script that automatically follows the black line pixel by pixel) confirmed most results within a few percentage points.

Results for all 17 borghi (correct street/square, and how confident I am in each):

| # | Borgo | Correct street / square | Confidence |
|---|-------|--------------------------|------------|
| 1 | Italia | Via Garibaldi / Corso Italia | High |
| 2 | Mercatino di Gusti | Piazza Battisti | Medium |
| 3 | Austria | Via Cadorna | High |
| 4 | Americhe | Via Cadorna (near Giardini Pubblici) | High |
| 5 | Mare | **Via Boccaccio** (corrected from Corso Verdi) | High |
| 6 | Australia | Via Santa Chiara (corner of Via Brass) | Medium |
| 7 | Africa | Via Brass (corner of Via Santa Chiara) | Medium |
| 8 | Oriente | Via Santa Chiara / Via Boccaccio | High |
| 9 | Latino Americano | Via Cadorna | Medium |
| 10 | Francia | Via Morelli (corrected — was a typo before) | Medium |
| 11 | TruckFood | Corso Verdi / Via Oberdan | High |
| 12 | Nord Europa | Via Roma | Medium |
| 13 | Europa Centrale | Via Roma (near Via Morelli) | Medium |
| 14 | Associazioni | Via Crispi (corrected) | Medium |
| 15 | FVG | Piazza Municipio | High |
| 16 | Slovenia e Balcani | Via De Gasperi, near Piazza Municipio (corrected) | Medium |
| 17 | Borderless | Piazza Transalpina | High |

"Medium" confidence doesn't mean "probably wrong": it means that box and a neighbouring one have lines close together on the map, or that the automated trace couldn't confirm it independently. The practical takeaway is simple: when someone physically goes to photograph that borgo (see section 1.1), a 10-second check of the street name written on the stand's sign is enough to confirm or correct it here — that's the only way to go from "read off the map" to "verified on site."

All of this is saved in `borghi-mappa.json` (exact colour, street, percentage position and confidence level for each of the 17 borghi) and has already been applied to the pins inside the app. The official map remains the real background image, with clickable numbered pins overlaid in the correct position.

### 2.2 Real safety data, not invented
The official map already includes Info point, First-aid point, Restrooms (WC), Emergency exit routes, Parking areas (cars, disabled, campervans), the free Mobility Service number (348 662 3013) and 112. Before having this map, the app correctly did not invent these positions; now they are real and shown exactly as drawn by the organisers, without reinterpreting them.

### 2.3 App structure already ready to receive real data
The page (link in the published artifact) already has: a list of the 17 real borghi with correct names and streets, a detail page for each borgo, a stand page with menu/prices/photos/videos, search with filters (price, dietary, borgo), an interactive official map, and a favourites list. All that's needed is to replace the placeholder content with real content as it arrives — the structure doesn't change.

---

## 3. Who will use the app and for what

- **On-site visitor**: wants to decide what to eat in a few seconds, filter by price or dietary needs, and physically find the stand.
- **Remote planner**: looks at menus and photos before heading to Gorizia or to plan the next day.
- **Foreign tourist**: uses the browser's automatic translation to read everything in another language (hence the choice to build this as a website rather than an app).

---

## 4. Automatic translation (technical note still to verify)

The app is a website specifically so it can take advantage of Chrome's built-in translation (Google Translate), useful given the 45+ countries represented at the festival. Caution: Chrome translates the text present when the page loads, but this is a single-page app that switches views with JavaScript (opening a borgo, searching, etc.) without reloading the page. Chrome may not automatically re-translate content that appears after the initial load. Before sharing the link with foreign tourists, it's worth a real test: open the page in Chrome, turn on "Translate this page," and check that the text stays translated even after navigating between screens (Home, Map, Search, Saved). If something doesn't translate, that's a small fix to make before the public launch, not after.

---

## 5. Realistic hour-by-hour plan for today

Since it needs to be live today and serve visitors through Sunday evening:

1. **Hour zero**: the app with the verified official map is already published and browsable (done).
2. **First 1–2 hours**: real on-the-ground collection for the 3–5 most central/busiest borghi (or whichever ones you choose), even with just one person; material sent in as it's gathered.
3. **Every time material arrives**: I transcribe prices/menus, optimise photos/videos, update the app — within minutes, not hours.
4. **At the same time**: a quick contact with the organisers/Comune to find out whether a vendor list with declared offerings already exists, to use as a base for borghi not yet covered on the ground.
5. **Over the course of the day**: an optional social media post to gather contributions from visitors, if you have a channel with a following.
6. **From now on, always**: any borgo/stand without real data stays honestly labelled "menu coming soon," never with fake prices.

---

## 6. Decisions needed from you

- Who can physically go photograph stands today, and how much time do they have (this determines how many borghi can be covered by tonight)?
- Do you have a direct contact with the Gusti di Frontiera organisation or the Comune di Gorizia to ask for a vendor list?
- Do you have a social media channel with a following to launch a call for visitor contributions?
- Do you want me to keep the link private (only people with the URL), or help you think through how to share it publicly once the first borghi have real data?

As soon as the first real material arrives (even just photos of 2-3 stands), send it over and I'll put it online right away.
