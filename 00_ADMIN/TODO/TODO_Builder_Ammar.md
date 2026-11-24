# To do: Ammar, Workflow / build lead

**Your role:** you look after the prototype's working files and versions: `02_WORK/control_tower.html` and the dated copies in `03_VERSIONS/`. You must never be the only person with a working copy, or the only one who can explain how it works.
**Your cover:** Hussain steps in if you're absent.
**Covering for:** Marwan (presenter), if he's absent.
**Your core step in your own account:** building the page and running it on the inputs.

## Notes for you

Newest first. Whenever someone's Claude finishes or changes something that affects you, it adds a line here (see `CLAUDE.md`). The full log for everyone is in `00_ADMIN/TEAM_NOTES.md`.

- 2026-11-25, from Fatema: T-02 run: MATCH (coverage part). Pull request #24 is ready to merge.
- 2026-11-25, from Fatema: T-02 expected result written (coverage part). Pull request ready to merge.
- 2026-11-25, from Fatema: T-01 done and merged (pull request #21), verdict MATCH. Fatema also corrected her name's spelling across the repo.
- 2026-11-25, from Ammar: still to do: send the build chat its prompt (batch check, memo intake, CSV export, part-family summary).

## Status (updated 2026-11-23)

- Done: canvas drafted, roles set, to-do files, memo decision recorded in the canvas decision log (header supplier only; other mentions are notes), pull request #1 merged.
- Done: first slice of the tool built (load files, §2 matching, coverage, coverage record). You ran it on the real files on 2026-11-23: 26 suppliers, 23 log rows, 24 memos, none missing. The coverage record is in `05_EVIDENCE/`.
- Waiting for: Fatema's expected result for T-01, the three memo batch CSVs, the instructor's READY TO BUILD initial on the canvas, and the group confirming the memo decision.

## Step by step: from where to where

Follow these steps in order. `PACK/` below means the folder `01_PACK_AS_ISSUED/C5-A_SUPPLIER_RISK_CONTROL_TOWER_PACK_V1_2_EXPLORATORY_DRAFT_V1/` in the repo.

| Step | What | From | To |
|---|---|---|---|
| 1 | The tool `control_tower.html` | Repo: `02_WORK/` | Your computer, then double-click to open |
| 2 | Files to load into the tool | Repo: `PACK/INPUTS/` | The tool's boxes, or drop the whole INPUTS folder |
| 3 | Batch CSVs | Hussain, Marwan, Maryam | Repo: `02_WORK/extraction/`, then the tool's **Memo extraction** box |
| 4 | Coverage record the tool downloads | The tool's **Coverage record** tab | Repo: `05_EVIDENCE/` (or give it to Maryam) |
| 5 | T-01 verdict | Fatema | The test record in `04_TESTS/` |

**To upload a file to the repo:** open the folder on GitHub, click **Add file → Upload files**, drag the file in, then click **Commit changes**.
**To make a CSV from Claude's answer:** copy the CSV block, paste it into Notepad (or TextEdit in plain text mode), and save it with the name shown, ending in `.csv`.

## Week 7 (now)

1. **Get the canvas reviewed.** The draft is `00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md`. Go through it with the group, then show it to the instructor for READY TO BUILD (or REWORK FIELD n).
2. ~~Settle the memo design question~~ **Done 2026-11-23.** The tutor ruled: a memo counts only for the supplier in its header (RR-C5 §2). It's in the canvas decision log. The tutor also suggested a test for this, which is now T-02 in Fatema's file; bring its result to the next checkpoint.
3. **First slice: built.** Once Fatema has written T-01, run the tool with her for that supplier so she can record the verdict.
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

After the slice works and Fatema has recorded the verdict, the later steps (all 26 suppliers, the three flags, contradictions, status, new memo intake, CSV export) each get their own small prompt, one step at a time, with a test written first.

## Week 8 (next)

- Collect the three batch CSVs from Hussain, Marwan and Maryam in `02_WORK/extraction/`. As each one arrives, load it in the tool's Memo extraction box: the coverage record shows any quote that isn't word for word in its memo, and any memo with no rows.
- Build the full scorecard and coverage on all 26 suppliers and 24 memos, so the acceptance questions can be answered by running the page.
- Fill canvas field 7 (the trap you actually found, with evidence) and agree the visible addition (field 13) with the tutor.
