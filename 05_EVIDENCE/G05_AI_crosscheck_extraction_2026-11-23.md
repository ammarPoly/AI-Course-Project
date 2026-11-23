# AI cross-check of the memo extraction (2026-11-23)

> **Fatima: don't open this until you've finished your own re-read of the memos.** Your re-read is the group's independent check, and it only counts if you do it without seeing this first.

**What this is:** a second AI check, run by Ammar's Claude (a different chat from the three batch extraction chats), answering the tutor's question 3: "How would you notice a statement Claude missed in a memo that did produce other rows?"

**Method:** every sentence of all 24 memos (`01_PACK_AS_ISSUED/.../INPUTS/MEMOS/`) was listed and compared with the 37 rows in `02_WORK/extraction/BATCH_1/2/3_*.csv`. For each sentence: does it state a qualification or indemnity position, and is there a row for it? Each row's memo date, "Supplier (as written)" header, allowed position value and cap number were also checked against the memo.

**Scope:** 24 memos, 37 extraction rows, as of 2026-11-23. Flags and statuses were not looked at.

## Result

| Check | Result |
|---|---|
| Every quotation is a real sentence from its memo | 37 of 37 |
| Memo date and header copied correctly | no errors |
| Positions use allowed values; CAP rows have a number | no errors |
| Qualification or indemnity sentences with no row | none clearly missed |

## Borderline sentences (not extracted; a person should judge)

| Memo | Sentence | Why it is borderline |
|---|---|---|
| MEMO-04 | "Ostrand's motors passed our winding-temperature tests but two units arrived with damaged terminal boxes in January." | A quality test result, not a qualification statement |
| MEMO-13 | "Saltcote's epoxy coating failed our adhesion test on one batch in October." | A failed batch test is not the same as failing qualification; the memo says the corrective action is closed |
| MEMO-19 | "Our supplier assessment of Ironvale is scheduled for Q4 2026." | A planned assessment; under RR-C5 §4.1 only the assessment log counts |

## Note on the "about" column

MEMO-08's row "A second source has been discussed but no supplier has started qualification." is marked about NOT STATED, so the page counts it for the header supplier (Kestrelwire). Its position is OTHER, so it changes nothing, but it is an example of the weak spot recorded in the decision log for tutor question 1.

This is an AI check. It can miss things too, which is why the group's independent check is a person (Fatima) re-reading a sample of memos.
