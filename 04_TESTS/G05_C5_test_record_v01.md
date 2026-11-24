# TEST RECORD — C5-A Supplier Risk Control Tower

Write the expected result and its rule or clause **before** the run. The chat that produced an answer is not its check. Types: ACCEPTANCE · TRAP · REFUSAL · EDGE · EXTENSION · REGRESSION · INDEPENDENT CHECK. Verdicts: MATCH · MISMATCH · OBSERVED FAILURE · NOT RUN. (An XLSX copy with drop-down lists sits beside this file.)

| Test ID | Type | Input (file, row, document) | Expected result + rule or clause (written BEFORE the run) | Expected written by | Observed result (file) | Verdict | Evidence link | Version tested | Notes |
|---|---|---|---|---|---|---|---|---|---|
| AQ-1 | ACCEPTANCE | The scorecard row for every supplier on the master list, with flags, evidence quotations or record references, and status (RR-C5 §6). | | | | | | | |
| AQ-2 | ACCEPTANCE | Which suppliers have never been assessed, and how you know — with the scope of the records searched (RR-C5 §1.3, §4.1). | | | | | | | |
| AQ-3 | ACCEPTANCE | Which part families depend on a single qualified supplier, and what evidence shows it (RR-C5 §4.2)? | | | | | | | |
| AQ-4 | ACCEPTANCE | Where memos contradict each other, which statement your scorecard uses and why (RR-C5 §5). | | | | | | | |
| AQ-5 | ACCEPTANCE | Which indemnity positions cannot be determined from the memos (RR-C5 §4.3) — and, separately, which suppliers have no memo at all (coverage, §3). | | | | | | | |
| T-01 | ACCEPTANCE | SUPPLIER_MASTER.csv row SUP-01 (Corranby Foundry Works W.L.L.); ASSESSMENT_LOG.csv (all rows); MEMOS/ (all 24 memo headers) | SUP-01: Memos MEMO-01 (RR-C5 §2, all 24 memo headers checked). Log row: yes, 2025-09-14 PASS (§3). | Fatema | Coverage tab: SUP-01, memos MEMO-01, log row yes (ASSESSMENT_LOG.csv line 2: 2025-09-14, PASS). | MATCH | 05_EVIDENCE/T-01_coverage_SUP-01_2026-11-25_Fatema.png | 02_WORK/control_tower.html, main, downloaded 2026-11-25 | Ammar ran the tool on the real files on 2026-11-23, before this expected result was written. |
| T-02 | | | | | | | | | |
| T-03 | | | | | | | | | |
| T-04 | | | | | | | | | |
| T-05 | | | | | | | | | |
| T-06 | | | | | | | | | |
| T-07 | | | | | | | | | |
| T-08 | | | | | | | | | |
