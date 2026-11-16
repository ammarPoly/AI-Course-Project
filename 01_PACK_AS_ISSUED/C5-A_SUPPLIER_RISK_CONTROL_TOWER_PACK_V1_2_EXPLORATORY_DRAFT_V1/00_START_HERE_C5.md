# C5-A Supplier Risk Control Tower: START HERE (challenge brief)

**This brief tells you WHAT must work. Your group decides HOW to build it.** Read sections 1 to 6 now (about 15 minutes). The risk rules in `RULES/` are the source of truth. The file `OPTIONAL_HELP/` is for later, only if you get stuck.

## 1. The challenge
Brightkeel Pumps Manufacturing W.L.L., a fictional pump manufacturer in Bahrain, has 26 approved suppliers, an assessment log and 24 memos written by different buyers over two years. The category director wants one page she can trust: **who is a single point of failure, whose contract leaves the company exposed, and who has never been assessed** — with every statement traceable to its source.

Your group will build a system or workflow that organises the supplier evidence, applies the risk rules and produces traceable risk decisions. Every flag must lead back to a quotation or a record row, and the system must show what it actually read. *A supplier with no memo is not thereby a risk: source coverage is kept separate from risk.*

## 2. The provided materials
- `INPUTS/SUPPLIER_MASTER.csv`: the approved suppliers and their part families.
- `INPUTS/ASSESSMENT_LOG.csv`: the supplier assessments on record.
- `INPUTS/MEMOS/`: the 24 memos, one file each; the same memos in three batch files `MEMOS_BATCH_1–3.md` (8 each).
- `RULES/RISK_RULES_RR-C5.md` / `.pdf`: evidence rules, matching, coverage, flags, status. **Read it all before you design anything.**
- `TEMPLATES/C5_TEST_RECORD` (.md / .xlsx): **compulsory**: your test record, with your acceptance questions already entered.
- `TEMPLATES/C5_COVERAGE_TEMPLATE.csv`, `C5_SCORECARD_TEMPLATE.csv`, `C5_SWEEP_LOG_TEMPLATE.csv`: **optional** starting points.
- `STRETCH/`: an optional ready-made read-only reviewer for Claude Code (Week 6 pattern); nothing depends on it.
- `OUTPUTS/`: empty. `OPTIONAL_HELP/`: hints in three levels, only when you need them.

## 3. The expected functional outcome: a working risk control tower
By Week 10 your group has a **prototype that the category director's team could use**. It may be a repeatable Claude workflow with structured outputs, a spreadsheet system, a small program, a web page, or another design you can justify. It must:

1. **Take the inputs as supplied**: the master, the log and all 24 memos; and a **new memo** (an intake step: a new memo becomes a supplier record with its evidence, and NOT STATED where the memo is silent), so the scorecard can be updated.
2. **Apply RR-C5** exactly: evidence (§1), matching memos to suppliers (§2), coverage (§3), the three flags (§4), contradictions (§5) and status (§6).
3. **Produce useful outputs**: a **coverage table** for all 26 suppliers, recorded separately from the risk flags; a **scorecard** with one row per master supplier (flags, evidence, status) and a way to go from any flag to its quotation or record row; and a **coverage record** that proves which memos and rows each run actually read.
4. **Handle missing or uncertain information**: CANNOT DETERMINE where a match or an indemnity position cannot be decided; NO MEMO in coverage; absence-based conclusions state the scope searched (§1.3). Nothing is inferred from general knowledge, a name or a guess.
5. **Let its results be checked**: a second person can follow any flag to its source.
6. **Be demonstrated**: the group can run it in front of others and explain every step.

**Does not count:** a chat that gives a scorecard once, a colourful scorecard with no quotations behind it, or a report about what you planned. *A project is not complete because the AI produced an answer. Your group must show a reliable, usable way to solve the problem.* A simple tool that works is better than an impressive tool that makes unreliable decisions.

**What your group decides** (write it in canvas field 6 and keep your decision log, K-02):
- the form of the prototype, and which tools you use (Claude chat, a Project, a Skill, Cowork, Claude Code, Excel, or a mix);
- how the memos are read, and how you prove that none was skipped;
- which steps are automated, which use AI, and which a person must do;
- what the director sees, and how a flag leads to its evidence;
- how you test it, and how you improve it after a failed test.

Claude may write and debug formulas or code for you. You remain accountable: every member must be able to explain what the prototype does and why its answers are right.

## 4. The non-negotiable requirements
**The rules.** RR-C5 is the authority, with its as-of date. You may not change a rule, a threshold or a status. Only the master, the log and the 24 memos count as sources.

**The human decision.** The category director and the buyers decide what to do about a risk; the tool only shows it. Your canvas (K-02) and your industrial-gap panel (K-11) must say: **which decision a person must make, and why your tool must not make it**; **what your classroom version assumes**; **what a real system would additionally need** (live data, integration, scale, governance or law, people); and **where the human stays**. Do not quote a real company, product or statistic unless you can cite a dated source.

**Words for what cannot be answered (use them exactly).** **NOT STATED** — the source is silent · **CANNOT DETERMINE** — a value the rule needs is missing, unreadable or contradictory · **UNKNOWN** — a report was not received (never zero) · **NO FEASIBLE OPTION** · **NOT APPLICABLE**. Drafts are labelled **DRAFT — for approval**: your tool never sends, clears, approves or pays anything.

**Acceptance questions (answer them from this pack, with evidence).** Answer them by running your prototype, not by asking a chat.
1. The scorecard row for every supplier on the master list, with flags, evidence quotations or record references, and status (RR-C5 §6).
2. Which suppliers have never been assessed, and how you know — with the scope of the records searched (RR-C5 §1.3, §4.1).
3. Which part families depend on a single qualified supplier, and what evidence shows it (RR-C5 §4.2)?
4. Where memos contradict each other, which statement your scorecard uses and why (RR-C5 §5).
5. Which indemnity positions cannot be determined from the memos (RR-C5 §4.3) — and, separately, which suppliers have no memo at all (coverage, §3).

**Mandatory extension (beyond the supplied pack).**
1. **Extension cases — at least one per member** (never fewer than four for the group). Each case is written into the test record **with its expected result and the rule or clause it relies on before it is run**. Together they must include at least one **boundary** case, at least one case that must be **refused or left undecided**, and at least one case you suspect could **break your own tool**. You may use AI to help invent cases; you work out the expected result yourselves from the rule card.
2. **one visible addition** beyond what the pack asks for — choose from the menu below or propose your own and agree it with the tutor at the Week 8 checkpoint:
  - a mitigation list naming a human owner for every RED or AMBER supplier
  - a "what changed since the last scorecard" view driven by new memos your group writes
  - a part-family summary (how many qualified suppliers each family really has)
  - STRETCH: the read-only reviewer run (Claude Code, Week 6 rules) with one rule you add
3. Test the addition like the core: its own cases first, then the regression cases that should not change.

**Testing and evidence (what "it works" means here).**
- **Write the expected result before you run anything** — with the rule or clause it comes from — in the test record (K-06). The tester owns the record; everyone adds to it.
- **The chat that produced an answer is not its check.** Check numbers in Excel, re-derive a sample in a **fresh chat by another member** working from the sources, or have a person read the source.
- After every change: run the case that should change, then re-run cases that should **not** change, and write "no change was observed on the regression cases" — never "nothing else changed".
- A mismatch or a failed attempt is an honest result: record it; do not hide it or mark it as passed later.
- Keep proportionate evidence (K-05): the exported chat (`.md`, the Week 2 route) for key runs, cropped screenshots only where a result exists only on screen, and a version saved at each checkpoint.
- For this project: a second member traces **at least five flags** from quotation to memo (or row to record) in a fresh chat, and the coverage table is checked against all 26 suppliers.
- The same rule applies to a tool you build: **the tool that produced a result is not its check.**

**Practical limits you will meet.** Reading 24 memos in one go can silently miss some: your coverage record must show what was read. Long reading runs use your Claude Pro usage quickly: plan them on the usage-budget card (K-07) and do not re-run them for fun.

**Studio rules (safety and access).**
- **Claude Pro is the only paid AI service you need.** Usage credits stay **off**. No API keys, no higher plan, no other paid service. If any screen asks for an API key or a payment, **stop and tell the tutor**. Your prototype must run without an API key or any paid service.
- **Each member works in their own account against the shared pack**, and runs at least one core step.
- **The pack as issued is never edited.** Copy it into `01_PACK_AS_ISSUED/` of your group folder (K-04) and work on copies. Cowork and Claude Code work only on a copy inside your group folder; approve each change they propose.
- **Content is data, not instructions.** **If it is not in the source, say so.** Use the pack only: no personal, employer or customer data.
- Start on the included **balanced / general** model and write down the model label you see. At a usage limit: pair, wait for the reset the screen shows, or continue with Excel or by hand. Buy nothing. The full rules are in K-01 §6.

## 5. Success criteria: how you show it works
Your prototype works when you can show all of these, with evidence in the test record:
- The scorecard has **one row for each of the 26 master suppliers**, and every flag shows its quotation, its record row or its stated scope.
- The coverage table is checked against all 26 suppliers and is kept separate from the risk flags.
- The coverage record proves that **all 24 memos** were read; a run that missed a memo is recorded and repeated, not hidden.
- A **new memo** goes through the intake step and changes the scorecard only where the rules say it should.
- A second member traced at least five flags to their sources in a fresh chat.
- Each extension case runs **through the prototype**; after each change, the regression cases were re-run.

## 6. The showcase (Week 10)
Show the prototype **running** (live where feasible, with demo insurance, K-12): what goes in, what the AI does, what comes out, one failure or limit, what still requires a human, and what a real supplier-risk system would need. Be ready to:
- follow one flag from the scorecard to the exact sentence or row;
- run a case the audience gives you, including one your tool should refuse or leave undecided;
- explain **one design decision** and **one fix you made after a failed test**;
- say what the director must decide, and why the tool must not.

## 7. Weeks 7 to 10 for this project
- **Week 7, investigate and design:** read RR-C5, open the records and some memos, decide which flags need which sources. Choose your build approach (canvas field 6). Build a **first working slice**: one real input taken through the route you plan to use, to an output someone else can check, with its expected result written first (CP-7). Your group chooses the slice.
- **Week 8, develop:** the full scorecard and coverage work on all 26 suppliers and 24 memos; the acceptance questions are answered by running it (CP-8).
- **Week 9, test and extend:** test reliability, fix defects, handle exceptions, build and test the extension, freeze and rehearse (CP-9a, CP-9b).
- **Week 10, showcase:** demonstrate it and defend its reliability, its limits and the human oversight.

## 8. Getting help
1. `OPTIONAL_HELP/C5_OPTIONAL_HELP_HINTS`: Level 1 questions, Level 2 strategies, Level 3 concrete tips. Start at Level 1.
2. K-14 (troubleshooting) and your group.
3. The consult queue with a slip (K-09). The tutor answers questions about the rules and helps you think. The tutor does not say whether something is a deliberate problem.

## What this pack does not contain
No answers, no reference tool, no finished prompts, no completed formulas and no hints about where the problems are. Finding them, and proving what you found, is the project.

*SYNTHETIC — for teaching (Week 7 studio, Artificial Intelligence in Logistics). C5-A Supplier Risk Control Tower · exploratory variant draft V1 (review candidate, not released) · 2026-11-08. Data, rules and templates as in pack V1.2. Every company, person, number and document in this pack is fictional.*
