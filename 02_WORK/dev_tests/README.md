# Developer tests (made-up data only)

`logic_tests.js` checks the page's logic (CSV reading, memo headers, the five RR-C5 §2 steps, coverage, the quotation check, recognising which file is which) on **invented suppliers**, not the pack. That keeps the real slice result unseen until the tester has written the expected result in the test record.

These are build checks, not the course's tests. The course tests (expected result first, then the run) go in `04_TESTS/`.

Since 2026-11-23 it also checks the §4 flags, §5 contradictions and §6 status on 10 invented suppliers (boundary cap of exactly BHD 50,000, a cap of 49,999, a newer "standard terms" memo, a newer memo that reverses qualification, a supplier that is not approved, a family with no qualified supplier, a side mention, an unmatched memo, a cap that doesn't appear in its quotation).

## How the page reads the rules where RR-C5 leaves a choice (for the group to confirm)

- **Which rows count for a supplier:** only VERIFIED rows from a memo matched to that supplier (§2), and only sentences about the memo's header supplier (tutor ruling). `statement_about_as_written` counts as the header supplier when it is NOT STATED or a short form of the header name (e.g. "Tidewell" for "Tidewell Seal Systems").
- **Indemnity positions:** NO CLAUSE and CAP state a position. STANDARD TERMS and OTHER do not (§4.3 calls "standard terms apply" CANNOT DETERMINE), so a newer one does not replace an older stated position.
- **Cap check:** the number in `cap_bhd` must appear in the quotation, otherwise that row gives CANNOT DETERMINE. A cap of exactly 50,000 is NO GAP.
- **Qualification:** FAILED and MUST NOT USE take qualification away, QUALIFIED gives it back, OTHER changes nothing. The memo's part family is matched to the supplier's master families ignoring case and plural endings ("seal" = "mechanical seals", "gasket range" = "gaskets"). NOT STATED applies only when the supplier has one family. If the family can't be matched, the row is not applied and a warning tells a person to check it.
- **Same-date conflicts:** two memos with the same newest date that disagree give CANNOT DETERMINE (indemnity) or a warning (qualification).

Optional, needs Node.js: `node logic_tests.js ../control_tower.html "<path to the pack>/INPUTS"`. Last run 2026-11-23: all passed. On the real pack it only counted files: 24 memos with ID, date and supplier header, batch files identical to the single files, 26 master rows, 23 log rows.
