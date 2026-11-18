# To do: Ammar, Workflow / build lead

**Your role:** you look after the prototype's working files and versions: `02_WORK/control_tower.html` and the dated copies in `03_VERSIONS/`. You must never be the only person with a working copy, or the only one who can explain how it works.
**Your cover:** Hussain steps in if you're absent.
**Covering for:** Marwan (presenter), if he's absent.
**Your core step in your own account:** building the page and running it on the inputs.

## Week 7 (now)

1. **Get the canvas reviewed.** The draft is `00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md`. Go through it with the group, then show it to the instructor for READY TO BUILD (or REWORK FIELD n).
2. **Settle one design question before building** (Hussain takes it to the consult queue): does a sentence about supplier B inside a memo whose header names supplier A count as a memo "about" supplier B under RR-C5 §4.2 and §4.3? Write the answer in the decision log.
3. **Build the first slice with Fatima.** She writes the expected result first. Then you build just enough of the page to take one supplier and its memo through to the coverage line and the verified quotation.
4. **Save version v01** in `03_VERSIONS/` at the end of the meeting.

## How to build (your Claude)

**Where:** Claude Code on the web (claude.ai/code) with the repo `ammarPoly/AI-Course-Project` selected **before** you send the first message. Then the pack, the canvas and the extraction format are all in the repo, so nothing needs uploading. Claude finds them at:

- pack: `01_PACK_AS_ISSUED/C5-A_SUPPLIER_RISK_CONTROL_TOWER_PACK_V1_2_EXPLORATORY_DRAFT_V1/`
- canvas: `00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md`
- extraction format: `02_WORK/EXTRACTION_FORMAT.md`

**Prompt for the first slice:**

```
This repo is Group 5's C5-A Supplier Risk Control Tower project. Read 00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md (field 6 is the build decision), 02_WORK/EXTRACTION_FORMAT.md and the rule card 01_PACK_AS_ISSUED/C5-A_SUPPLIER_RISK_CONTROL_TOWER_PACK_V1_2_EXPLORATORY_DRAFT_V1/RULES/RISK_RULES_RR-C5.md. Never edit anything in 01_PACK_AS_ISSUED.

Build the FIRST SLICE of 02_WORK/control_tower.html: one self-contained HTML file that works offline with no internet, no libraries from the web, no server and no API key. It should:
1. Let me load SUPPLIER_MASTER.csv, ASSESSMENT_LOG.csv, memo .md files and an extraction CSV with file pickers.
2. Read each memo's header (ID, date, Supplier (as written)) and match it to the master using RR-C5 section 2, step by step in that order, showing each step's result so a person can check it. A name that does not match exactly after the steps is CANNOT DETERMINE (match).
3. For one supplier, show its coverage line (memo IDs or NO MEMO, log row yes or no) and check that each extraction quotation appears word for word in the memo it cites, rejecting any that does not.
Do not apply flags or status yet. Ask me before adding anything the canvas does not mention. Explain the code in plain words so every group member can explain it.
```

After the slice works and Fatima has recorded the verdict, the later steps (all 26 suppliers, the three flags, contradictions, status, new memo intake, CSV export) each get their own small prompt, one step at a time, with a test written first.

## Week 8 (next)

- Collect the three batch CSVs from Hussain, Marwan and Maryam in `02_WORK/extraction/`.
- Build the full scorecard and coverage on all 26 suppliers and 24 memos, so the acceptance questions can be answered by running the page.
- Fill canvas field 7 (the trap you actually found, with evidence) and agree the visible addition (field 13) with the tutor.
