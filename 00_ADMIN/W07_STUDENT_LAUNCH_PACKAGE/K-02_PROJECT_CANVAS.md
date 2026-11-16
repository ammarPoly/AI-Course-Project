# K-02 — Project canvas (one page)

One or two lines per field. **Bold fields are the course's launch canvas — fill them first.** Save as `G<nn>_<ID>_canvas_v01_<date>.md` in `00_ADMIN/`.

| # | Field | Six-question link | Our entry |
|-------|---------------------------------|---------------|----------------------|
| 1 | Project, variant, group, members |  | |
| 2 | **The problem in one sentence** — who has it, what goes wrong today | Q1 What problem | |
| 3 | **What goes in** — the pack sources, and which file is the source of truth for what | Q2 What data, from where | |
| 4 | **What comes out** — the inspectable output(s), and how a stranger could check them | Q5 What evidence | |
| 5 | What kind of system this is (rules tool · extraction · drafting · forecast · aggregation) and what that kind gets wrong | Q3 What type of system | |
| 6 | **How we will build it** — the form of our prototype (for example a workbook, a web page, a script, a repeatable Claude workflow, or a mix), which tool does which step, which steps need a person, and why — and what we will deliberately not use | Q3 What type of system | |
| 7 | **The trap we will demonstrate** — Week 7: the kind of problem the brief warns about and where you will look; Week 8: the one you found, with its evidence | Q3 / Q5 | |
| 8 | The refusal or limit you will show | Q3 | |
| 9 | **Where the human is** — the decision your tool must not make | Q4 Where is the human | |
| 10 | How you will know it works — tests and the independent check | Q5 | |
| 11 | **Industrial-gap headline** — what it would take to be real | Q6 What would it take here | |
| 12 | First working slice — input → output, owner |  | |
| 13 | Extension idea (draft; agreed at Week 8) |  | |
| 14 | Risks and fallbacks (usage, accounts, devices, absences) |  | |

**Instructor initial (Week 7 canvas block):** ☐ READY TO BUILD ☐ REWORK FIELD ___ — a consult outcome, not a mark.

## Decision log (keep it from Week 7 to Week 10)
Add one line whenever your group makes or changes a design decision: a tool, the form of the prototype, a rule moved from AI to a formula or code, a step given to a person. These lines are what you explain and defend at the showcase.

| Date | Decision | Options we considered | Why we chose this | Evidence (test ID or file) | Help level used (none, 1, 2, 3) |
|------|------|------|------|------|------|
| | | | | | |
| | | | | | |
| | | | | | |

## How to fill it — a worked example from an invented project
*The example below is about an invented "dock-door booking checker" that is **not** one of the ten projects, so it gives nothing away about your pack.*

| Field | Weak entry | Better entry |
|---------------|-------------------|-------------------------------------------|
| 2 Problem | "An AI tool for bookings." | "Planners double-book dock doors because bookings arrive by e-mail and nobody checks them against the door schedule." |
| 4 What comes out | "A dashboard." | "A clash table: each booking, the door and slot it asks for, CLASH or CLEAR, and the schedule row that decides it — a stranger can check any line against the schedule." |
| 6 How we will build it | "Claude." | "A workbook: Claude helps us write the formulas that apply the schedule rules; the bookings are pasted in as rows; a person moves the trucks. We chose a workbook because every result must be checkable by the shift planner. No live booking system." |
| 9 Where the human is | "The AI decides." | "The tool flags clashes; the shift planner decides which booking moves. The tool never reschedules a truck." |
| 12 First slice | "Build the checker." | "Booking 1: the tester writes the expected result from the schedule first, then the tool checks it; one test line — owners: tester and build lead." |

**Common reasons for "rework":** the problem is a feature list · "what comes out" cannot be checked by a stranger · the human is missing or vague · the first slice is the whole project · field 6 lists tools without saying which step each does, or describes something that cannot take a new input.

*Week 7 student launch package · Artificial Intelligence in Logistics · studio kit exploratory variant draft V1 (review candidate, based on V1.2) · 2026-11-08. Templates and guidance only — no answers, no marks.*
