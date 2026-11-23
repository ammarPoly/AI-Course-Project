# To do: Ammar, Workflow / build lead

**Your role:** you look after the prototype's working files and versions: `02_WORK/control_tower.html` and the dated copies in `03_VERSIONS/`. You must never be the only person with a working copy, or the only one who can explain how it works.
**Your cover:** Hussain steps in if you're absent.
**Covering for:** Marwan (presenter), if he's absent.
**Your core step in your own account:** building the page and running it on the inputs.

## Status (updated 2026-11-23)

- Done: canvas drafted, roles set, to-do files, memo decision recorded in the canvas decision log (header supplier only; other mentions are notes), pull request #1 merged.
- Done: first slice of the tool built (load files, §2 matching, coverage, coverage record). You ran it on the real files on 2026-11-23: 26 suppliers, 23 log rows, 24 memos, none missing. The coverage record is in `05_EVIDENCE/`.
- Waiting for: Fatima's expected result for T-01, the three memo batch CSVs, the instructor's READY TO BUILD initial on the canvas, and the group confirming the memo decision.

## From where to where

| What | From | To |
|---|---|---|
| The tool `control_tower.html` | repo: `02_WORK/` (Claude Code edits it there) | your computer to run it, by double-clicking |
| Files to load into the tool | repo: `01_PACK_AS_ISSUED/C5-A_SUPPLIER_RISK_CONTROL_TOWER_PACK_V1_2_EXPLORATORY_DRAFT_V1/INPUTS/` | the tool's boxes, or drop the whole INPUTS folder |
| Batch CSVs `BATCH_1/2/3_*.csv` | Hussain, Marwan, Maryam | repo: `02_WORK/extraction/`, then the tool's **Memo extraction** box |
| Coverage record the tool downloads | the tool (Coverage record tab) | repo: `05_EVIDENCE/` (or give it to Maryam) |
| Fatima's T-01 verdict | Fatima | test record in repo: `04_TESTS/` |

**How to put a file in the repo:** on GitHub, open the folder named in the "To" column, click **Add file → Upload files**, drag the file in, then click **Commit changes**. **How to make a CSV from Claude's answer:** copy the CSV block, paste it into Notepad (or TextEdit in plain text mode), and save it with the name shown and `.csv` at the end.


## Week 7 (now)

1. **Get the canvas reviewed.** The draft is `00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md`. Go through it with the group, then show it to the instructor for READY TO BUILD (or REWORK FIELD n).
2. ~~Settle the memo design question~~ **Done 2026-11-23.** The tutor left it to the group; the decision is in the canvas log. Ask the group to confirm it.
3. **First slice: built.** Once Fatima has written T-01, run the tool with her for that supplier so she can record the verdict.
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

- Collect the three batch CSVs from Hussain, Marwan and Maryam in `02_WORK/extraction/`. As each one arrives, load it in the tool's Memo extraction box: the coverage record shows any quote that isn't word for word in its memo, and any memo with no rows.
- Build the full scorecard and coverage on all 26 suppliers and 24 memos, so the acceptance questions can be answered by running the page.
- Fill canvas field 7 (the trap you actually found, with evidence) and agree the visible addition (field 13) with the tutor.
