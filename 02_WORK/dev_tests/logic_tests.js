const fs=require('fs');const vm=require('vm');
const html=fs.readFileSync(process.argv[2],'utf8');
const code=html.split('// LOGIC-START')[1].replace(/^[^\n]*/,'').split('// LOGIC-END')[0];
const ctx={};vm.createContext(ctx);vm.runInContext(code+';this.f={parseCSV,csvToRecords,parseMemoFile,normaliseName,matchMemo,checkExtraction,buildCoverage,memoNumberGaps,squash,classifyFile};',ctx);
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
