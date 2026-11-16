# C5-A Supplier Risk Control Tower: OPTIONAL HELP (only when you are stuck)

**You do not need to read this to start.** It is here for a group that is stuck. Nothing in it is an answer, and nothing in it says where the problems in your pack are.

**How to use it.** Start at **Level 1**. Discuss the questions as a group for about 15 minutes and write down what you tried. Move to **Level 2** only if you are still stuck, and to **Level 3** only after that. Using any level is allowed. Write in your decision log (K-02) which level you used and what you changed. If you are still stuck, bring a consult slip (K-09).

---

## Level 1: questions to rethink the problem
1. What would make the director trust one line of your scorecard? What would make her doubt it?
2. For each flag in RR-C5 §4, which sources does the rule say you need: the records, the memos, or both?
3. How would you prove to the director that your system did not skip a memo?
4. What is the difference between "no memo", "never assessed" and "no risk"? Where does each one appear in your outputs?
5. When two memos about the same supplier disagree, what does your scorecard show, and where?
6. Which steps are exact comparisons that a spreadsheet or a program does perfectly, and which need reading sentences?

*Stop here. Try your ideas before you read Level 2.*

---

## Level 2: general strategies and possible directions
- **Split the work by kind.** Checks that use only the records (exact, good for a spreadsheet or a program) · reading the memos (AI, with exact quotations) · applying §4 to §6 (rules, the same every time) · the scorecard and coverage (outputs).
- **Read in planned portions rather than in one giant prompt.** A model can silently skip text in a long input. Asking it to list back the IDs of the memos it read is a cheap way to prove coverage.
- **Turn the matching rule (§2) into something testable:** write the five steps as a formula or a small function, and test it on supplier names you invent.
- **Store each finding with its evidence** (memo ID and quotation, or file and row) at the moment you find it. Adding evidence later is where errors come in.
- **Possible directions** (each can work; choose and justify):
  - *A Claude Project* with the batch files as knowledge, a repeatable reading method, and a workbook for the records and the scorecard.
  - *Claude Code or Cowork on a copy of the pack*, reading `MEMOS/` file by file and writing a findings file, with a person checking the quotations.
  - *A small program or web page* that combines the findings file with the records and applies the rules.

*Stop here. Try a direction before you read Level 3.*

---

## Level 3: concrete guidance for a group that is genuinely stuck
- **A first working slice that has worked:** sweep **one batch of eight memos** for **one** risk type: every flag quoted, and the batch's memo IDs echoed back to prove coverage, with the expected results written first.
- **One route that has worked** (you may still choose another):
  1. a coverage table for all 26 suppliers (memos found / NO MEMO; assessment-log row yes / no), recorded separately from the risk flags;
  2. a scorecard (artifact or Excel): one row per master supplier, with flags, evidence, status and a drill-down to the quotations;
  3. a sweep log: each planned sweep run once and kept, with the memo IDs echoed back to prove what it covered (`TEMPLATES/C5_SWEEP_LOG_TEMPLATE.csv`);
  4. an intake Skill: a new memo → a supplier record with evidence and NOT STATED where the memo is silent.
- **Sharing the work:** one batch per member, each in their own account, planned on the usage-budget card (K-07).
- **Records tip.** The comparison of the master with the log is a set comparison. In Excel, `COUNTIF` or `XLOOKUP` shows, for each master supplier, whether the log has a row; write the scope (file, number of rows, as-of date) beside the result.
- **Optional reviewer:** `STRETCH/` holds a ready-made read-only reviewer for Claude Code that checks each flag against its cited evidence. Use it only on a copy, after your scorecard exists.
- **If something does not work:** Project knowledge refuses the files or seems to miss memos → attach one batch file per chat and sweep batch by batch; echo the memo IDs back each time. A Skill does not load → run the method as a pasted prompt, labelled. Cowork or Claude Code fails → do that step in Claude chat and Excel, and record the switch.

*SYNTHETIC — for teaching (Week 7 studio, Artificial Intelligence in Logistics). C5-A Supplier Risk Control Tower · optional help · exploratory variant draft V1 (review candidate) · 2026-11-08. Every company, person, number and document in this pack is fictional.*
