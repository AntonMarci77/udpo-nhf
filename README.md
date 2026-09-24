# ÚDPO II - stránka pre študentov NHF (ZS 2026/2027)

Statická stránka, žiadny build nie je potrebný. Otvorí sa aj priamo z disku (index.html).

Obsah:
- index.html      úvod do predmetu (hodnotenie, harmonogram, ako prebieha cvičenie, odkazy na zákony)
- prednaska.html  prednáška 1 (24 slidov, ovládanie šípkami, tlačidlo "Všetky slidy" na tlač)
- tahak.html      ťahák: prečo vznikajú PP a OP, tabuľka prípadov s odkazmi na slov-lex, Advers riadok po riadku
- zadania.html    zadania Kaviareň a Advers (NHF verzia) + návod na aplikáciu
- zadania/*.csv   CSV zadaní a riešení (načítajú sa v appke cez Zadania alebo "CSV z internetu")
- app/index.html  IUP 2 NHF - zbuildovaná aplikácia (jeden súbor, funguje offline)
- app-src/        zdrojový kód aplikácie (Vite + React); npm install, npm run build -> dist/index.html, skopírovať do app/

Nasadenie na Vercel:
1. Tento priečinok nahrať na GitHub ako nový repozitár (napr. udpo-nhf). Priečinok app-src/node_modules nikdy nevznikne, ak sa build robí mimo neho; ak áno, pridať do .gitignore.
2. Vercel -> Add New Project -> Import z GitHubu -> Framework Preset: Other, Build Command prázdny, Output Directory prázdny (koreň).
3. Deploy. Adresa bude napr. https://udpo-nhf.vercel.app, appka na /app/, ťahák na /tahak.html.

Zmena v aplikácii: upraviť app-src/src/..., spustiť npm run build v app-src, skopírovať app-src/dist/index.html do app/index.html, push.
Nové zadanie: CSV do app-src/src/zadania/ + záznam v app-src/src/zadania/index.js (a kópia CSV do zadania/ pre stiahnutie).
