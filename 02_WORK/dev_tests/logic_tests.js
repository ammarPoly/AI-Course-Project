const fs=require('fs');const vm=require('vm');
const html=fs.readFileSync(process.argv[2],'utf8');
const code=html.split('// LOGIC-START')[1].replace(/^[^\n]*/,'').split('// LOGIC-END')[0];
const ctx={};vm.createContext(ctx);vm.runInContext(code+';this.f={parseCSV,csvToRecords,parseMemoFile,normaliseName,matchMemo,checkExtraction,buildCoverage,memoNumberGaps,squash,classifyFile,familyKey,resolveFamily,aboutHeaderSupplier,readCap,buildScorecard,scorecardTable};',ctx);
const f=ctx.f;let fails=0;const eq=(a,b,m)=>{const ok=JSON.stringify(a)===JSON.stringify(b);if(!ok){fails++;console.log('FAIL',m,'\n got',JSON.stringify(a),'\n want',JSON.stringify(b));}else console.log('ok  ',m);};
// made-up suppliers only
eq(f.normaliseName("Zephyr Valve Co.").key,"zephyr valve","suffix Co. removed after full stop");
eq(f.normaliseName("ZEPHYR VALVES W.L.L.").key,"zephyr valve","case, W.L.L., plural s");
eq(f.normaliseName("Quill & Sons (Bahrain) Ltd").key,"quill sons bahrain","plural s only on the LAST word");
eq(f.normaliseName("Nordal-Fittings FZE").key,"nordal fitting","hyphen to space, FZE");
eq(f.normaliseName("Company Corp").key,"corp","suffix removed wherever it appears");
eq(f.normaliseName("Zephyr Valv").key,"zephyr valv","no s, unchanged");
eq(f.normaliseName("Co.").key,"","only a suffix");
const master=f.csvToRecords("supplier_id,supplier_name,part_families,approval_status,spend_band\nX-1,Zephyr Valve Co.,valves,APPROVED,A\nX-2,\"Quill, Hart & Co\",seals; gaskets,APPROVED,B\nX-3,Zephyr Valves LLC,valves,APPROVED,C\nX-4,Orrin Pumps WLL,pumps,APPROVED,A\n").records;
eq(master.length,4,"master rows"); eq(master[1].supplier_name,"Quill, Hart & Co","quoted comma field"); eq(master[1]._line,3,"line numbers");
const memoTxt="# BATCH header\n\nintro\n\n# MEMO-03 — t\n\n**Date:** 2025-01-02 · **Author:** B · **Supplier (as written):** Orrin Pumps · **Company:** X W.L.L.\n\nOrrin has no indemnity clause.\n\n---\n*footer*\n# MEMO-05 — t\n\n**Date:** 2025-02-02 · **Author:** B · **Supplier (as written):** Zephyr Valve · **Company:** X\n\nText line one\nsplit over lines.\n\n---\n*f*\n# MEMO-06 — t\n\n**Date:** 2025-03-02 · **Author:** B · **Supplier (as written):** Orin Pumps · **Company:** X\n\nBody.\n";
const memos=f.parseMemoFile(memoTxt,"b.md");
eq(memos.map(m=>[m.id,m.date,m.supplierAsWritten]),[["MEMO-03","2025-01-02","Orrin Pumps"],["MEMO-05","2025-02-02","Zephyr Valve"],["MEMO-06","2025-03-02","Orin Pumps"]],"batch split + headers");
eq(memos[0].text.includes("footer"),false,"footer removed");
const m={};memos.forEach(x=>m[x.id]=f.matchMemo(x,master));
eq([m["MEMO-03"].status,m["MEMO-03"].supplierId],["MATCH","X-4"],"exact match");
eq(m["MEMO-05"].status,"CANNOT DETERMINE (match)","two masters identical -> ambiguous");
eq(m["MEMO-06"].status,"CANNOT DETERMINE (match)","spelling difference -> cannot determine");
const log=f.csvToRecords("supplier_id,last_assessment_date,result\nX-4,2025-05-01,PASS\n").records;
const cov=f.buildCoverage(master,log,memos,m);
eq(cov.map(r=>[r.supplier_id,r.memos,r.log_row]),[["X-1","NO MEMO","no"],["X-2","NO MEMO","no"],["X-3","NO MEMO","no"],["X-4","MEMO-03","yes"]],"coverage");
eq(cov[0].log_detail,"no row for X-1 in ASSESSMENT_LOG.csv (1 data rows, as of 2026-10-31)","absence scope");
const byId=Object.fromEntries(memos.map(x=>[x.id,x]));
const ex=f.csvToRecords('memo_id,memo_date,header_supplier_as_written,statement_about_as_written,topic,part_family,position,cap_bhd,quotation\nMEMO-03,2025-01-02,Orrin Pumps,Orrin Pumps,INDEMNITY,NOT STATED,NO CLAUSE,,"Orrin has no indemnity clause."\nMEMO-05,2025-02-02,Zephyr Valve,Zephyr Valve,NONE,,,,\nMEMO-05,x,x,x,INDEMNITY,,CAP,1,"Text line one split over lines."\nMEMO-03,x,x,x,INDEMNITY,,CAP,1,"Orrin has a cap."\nMEMO-09,x,x,x,INDEMNITY,,CAP,1,"x"\n').records;
eq(f.checkExtraction(ex,byId).map(r=>r.check.status),["VERIFIED","NONE ROW","VERIFIED","REJECTED","REJECTED"],"quote checks");
eq(f.memoNumberGaps(["MEMO-01","MEMO-03"]),["MEMO-02"],"gap finder");

// ---------- §4 flags, §5 contradictions, §6 status (all invented suppliers) ----------
eq(f.familyKey("Mechanical Seals"),"mechanical seal","family key plural");
eq(f.resolveFamily("seal",["mechanical seals"]).family,"mechanical seals","family word inside master family");
eq(f.resolveFamily("gasket range",["gaskets"]).family,"gaskets","master family inside memo words");
eq(f.resolveFamily("NOT STATED",["hoses"]).family,"hoses","not stated + one family");
eq(f.resolveFamily("NOT STATED",["motors","shafts"]).family,null,"not stated + two families -> not applied");
eq(f.resolveFamily("pumps",["valves"]).family,null,"no match -> not applied");
eq(f.aboutHeaderSupplier({statement_about_as_written:"Tidal"},{supplierAsWritten:"Tidal Seal Systems"},null),true,"short form of header supplier");
eq(f.aboutHeaderSupplier({statement_about_as_written:"Birch"},{supplierAsWritten:"Alder Pumps"},{supplier_name:"Alder Pumps WLL"}),false,"other supplier");
eq(f.readCap({cap_bhd:"50000",quotation:"capped at BHD 50,000."}).cap,50000,"cap read");
eq(f.readCap({cap_bhd:"30000",quotation:"capped at BHD 300,000."}).cap,null,"cap not in quotation -> refused");
const M2=f.csvToRecords(`supplier_id,supplier_name,part_families,approval_status,spend_band
X-01,Alder Pumps WLL,impellers,APPROVED,A
X-02,Birch Impellers Co.,impellers,APPROVED,A
X-03,Cedar Seals,seals; gaskets,APPROVED,A
X-04,Dune Gaskets LLC,gaskets,APPROVED,A
X-05,Elm Valves,valves,APPROVED,A
X-06,Fir Cables,cables,SUSPENDED,A
X-07,Gale Cables,cables,APPROVED,A
X-08,Hazel Bolts,bolts,APPROVED,A
X-09,Ivy Bolts,bolts,APPROVED,A
X-10,Kelp Hoses,hoses,APPROVED,A
`).records;
const L2=f.csvToRecords("supplier_id,last_assessment_date,result\nX-01,2025-01-01,PASS\nX-02,2025-01-01,PASS\nX-03,2025-01-01,PASS\nX-04,2025-01-01,PASS\nX-08,2025-01-01,PASS\nX-09,2025-01-01,PASS\nX-10,2025-01-01,PASS\n").records;
const memo=(id,date,sup,body)=>"# "+id+" — t\n\n**Date:** "+date+" · **Author:** B · **Supplier (as written):** "+sup+" · **Company:** X\n\n"+body+"\n\n---\n*f*\n";
const T2=[
 memo("MEMO-01","2025-01-10","Alder Pumps","Alder's indemnity is capped at BHD 50,000. Birch failed qualification for impellers. Alder assessment is planned."),
 memo("MEMO-02","2025-03-01","Birch Impellers","Birch failed qualification for impellers. Birch has no indemnity clause."),
 memo("MEMO-03","2025-06-01","Birch Impellers","Delivery was late."),
 memo("MEMO-04","2025-02-01","Cedar Seals","Cedar's cap is BHD 49,999."),
 memo("MEMO-05","2025-05-01","Cedar Seal","On liability, standard terms apply. Cedar is qualified for seals."),
 memo("MEMO-06","2025-04-01","Dune Gaskets","Dune is capped at BHD 200,000. Dune failed qualification for gaskets."),
 memo("MEMO-07","2025-07-01","Dune Gaskets","Dune has now passed qualification for gaskets."),
 memo("MEMO-08","2025-02-02","Elm Valve","Elm's cap is BHD 100,000."),
 memo("MEMO-09","2025-08-01","Elm Valves","The new Elm contract has no indemnity clause."),
 memo("MEMO-10","2025-03-03","Hazel Bolts","Hazel is capped at BHD 75,000."),
 memo("MEMO-11","2025-03-03","Kelp Hoses","Kelp must not be used."),
 memo("MEMO-12","2025-03-03","Alder Pump Systems","Alder Pump Systems has no indemnity clause."),
 memo("MEMO-13","2025-09-09","Hazel Bolts","Nothing about contracts.")
].join("");
const mm2=f.parseMemoFile(T2,"t.md");const by2=Object.fromEntries(mm2.map(x=>[x.id,x]));const ma2={};mm2.forEach(x=>ma2[x.id]=f.matchMemo(x,M2));
eq(ma2["MEMO-12"].status,"CANNOT DETERMINE (match)","invented unmatched memo");
const H="memo_id,memo_date,header_supplier_as_written,statement_about_as_written,topic,part_family,position,cap_bhd,quotation\n";
const E2=f.csvToRecords(H+[
 'MEMO-01,,,Alder,INDEMNITY,NOT STATED,CAP,50000,"Alder\'s indemnity is capped at BHD 50,000."',
 'MEMO-01,,,Birch,QUALIFICATION,impellers,FAILED,,"Birch failed qualification for impellers."',
 'MEMO-02,,,Birch,QUALIFICATION,impellers,FAILED,,"Birch failed qualification for impellers."',
 'MEMO-02,,,Birch,INDEMNITY,NOT STATED,NO CLAUSE,,"Birch has no indemnity clause."',
 'MEMO-03,,,,NONE,,,,',
 'MEMO-04,,,Cedar,INDEMNITY,NOT STATED,CAP,49999,"Cedar\'s cap is BHD 49,999."',
 'MEMO-05,,,NOT STATED,INDEMNITY,NOT STATED,STANDARD TERMS,,"On liability, standard terms apply."',
 'MEMO-05,,,Cedar,QUALIFICATION,seals,QUALIFIED,,"Cedar is qualified for seals."',
 'MEMO-06,,,Dune,INDEMNITY,NOT STATED,CAP,200000,"Dune is capped at BHD 200,000."',
 'MEMO-06,,,Dune,QUALIFICATION,gaskets,FAILED,,"Dune failed qualification for gaskets."',
 'MEMO-07,,,Dune,QUALIFICATION,gaskets,QUALIFIED,,"Dune has now passed qualification for gaskets."',
 'MEMO-08,,,Elm,INDEMNITY,NOT STATED,CAP,100000,"Elm\'s cap is BHD 100,000."',
 'MEMO-09,,,NOT STATED,INDEMNITY,NOT STATED,NO CLAUSE,,"The new Elm contract has no indemnity clause."',
 'MEMO-10,,,Hazel,INDEMNITY,NOT STATED,CAP,75000,"Hazel is capped at BHD 75,000."',
 'MEMO-10,,,Hazel,INDEMNITY,NOT STATED,CAP,1,"Hazel is capped at BHD 1."',
 'MEMO-11,,,Kelp,QUALIFICATION,NOT STATED,MUST NOT USE,,"Kelp must not be used."',
 'MEMO-12,,,Alder Pump Systems,INDEMNITY,NOT STATED,NO CLAUSE,,"Alder Pump Systems has no indemnity clause."'
].join("\n")+"\n").records;
const sc=f.buildScorecard(M2,L2,mm2,ma2,f.checkExtraction(E2,by2));
const R=Object.fromEntries(sc.rows.map(r=>[r.supplier_id,r]));
const got=id=>[R[id].ss.flag?"SS":"-",R[id].ind.result,R[id].na.flag?"NA":"-",R[id].status];
eq(got("X-01"),["SS","NO GAP","-","AMBER"],"Alder: cap exactly 50,000 = NO GAP (boundary); sole impeller source; side mention about Birch ignored; 'planned' is not an assessment but log row exists");
eq(got("X-02"),["-","GAP","-","AMBER"],"Birch: failed impellers; no clause = GAP; newer silent memo changes nothing");
eq(got("X-03"),["SS","GAP","-","RED"],"Cedar: 49,999 = GAP; newer 'standard terms' is not a position; sole seals source -> RED");
eq(got("X-04"),["-","NO GAP","-","GREEN"],"Dune: newer QUALIFIED overrides older FAILED -> gaskets has 2 qualified");
eq(got("X-05"),["SS","GAP","NA","RED"],"Elm: newer NO CLAUSE governs over older 100,000 cap; never assessed");
eq(got("X-06"),["-","CANNOT DETERMINE","-","CANNOT DETERMINE"],"Fir: not approved, not counted");
eq(R["X-06"].na.text.startsWith("NOT APPLICABLE"),true,"Fir never-assessed not applicable");
eq(got("X-07"),["SS","CANNOT DETERMINE","NA","RED"],"Gale: no memo, never assessed, only approved cables supplier");
eq(got("X-08"),["-","NO GAP","-","GREEN"],"Hazel: bad cap row refused, other row NO GAP; newer silent memo ignored");
eq(got("X-09"),["-","CANNOT DETERMINE","-","CANNOT DETERMINE"],"Ivy: no memo -> indemnity CANNOT DETERMINE");
eq(got("X-10"),["-","CANNOT DETERMINE","-","CANNOT DETERMINE"],"Kelp: must not use, family not stated but only one");
eq(sc.famFindings.map(F=>F.family),["hoses"],"hoses has no qualified supplier: a finding, not a flag");
eq(sc.contradictions.map(c=>c.supplier_id+" "+c.topic).sort(),["X-04 QUALIFICATION","X-05 INDEMNITY"],"contradictions found");
eq(sc.contradictions.find(c=>c.supplier_id==="X-05").governing.memo_id,"MEMO-09","newer memo governs");
eq(R["X-09"].ind.evidence.includes("NO MEMO"),true,"absence states scope");
eq(R["X-07"].na.evidence.includes("7 data rows, as of 2026-10-31"),true,"never assessed states scope");
eq(sc.notUsed.some(n=>n.memo_id==="MEMO-01"&&n.why.includes("header supplier")),true,"side mention listed as not used");
eq(sc.notUsed.some(n=>n.memo_id==="MEMO-12"&&n.why.includes("CANNOT DETERMINE (match)")),true,"unmatched memo not used");
eq(sc.unextracted,["MEMO-13"],"memo with no extraction rows reported");
eq(f.scorecardTable(sc).length,11,"template export: header + one row per supplier");
eq(f.scorecardTable(sc)[0].length,11,"template columns");
console.log(fails?fails+' FAILED':'ALL PASSED');
// real pack: parse only, print counts, no matching results
const dir=process.argv[3];const all=[];for(const fn of fs.readdirSync(dir+'/MEMOS'))all.push(...f.parseMemoFile(fs.readFileSync(dir+'/MEMOS/'+fn,'utf8'),fn));
const b=[];for(const n of [1,2,3])b.push(...f.parseMemoFile(fs.readFileSync(dir+'/MEMOS_BATCH_'+n+'.md','utf8'),'B'+n));
console.log('real pack parse: single files',all.length,'with id+date+supplier',all.filter(x=>x.id&&x.date&&x.supplierAsWritten).length,'| batch memos',b.length,'| batch text same as single files',b.every(x=>{const s=all.find(y=>y.id===x.id);return s&&f.squash(s.text)===f.squash(x.text)}));
console.log('master rows',f.csvToRecords(fs.readFileSync(dir+'/SUPPLIER_MASTER.csv','utf8')).records.length,'log rows',f.csvToRecords(fs.readFileSync(dir+'/ASSESSMENT_LOG.csv','utf8')).records.length);
// file type detection (made-up files)
const cf=f.classifyFile; let bad=0;
[[cf("a.csv","supplier_id,supplier_name,part_families,approval_status,spend_band\n"),"master"],
 [cf("b.csv","﻿supplier_id,last_assessment_date,result\nX,1,P"),"log"],
 [cf("c.csv","memo_id,memo_date,header_supplier_as_written,statement_about_as_written,topic,part_family,position,cap_bhd,quotation\n"),"extraction"],
 [cf("d.csv","supplier_id,supplier_name,part_families,single_source (Y/N)\n"),"unknown"],
 [cf("e.md","# MEMO-07 — x\n\n**Date:** 2025-01-01 · **Supplier (as written):** Y\n"),"memos"],
 [cf("f.md","# Some notes\nMEMO-07 is mentioned here"),"unknown"],
 [cf("g.pdf","x"),"unknown"]].forEach(([g,w],i)=>{if(g!==w){bad++;console.log("FAIL classify",i,g,w)}});
console.log(bad?"classify FAILED":"classify ok");
