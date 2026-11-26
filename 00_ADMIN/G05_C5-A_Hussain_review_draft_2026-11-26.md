# Hussain's review: MEMO-20 warning and rule choices (DRAFT)

**Status: DRAFT, prepared by Hussain's Claude on 2026-11-26. Not yet confirmed by Hussain.** Hussain reads it, changes anything he disagrees with, then changes the status line to "Confirmed by Hussain, <date>".

Sources used: `RULES/RISK_RULES_RR-C5.md`, `INPUTS/SUPPLIER_MASTER.csv`, `INPUTS/MEMOS/MEMO-20.md`, `02_WORK/dev_tests/README.md`, the code in `02_WORK/control_tower.html`. Dev tests run on 2026-11-26: all passed. This file shows no flags, statuses or scorecard results.

## 1. MEMO-20 warning ("bronze range" vs "impellers")

**Proposed answer: agree. The tool is right not to apply this row.**

- MEMO-20 sentence: "Quillmarsh supplies composite impellers for the small-pump range and is qualified for our bronze range as overflow."
- Master: SUP-20 Quillmarsh Impeller Co. has one family, `impellers`.
- "Bronze range" is not the name of any master family. It probably means bronze impellers, but the memo does not say so, and RR-C5 §1.4 says never to infer from a guess. So the honest answer is that a person has to check it, which is exactly what the warning says.
- Applying it would not change anything anyway: the row says QUALIFIED, and SUP-20 is APPROVED, so it already counts as qualified for impellers by default (§4.2). Only a FAILED or MUST NOT USE memo could change it.
- Good refusal example for the demo: the tool reports a sentence it cannot place instead of guessing.

## 2. Rule choices in `02_WORK/dev_tests/README.md`

| # | Choice | Proposed answer | Reason |
|---|---|---|---|
| 1 | Only VERIFIED rows from a memo matched to the supplier, and only sentences about the header supplier; NOT STATED or a short form of the header name counts as the header supplier | Agree | Follows §2 and the tutor ruling of 2026-11-23. The code accepts a short form only when its words are the first words of the header or master name ("Amberlode" for "Amberlode Sealing"). Known weak spot (already in the decision log): a side sentence marked NOT STATED would count for the header supplier, so the independent re-read has to catch it. |
| 2 | NO CLAUSE and CAP state an indemnity position; STANDARD TERMS and OTHER do not, so a newer one does not replace an older stated position | Agree | §4.3 reads the newest memo "that states an indemnity position" and lists "standard terms apply" under "no memo states the position". So a "standard terms" memo counts like silence. Worth saying in the demo, because a reader might expect the newer memo to win. |
| 3 | `cap_bhd` must appear in the quotation, otherwise CANNOT DETERMINE; a cap of exactly BHD 50,000 is NO GAP | Agree | The 50,000 boundary is §4.3 word for word ("BHD 50,000 or more"). The number check is not in RR-C5 itself, but it follows §1.1 (a flag rests on the exact sentence) and canvas field 6 step C. The code accepts the number with or without thousands commas. |
| 4 | FAILED and MUST NOT USE take qualification away, QUALIFIED gives it back, OTHER changes nothing; families matched ignoring case and plurals; NOT STATED only when the supplier has one family; unmatched family is not applied and gives a warning | Agree, with one wording fix | Follows §4.2 (newest memo that states qualification governs). **Wording fix:** the code does a bit more than "ignoring case and plural endings": it also accepts a match when all the words of one name are in the other ("seal" = "mechanical seals", "gasket range" = "gaskets"). The README example already shows this, but the sentence before it should say so, so a reader checking the code against the README is not surprised. |
| 5 | Two memos with the same newest date that disagree give CANNOT DETERMINE (indemnity) or a warning (qualification) | Agree | §5 says the newer memo governs but says nothing about a tie. Refusing to pick one follows §1.4. |
