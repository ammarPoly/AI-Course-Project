# Six answers: Group 5, C5-A Supplier Risk Control Tower (draft v01)

Drafted 2026-11-23 from `00_ADMIN/G05_C5-A_canvas_v01_2026-11-18.md` only. We'll update it as the tool gets built.

**1) What problem?**
Brightkeel's category director can't easily see which suppliers are a single point of failure, which contracts leave the company exposed, and which suppliers were never assessed. The evidence is scattered across a master list, an assessment log and 24 memos that different buyers wrote over two years.

**2) What data, from where?**
We use four sources from the pack, and nothing else counts. `SUPPLIER_MASTER.csv` tells us which suppliers are approved and their part families. `ASSESSMENT_LOG.csv` tells us whether a supplier was assessed. The 24 memos are the only source for indemnity positions and for a supplier losing qualification, and the rule card `RISK_RULES_RR-C5` decides every flag and status.

**3) What type of system?**
It's a rules tool with an extraction step, built as one offline web page that needs no internet, install or API key. Claude only reads the memos and pulls out exact quotations. The page's code then checks those quotations word for word and applies the RR-C5 rules the same way every run. AI never decides flags or status.

**4) Where is the human?**
The tool only shows the risk. The category director and buyers decide what to do about it: find a second source, renegotiate an indemnity cap, schedule an assessment or accept the risk. Those decisions involve cost, contracts and supplier relationships the pack doesn't cover, so the tool never makes them and never changes a supplier's approval status.

**5) What evidence?**
Every flag links to the exact memo sentence or file row it rests on, so anyone can click it and check it in the original file. We write expected results with their RR-C5 clause in `C5_TEST_RECORD` before every run, check coverage for all 26 suppliers in Excel, and a second member traces at least five flags from quotation to memo in a fresh chat. Each memo batch also lists back the memo IDs it read, so a skipped memo is visible.

**6) What would it take to be a real system?**
A real system would read the actual contracts from a contract system and live assessment data from the ERP instead of memos. It would also need access control and an audit trail, legal review of the indemnity wording, and a named owner for keeping supplier names consistent.
