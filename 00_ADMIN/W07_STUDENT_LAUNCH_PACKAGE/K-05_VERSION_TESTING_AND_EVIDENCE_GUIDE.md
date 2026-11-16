# K-05 — Version, testing and evidence guide

## 1. Names and versions
- **Names:** `G<nn>_<ID>_<thing>_v<nn>_<YYYY-MM-DD>.<ext>` — for example `G03_C1_audit-table_v03_<date>.xlsx`. A frozen showcase version adds `_FROZEN`.
- **Save a version:** before any change you might want to undo · after a test that matters · at every checkpoint · at feature freeze.
- **Change note (one line per version):** what changed · why · which test shows it.
- **Iterate, do not regenerate.** Fix the step that failed. A full regeneration loses what already worked and costs usage.

## 2. Testing — step by step
1. **Write the expected result first** — the value or decision, the rule or clause it comes from, and who wrote it — in the test record (your pack's copy, or K-06).
2. **Run** the case through your prototype (any AI step in your own account, in a fresh chat where a chat is used).
3. **Record what you observed** — the result itself (the value or decision the tool gave) — and **where the evidence is** (the path of the saved file).
4. **Give a verdict:** MATCH · MISMATCH · OBSERVED FAILURE · NOT RUN.
5. **Check independently** — never with the chat that produced the answer, and never with the tool that produced the number: recompute in Excel, a **fresh chat by another member** working from the sources, or a person reading the source.
6. **After every change**, re-run the cases that should *not* change, and write "no change was observed on the regression cases" — never "nothing else changed".

**Test types:** ACCEPTANCE (your brief's questions) · TRAP (a problem you found in the pack) · REFUSAL (something the tool must refuse or leave undecided) · EDGE (a boundary) · EXTENSION (a case you authored) · REGRESSION · INDEPENDENT CHECK.

**A filled test line (invented example, not from any pack) — one row of the test record, shown field by field:**

| Column | Entry |
|----------------------------|-------------------------------------------------|
| Test ID | T-07 |
| Type | EDGE |
| Input | invented booking ending exactly at closing time |
| Expected + clause (before the run) | REFUSED — house rule 4.2 (bookings must end before closing) |
| By | tester |
| **Observed** | **ACCEPTED — the tool booked the slot** |
| Verdict | MISMATCH |
| **Evidence** | `05_EVIDENCE/T-07_run_v03.md` (exported chat) |
| Version | v03 |
| Notes | expected REFUSED, observed ACCEPTED: the tool treated "at closing" as allowed. Fixed in v04 and re-run as a new line (T-07b: MATCH); T-01–T-03 re-run: no change was observed on the regression cases |

**Reading the line.** *Observed* is what the tool actually did — a value or a decision, not a file name. *Evidence* is where the proof is saved — the file path. In the test records (K-06 and your pack's copy) the column *Observed result (file)* takes the result itself (and, if the result is a long output, its file name); the *Evidence link* column takes the path of the saved proof.

**MISMATCH** means the observed result differs from the expected result written before the run. Keep the line as it is; find the cause — usually the tool, sometimes the expectation (check the clause; if the expectation was wrong, say so in the notes); fix it in a new version; re-run the case as a new line. A MISMATCH or OBSERVED FAILURE is an honest result. Nothing is marked as passed afterwards for a step that was not run.

## 3. Evidence — proportionate
- Keep what proves a claim: the test-record line, the exported chat for key runs, a cropped screenshot where the result exists only on screen.
- **Never edit evidence.** A failed run is evidence too. Label AI-generated text as such. Quote the pack with file and clause or row.
- **Chat capture (the Week 2 route):** copy the conversation into a `.md` file with the header below. Never include an e-mail address or other personal detail; crop account information from screenshots.
- **Usage meter:** record exactly what is displayed, if you record it at all; never infer an allowance.
- **Do not:** screenshot every action; keep full transcripts by default; rename or "tidy" a raw export.

### Chat-export header (copy into the top of each exported chat)
```
Date:
Account label and plan (as displayed):
Model label (as displayed):
Project (Claude Project name):
Prompt, Skill, workbook or code file and its version:
Run purpose (test ID):
```

*Week 7 student launch package · Artificial Intelligence in Logistics · studio kit exploratory variant draft V1 (review candidate, based on V1.2) · 2026-11-08. Templates and guidance only — no answers, no marks.*
