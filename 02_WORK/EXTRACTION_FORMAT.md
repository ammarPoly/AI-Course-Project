# Memo extraction format (v01)

This is the one format every memo-reading run must produce. The web page (`control_tower.html`) reads files in exactly this shape, so don't add, rename or reorder columns. If the format needs to change, the build lead changes this file and records it in the decision log.

## Columns (CSV, comma-separated, header row first)

```
memo_id,memo_date,header_supplier_as_written,statement_about_as_written,topic,part_family,position,cap_bhd,quotation
```

| Column | What goes in it |
|---|---|
| `memo_id` | e.g. `MEMO-07`, exactly as in the memo title |
| `memo_date` | the memo's **Date:** line, as `YYYY-MM-DD` |
| `header_supplier_as_written` | the memo's **Supplier (as written):** value, copied exactly. Don't correct or tidy it. |
| `statement_about_as_written` | the supplier the sentence is about, spelled exactly as in that sentence. It can differ from the header supplier. |
| `topic` | `QUALIFICATION`, `INDEMNITY` or `NONE` |
| `part_family` | the part family the sentence names, as written, or `NOT STATED` |
| `position` | QUALIFICATION: `FAILED`, `MUST NOT USE`, `QUALIFIED` or `OTHER`. INDEMNITY: `NO CLAUSE`, `CAP`, `STANDARD TERMS` or `OTHER`. NONE: leave blank. |
| `cap_bhd` | only when position is `CAP`: the number in BHD, digits only (e.g. `250000`). Otherwise blank. |
| `quotation` | the full sentence, copied character for character from the memo, in double quotes. If the sentence itself contains a double quote, write it twice (`""`). |

## Rules for the run

- One row per qualification or indemnity sentence. If a sentence covers two suppliers, write two rows.
- Every memo in the batch gets **at least one row**. A memo with no qualification or indemnity sentence gets one `NONE` row with the quotation left blank, so the page can show it was read.
- Copy, don't summarise. The page rejects any quotation that isn't word for word in its memo.
- No guessing: if the memo doesn't say it, use `NOT STATED` or leave the field as described above.
- The run does **not** decide flags, GAP / NO GAP or status. The page does that from RR-C5.
- After the CSV, the run lists every memo ID it read and the count, e.g. `MEMOS READ: MEMO-01, MEMO-02, ... (8)`.

Save each result as `02_WORK/extraction/BATCH_<n>_<member>_<YYYY-MM-DD>.csv`, and the exported chat in `05_EVIDENCE/`.
