// Postup vyplnenia DPPO 2025 (generované z dppo_steps.py - rovnaký obsah ako dppo.html)
export const DPPO_FORM = "https://pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.622.html";
export const DPPO_POUCENIE = "https://pfseform.financnasprava.sk/Formulare/Poucenia/DPPOv25-poucenie.pdf";
export const DPPO_STEPS = [
 {
  "t": "Príprava",
  "r": "-",
  "x": "Otvorte formulár DPPO 2025 na portáli finančnej správy. Ak máte zo cvičenia XML súbor, načítajte ho - identifikačné údaje aj hotové riadky sa vyplnia samy. Pripravte si výkaz ziskov a strát (výnosy, náklady) a zoznam PP a OP z denníka (v aplikácii karta Daň z príjmov).",
  "tip": "Formulár sa dá vypĺňať aj bez prihlásenia; na cvičení ho na konci len skontrolujeme, nepodávame."
 },
 {
  "t": "Hlavička a I. časť",
  "r": "01 až 12",
  "x": "Druh priznania (riadne), zdaňovacie obdobie 01.01.2025 až 31.12.2025, DIČ, IČO, právna forma, SK NACE, obchodné meno a sídlo. Zaškrtávacie políčka (napr. mikrodaňovník) podľa zadania.",
  "tip": "Údaje sú v zadaní. Pri importe XML túto časť preskočíme."
 },
 {
  "t": "Tabuľka F",
  "r": "tab. F r. 1 až 3",
  "x": "Začíname tu: r. 1 výnosy spolu, r. 2 náklady spolu (bez splatnej dane z príjmov), r. 3 výsledok hospodárenia = r. 1 - r. 2.",
  "tip": "Z tabuľky F sa berie r. 100 aj r. 560."
 },
 {
  "t": "Výsledok hospodárenia",
  "r": "r. 100",
  "x": "Výsledok hospodárenia pred zdanením - rovnaké číslo ako tab. F r. 3 (zisk so znamienkom +, strata so znamienkom -).",
  "tip": ""
 },
 {
  "t": "Nedaňové náklady",
  "r": "tab. A → r. 130",
  "x": "Náklady, ktoré nie sú daňovými výdavkami (§ 21 ZDP): reprezentácia, pokuty, opravná položka nad daňový limit, rezerva, ktorá nie je daňová, a pod. Každú na svoj riadok tabuľky A, súčet (r. 17) sa prenesie do r. 130.",
  "tip": "PP = pripočítateľná položka. Opravná položka k pohľadávke je účtovný zápis N / OM - nie to isté."
 },
 {
  "t": "Ďalšie PP",
  "r": "r. 140 až 180, r. 200",
  "x": "r. 140: náklady, ktoré sú daňové až po zaplatení a do 31. 12. zaplatené neboli (§ 17 ods. 19 - nájomné, licencie, provízie, poradenstvo). r. 180: ostatné PP, napr. záväzok viac ako 360 dní po splatnosti (§ 17 ods. 27). r. 200 = súčet r. 130 až 180.",
  "tip": "Riadky s r. 180 vysvetlite vo VIII. časti."
 },
 {
  "t": "OP",
  "r": "r. 210 až 290, r. 300",
  "x": "r. 210: výnosy, ktoré nie sú predmetom dane (napr. podiel na zisku od inej firmy). r. 270: zaplatené v tomto roku to, čo bolo minulý rok PP podľa § 17 ods. 19. r. 290: ostatné OP, napr. použitie alebo zrušenie nedaňovej rezervy (§ 17 ods. 23), zaplatený záväzok, o ktorý sa základ dane predtým zvýšil (§ 17 ods. 32). r. 300 = súčet.",
  "tip": "OP = odpočítateľná položka."
 },
 {
  "t": "Základ dane",
  "r": "r. 301 až 400",
  "x": "r. 100 + r. 200 - r. 300. Ak firma nemá osobitné položky, r. 301, 310 a 400 sú rovnaké. Záporná suma v r. 400 je daňová strata.",
  "tip": ""
 },
 {
  "t": "Odpočet straty",
  "r": "tab. D → r. 410, r. 500, 510",
  "x": "Strata sa odpočíta najviac 5 rokov po roku vzniku, najviac 50 % základu dane z r. 400 pre každú stratu (mikrodaňovník 100 %). Tabuľka D: r. 1 vykázaná strata, r. 2 odpočet teraz, r. 3 zostatok. r. 500 = r. 400 - r. 410.",
  "tip": "Strata za bežný rok sa do tabuľky D píše až o rok."
 },
 {
  "t": "Zdaniteľné výnosy a sadzba",
  "r": "r. 560, potom r. 550",
  "x": "r. 560: výnosy z tab. F r. 1 bez výnosov, ktoré nie sú predmetom dane alebo sú oslobodené (napr. bez podielov na zisku). Sadzba za rok 2025: do 100 000 € 10 %, nad 100 000 € 21 %, nad 5 000 000 € 24 %.",
  "tip": "Najprv r. 560, až potom sadzba - z r. 560 sa určuje."
 },
 {
  "t": "Daň",
  "r": "r. 600, 610, 700",
  "x": "r. 600 = r. 510 x sadzba. r. 610 úľavy (na cvičeniach zvyčajne 0). r. 700 = r. 600 - r. 610.",
  "tip": ""
 },
 {
  "t": "Daň zo zahraničia",
  "r": "tab. E → r. 710",
  "x": "Len ak firma mala príjmy zo zahraničia, z ktorých jej v cudzine zrazili daň: r. 1 základ dane, r. 2 základ dane zo zahraničia (príjmy - súvisiace daňové výdavky), r. 3 podiel v %, r. 4 strop, r. 8 zahraničná daň podľa zmluvy, r. 10 nižšia suma → r. 710.",
  "tip": "Rozpis podľa štátov patrí do VIII. časti."
 },
 {
  "t": "Minimálna daň",
  "r": "r. 800, 810 až 830",
  "x": "r. 800 = r. 700 - r. 710. r. 810 minimálna daň podľa zdaniteľných výnosov (do 50 000 € 340 €, do 250 000 € 960 €, do 500 000 € 1 920 €, nad 500 000 € 3 840 €). Ak r. 810 > r. 800, vyplní sa r. 820 a r. 830 (rozdiel na zápočet v ďalších 3 rokoch).",
  "tip": "r. 910 až 1000 a tabuľka K len pri zápočte minimálnej dane z minulých rokov."
 },
 {
  "t": "Preddavky a daň na úhradu",
  "r": "r. 1010, 1040, 1050, 1080, 1100 / 1101",
  "x": "r. 1010 a 1040 zaplatené preddavky za rok 2025, r. 1050 a 1080 daň (alebo minimálna daň), r. 1100 daň na úhradu (+), r. 1101 preplatok (-).",
  "tip": "Doplatok za minulý rok nie je preddavok."
 },
 {
  "t": "Preddavky na budúci rok",
  "r": "r. 1110",
  "x": "r. 500 x sadzba - r. 610 (bez zápočtu zahraničnej dane a minimálnej dane). Nad 16 600 € mesačné preddavky 1/12, nad 5 000 € štvrťročné 1/4.",
  "tip": ""
 },
 {
  "t": "Koniec priznania",
  "r": "VIII. a VII. časť",
  "x": "VIII. časť: vysvetlenia (r. 180, r. 290, rozpis tabuľky E). VII. časť: 2 % (3 %) zaplatenej dane, ak ich firma chce poukázať. Oprávnená osoba, dátum, kontrola formulára (chyby sú označené pri riadkoch) a uloženie XML.",
  "tip": ""
 }
];
