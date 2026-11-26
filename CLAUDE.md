# Rules for every Claude working in this repo (Group 5, C5-A Supplier Risk Control Tower)

Every group member's Claude reads this file automatically. Follow it in every session.

## Who is who

| Member | Role | To-do file |
|---|---|---|
| Ammar | Build lead | `00_ADMIN/TODO/TODO_Builder_Ammar.md` |
| Hussain | Data / input lead | `00_ADMIN/TODO/TODO_Data_Lead_Hussain.md` |
| Marwan | Presenter | `00_ADMIN/TODO/TODO_Presenter_Marwan.md` |
| Maryam | Evidence / documentation lead | `00_ADMIN/TODO/TODO_Evidence_Maryam.md` |
| Fatema | Tester | `00_ADMIN/TODO/TODO_Tester_Fatema.md` |

At the start of a session, ask which member you're working for (if it isn't clear), then read that member's to-do file, starting with its **Notes for you** section.

## Leave notes for the team (do this every time you change something)

Whenever you finish or change something in this repo, before you push:

1. **Add a note to every member it affects**, at the top of the **Notes for you** section of their to-do file (newest first). One line, in this form:
   `- YYYY-MM-DD, from <member>: <what was done or changed>. <What this person should do now, if anything.>`
   Examples:
   - `- 2026-11-25, from Fatema: T-01 done (MATCH, screenshot in 05_EVIDENCE). Please mark CP-7 line 5 YES.`
   - `- 2026-11-25, from Hussain: rule choices in 02_WORK/dev_tests/README.md reviewed; I disagree with point 3 (see my note there). Please discuss with the build chat.`
2. **Add the same line to `00_ADMIN/TEAM_NOTES.md`** (newest first), so the whole group can see everything in one place.
3. If you finished one of the member's own tasks, also tick or update it in their to-do file.
4. Always tell **Ammar** (build lead) when something is ready to merge, and **Maryam** (evidence) when there's new evidence to log.

Keep notes short, factual and in plain words. Don't use em dashes. Never mark something done that wasn't done.

## Rules that always apply

- **Never edit anything in `01_PACK_AS_ISSUED/`.** It must stay exactly as the instructor issued it.
- **Expected results are written by a person, never by Claude.** In the test record (`04_TESTS/`), Claude may format or copy what the member wrote, but never decides an expected result. The expected result is written **before** the tool is run.
- **Don't show real flags, statuses or scorecard results** to anyone who hasn't written their expected results yet.
- **Work on a branch and open a pull request.** Don't change `main` directly. Tell Ammar when it's ready.
- **Ask before adding anything the canvas doesn't mention** (`00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md`).
- The tool is `02_WORK/control_tower.html`. The memo extraction files are in `02_WORK/extraction/`. The rule card is `01_PACK_AS_ISSUED/C5-A_SUPPLIER_RISK_CONTROL_TOWER_PACK_V1_2_EXPLORATORY_DRAFT_V1/RULES/RISK_RULES_RR-C5.md`.
- Tutor ruling (23 Nov): a memo counts only for the supplier in its header "Supplier (as written)" (RR-C5 §2).
