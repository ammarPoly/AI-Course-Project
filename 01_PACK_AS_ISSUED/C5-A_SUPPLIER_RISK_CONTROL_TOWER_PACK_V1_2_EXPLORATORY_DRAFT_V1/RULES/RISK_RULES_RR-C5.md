# RISK RULES RR-C5 — Brightkeel Pumps Manufacturing W.L.L. supplier scorecard

A fictional classroom rule set. **As-of date: 2026-10-31.** The sources are `SUPPLIER_MASTER.csv`, `ASSESSMENT_LOG.csv` and the 24 memos (`MEMOS/` or the three batch files). Nothing else counts.

## 1. Evidence — every statement says where it came from
- **1.1 Memo-based flags** cite the **memo ID and the exact sentence** (quotation) they rest on.
- **1.2 Record-based flags** cite the **file and row** (master or log).
- **1.3 Absence-based conclusions** (something is *not* in the records) state the **scope of what was searched**: which files, how many rows or memos, as of which date — e.g. *"no row for SUP-xx in ASSESSMENT_LOG.csv (23 rows, as of 2026-10-31)"*.
- **1.4 If it is not in the sources, say so** — never infer a flag from general knowledge, a name or a guess.

## 2. Matching memos to suppliers
A memo names the supplier as the buyer wrote it. A memo matches a master supplier if the two names are identical after these steps, **in this order**:

1. **Remove full stops** (so "W.L.L." becomes "WLL" and "Co." becomes "Co").
2. **Replace every other punctuation mark with a space** (commas, hyphens, brackets, ampersands …).
3. **Ignore letter case.**
4. **Remove the legal suffixes** WLL, Co, Company, Ltd, LLC and FZE wherever they appear as separate words.
5. **Ignore a plural "s"** at the end of the last remaining word.

Any other difference → **CANNOT DETERMINE (match)** — report it; do not attach the memo to a supplier by guesswork.

## 3. Source coverage — recorded separately from risk
For **every supplier in the master**, record the memos found (IDs) or **NO MEMO**, and whether the assessment log has a row. **No memo is not a risk flag** and is not the same as "never assessed": it only means the memos cannot tell you about that supplier (for example its indemnity position).

## 4. The three risk flags
- **4.1 NEVER ASSESSED** — an approved supplier in `SUPPLIER_MASTER.csv` with **no row in `ASSESSMENT_LOG.csv`**. Evidence: the master row and the stated absence from the log (1.3). A memo saying that an assessment is planned or scheduled is **not** an assessment. A memo is **not needed** to establish this flag, and a supplier with no memo is not thereby never assessed.
- **4.2 SINGLE SOURCE** — a part family (from the master) with **exactly one approved supplier that is qualified**.
    - **Approved means qualified, by default.** Every supplier marked `APPROVED` in `SUPPLIER_MASTER.csv` counts as **qualified for every part family listed against it** — whether or not any memo mentions it. No memo is needed to be qualified.
    - **Only a memo can take qualification away.** A supplier is **not qualified** for a family when the **newest memo about that supplier that states its qualification for that family** says it failed qualification or must not be used for it. A newer memo that says nothing about qualification does not change this. The supplier's approval status in the master is not changed — it simply does not count for that family.
    - **Count** the qualified suppliers of each family: **exactly one → SINGLE SOURCE**, placed on that supplier. If none is qualified, report the family as a finding; it is not a flag on any supplier.
    - Evidence: the master rows for the family + the memo quotation wherever a memo takes qualification away.
- **4.3 INDEMNITY** — read from the **newest memo about the supplier that states an indemnity position**; a newer memo that says nothing about indemnity does not change it.
    - **GAP** = the memo states there is no indemnity clause, or a cap **below BHD 50,000**.
    - **NO GAP** = a cap of **BHD 50,000 or more**.
    - **CANNOT DETERMINE** = no memo states the position ("standard terms apply", silence, or no memo at all).

## 5. Contradictions
Where two memos about the same supplier state different positions, the **newer** governs. Report **both quotations** with their dates; never blend them into one.

## 6. Scorecard status (one per supplier)
- **RED** — SINGLE SOURCE **and** (INDEMNITY GAP **or** NEVER ASSESSED).
- **AMBER** — otherwise, any one of SINGLE SOURCE, INDEMNITY GAP, NEVER ASSESSED.
- **CANNOT DETERMINE** — no flag, but the indemnity position is CANNOT DETERMINE.
- **GREEN** — no flag and indemnity NO GAP.

Notes (not flags) may record other facts the memos give — for example a failed qualification — with their quotation.

*SYNTHETIC — for teaching (Week 7 studio, Artificial Intelligence in Logistics). C5-A Supplier Risk Control Tower · Version V1.2 · 2026-11-08. Every company, person, number and document in this pack is fictional.*
