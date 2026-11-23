# Developer tests (made-up data only)

`logic_tests.js` checks the page's logic (CSV reading, memo headers, the five RR-C5 §2 steps, coverage, the quotation check) on **invented suppliers**, not the pack. That keeps the real slice result unseen until the tester has written the expected result in the test record.

These are build checks, not the course's tests. The course tests (expected result first, then the run) go in `04_TESTS/`.

Optional, needs Node.js: `node logic_tests.js ../control_tower.html "<path to the pack>/INPUTS"`. Last run 2026-11-23: all passed. On the real pack it only counted files: 24 memos with ID, date and supplier header, batch files identical to the single files, 26 master rows, 23 log rows.
