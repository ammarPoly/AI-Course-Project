# K-04 — Group folder and submission guide

## 1. One folder structure for every group
Unzip `K-04_GROUP_FOLDER_SKELETON.zip` **once per group** and rename the top folder, for example `G03_C4-A_customs-gate`.

```
G<nn>_<ProjectID>-<variant>_<short-name>/
  README.md           who we are; project; current version
  00_ADMIN/           canvas, roles, budget card, checkpoints, slips
  01_PACK_AS_ISSUED/  the pack as received — never edited
  02_WORK/            your prototype's working files
  03_VERSIONS/        v01, v02 … dated copies + change notes
  04_TESTS/           test record, extension cases, checks
  05_EVIDENCE/        exported chats, cropped screenshots, notes
  06_SHOWCASE/        run of show, frozen-version pointer, insurance
```

Each folder holds a short `_ABOUT_THIS_FOLDER.md` so that it survives file-sharing services that drop empty folders. The group keeps **one canonical folder** wherever it already shares files — the course requires no particular service, and nothing is bought or installed. **Every member keeps a local copy of `01_PACK_AS_ISSUED/`.** Pack copies used in Cowork or Claude Code are always copies of the issued pack (sandbox first).

## 2. Checking your pack (data lead, first ten minutes)
- **Everyone (CORE):** open `PACK_INVENTORY.md` and compare it with the unzipped folder — the same file names, the same number of files. Report any difference before you start.
- **Optional (fingerprints):** `PACK_SHA256SUMS.txt` holds each file's SHA-256 fingerprint. On a Mac, in Terminal inside the pack folder: `shasum -a 256 -c PACK_SHA256SUMS.txt` (every line should say OK). On Windows PowerShell: `Get-FileHash <file> -Algorithm SHA256` for a file you want to check. You are not assessed on these commands.

## 3. What you share at each checkpoint — and how
| Checkpoint | What you share | Version |
|----------------|-------------------------------------------|----------------|
| **CP-7** end of Week 7 | `00_ADMIN/`: canvas (initialled), roles, usage-budget card, CP-7 | `03_VERSIONS/v01` |
| **CP-8** end of Week 8 | CP-8 · the test record · evidence pointers · industrial-gap draft (K-11) | the version CP-8 names |
| **CP-9a** mid-Week 9 | CP-9a · the frozen version (`_FROZEN`) | `…_FROZEN` |
| **CP-9b** end of Week 9 | CP-9b · K-13 checklist · showcase sheet (K-12) · demo insurance | the frozen version |
| **Week 10** | the frozen version runs; the evidence folder is available on request | the frozen version |

- **How:** share the folder (or a ZIP of it) through **the course channel the instructor announces**. Name a ZIP `G<nn>_<ID>_CP-7_<YYYY-MM-DD>.zip` (CP-8, CP-9a … in the same way).
- **Never include** passwords, e-mail addresses, personal data, other people's data or uncropped account screenshots.
- Checkpoint sheets are **course process records, not marks**. Assessment information comes from the course coordinator.

*Week 7 student launch package · Artificial Intelligence in Logistics · studio kit exploratory variant draft V1 (review candidate, based on V1.2) · 2026-11-08. Templates and guidance only — no answers, no marks.*
