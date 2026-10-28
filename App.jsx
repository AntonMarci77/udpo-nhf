import { useEffect, useMemo, useState } from "react";
import { BookOpenText, Table2, Landmark, Calculator, ListTree, Printer, Settings2, RotateCcw, GraduationCap, ClipboardList, ExternalLink } from "lucide-react";
import { CHARTS, CHART_ORDER, buildCustomChart } from "./data/charts.js";
import { useStored, DEFAULT_TAX, DEFAULT_SETTINGS, clearAllStored } from "./lib/store.js";
import { buildLedger, statements, computeTax } from "./lib/ledger.js";
import { emptyEntry } from "./lib/csv.js";
import { fmt } from "./lib/format.js";
import { Journal, PresetsDatalist, Modal } from "./components/Journal.jsx";
import { TAccounts } from "./components/TAccounts.jsx";
import { Statements } from "./components/Statements.jsx";
import { TaxCalc } from "./components/TaxCalc.jsx";
import { ChartBrowser } from "./components/ChartBrowser.jsx";
import { TestZone } from "./components/TestZone.jsx";
import { DppoGuide } from "./components/DppoGuide.jsx";
import { DPPO_FORM } from "./data/dppoSteps.js";

const TABS = [
  { id: "dennik", label: "Denník", icon: BookOpenText },
  { id: "tucty", label: "T-účty", icon: Table2 },
  { id: "vykazy", label: "Výkazy", icon: Landmark },
  { id: "dan", label: "Daň z príjmov", icon: Calculator },
  { id: "dppo", label: "Postup DPPO", icon: ClipboardList },
  { id: "test", label: "Testovacia zóna", icon: GraduationCap },
  { id: "osnova", label: "Účtová osnova", icon: ListTree },
];

function tabFromHash() {
  const h = (location.hash || "").replace("#", "");
  return TABS.some((t) => t.id === h) ? h : "dennik";
}

export default function App() {
  const [tab, setTab] = useState(tabFromHash);
  const [chartKey, setChartKey] = useStored("chart", "zaklad");
  const [customRows, setCustomRows] = useStored("customChart", []);
  const [entries, setEntries] = useStored("entries", [emptyEntry(1)]);
  const [tax, setTax] = useStored("tax", DEFAULT_TAX);
  const [settings, setSettings] = useStored("settings", DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(id) {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
  }

  const chart = useMemo(() => {
    if (chartKey === "vlastna" && customRows?.length) return buildCustomChart(customRows);
    return CHARTS[chartKey] || CHARTS.zaklad;
  }, [chartKey, customRows]);

  const ledger = useMemo(() => buildLedger(entries, chart), [entries, chart]);
  const st = useMemo(() => statements(ledger, chart), [ledger, chart]);
  const t = useMemo(() => computeTax(ledger, entries, chart, tax), [ledger, entries, chart, tax]);
  const posted = ledger.length > 0;

  function resetAll() {
    if (!confirm("Vymazať denník, kalkuláciu dane aj nastavenia uložené v tomto prehliadači?")) return;
    clearAllStored();
    location.reload();
  }

  const summary = posted ? (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 text-sm">
      <Stat label="Výnosy" value={t.vynosy} />
      <Stat label="VH pred zdanením" value={t.vhPred} accent={t.vhPred >= 0 ? "text-moss" : "text-brick"} />
      <Stat label="Základ dane (r. 400)" value={t.zd} hint={`+ PP ${fmt(t.pp)} / - OP ${fmt(t.op)}`} />
      <Stat label={`Daň ${t.sadzba} %`} value={t.celkovaDan} hint={t.minDan > t.dan ? "minimálna daň" : `min. daň ${fmt(t.minDan)}`} />
      <Stat label={st.balanced ? "Súvaha vyrovnaná" : "Súvaha nevyrovnaná"} value={st.sumAkt} accent={st.balanced ? "text-moss" : "text-brick"} hint="aktíva spolu" onClick={() => go("vykazy")} />
    </div>
  ) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <PresetsDatalist />
      <header className="sticky top-0 z-20 bg-white border-b border-line no-print">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-5 h-14 flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-moss text-white grid place-items-center font-bold text-sm">ÚČ</span>
            <div className="leading-tight">
              <div className="font-semibold">IUP 2 <span className="text-moss">NHF</span></div>
              <div className="text-[10px] text-muted hidden sm:block">účtovníctvo v základných kategóriách</div>
            </div>
          </div>
          <nav className="flex items-center gap-0.5 overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => go(id)} className={`px-3 py-1.5 rounded-md text-sm inline-flex items-center gap-1.5 whitespace-nowrap ${tab === id ? "bg-moss-light text-moss font-medium" : "text-ink/80 hover:bg-paper"}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </nav>
          <span className="flex-1" />
          <a className="btn py-1 text-xs whitespace-nowrap" href={DPPO_FORM} target="_blank" rel="noopener" title="Formulár DPPO 2025 na portáli finančnej správy"><ExternalLink size={14} /> <span className="hidden 2xl:inline">DPPO formulár</span></a>
          <select className="field w-auto max-w-[14rem] text-xs py-1" value={chartKey} onChange={(e) => setChartKey(e.target.value)} title="Účtová osnova">
            {CHART_ORDER.map((k) => CHARTS[k]).map((c) => <option key={c.id} value={c.id}>{c.short}</option>)}
            {customRows?.length > 0 && <option value="vlastna">Vlastná (import)</option>}
          </select>
          <button className="btn py-1" title="Tlač / PDF" onClick={() => window.print()}><Printer size={15} /></button>
          <button className="btn py-1" title="Nastavenia" onClick={() => setShowSettings(true)}><Settings2 size={15} /></button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 py-4 flex-1">
        <div className="hidden print:block mb-3 text-sm">
          <strong>{settings.company || "Účtovná jednotka"}</strong> - {TABS.find((x) => x.id === tab)?.label}, rok {settings.year}, osnova: {chart.short}
        </div>
        {tab === "dennik" && <Journal entries={entries} setEntries={setEntries} chart={chart} setChartKey={setChartKey} settings={settings} setSettings={setSettings} summary={summary} />}
        {tab === "tucty" && <TAccounts ledger={ledger} compact={settings.compact} />}
        {tab === "vykazy" && <Statements st={st} chart={chart} year={settings.year} />}
        {tab === "dan" && <TaxCalc t={t} tax={tax} setTax={setTax} entries={entries} setEntries={setEntries} chart={chart} year={settings.year} ledgerEmpty={!posted} />}
        {tab === "dppo" && <DppoGuide />}
        {tab === "test" && <TestZone />}
        {tab === "osnova" && <ChartBrowser chart={chart} chartKey={chartKey} setChartKey={setChartKey} customRows={customRows} setCustomRows={setCustomRows} />}
      </main>

      <footer className="border-t border-line bg-white text-[11px] text-muted no-print">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-5 py-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>IUP 2 · Účtovníctvo a dane právnických osôb · KÚA FHI EU v Bratislave · Anton Marci</span>
          <span>Údaje sa ukladajú len v tomto prehliadači (localStorage); denník si uložte cez „Stiahnuť CSV“.</span>
          <span className="ml-auto">© {new Date().getFullYear()} NIVEN OÜ</span>
        </div>
      </footer>

      {showSettings && (
        <Modal title="Nastavenia" onClose={() => setShowSettings(false)}>
          <div className="space-y-3 text-sm">
            <label className="block">
              <span className="text-xs text-muted">Účtovná jednotka (do hlavičky tlače)</span>
              <input className="field" value={settings.company} onChange={(e) => setSettings((s) => ({ ...s, company: e.target.value }))} placeholder="napr. Advers s. r. o." />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Účtovné a zdaňovacie obdobie (rok) - dopĺňa sa do dátumov bez roka a do výkazov</span>
              <input className="field w-32 num" value={settings.year} onChange={(e) => setSettings((s) => ({ ...s, year: parseInt(e.target.value, 10) || s.year }))} />
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.showTaxCols} onChange={(e) => setSettings((s) => ({ ...s, showTaxCols: e.target.checked }))} /> zobrazovať daňové stĺpce PP / OP / § v denníku
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={settings.compact} onChange={(e) => setSettings((s) => ({ ...s, compact: e.target.checked }))} /> T-účty bez textov účtovných prípadov (kompaktné)
            </label>
            <div className="border-t border-line pt-3">
              <button className="btn-danger" onClick={resetAll}><RotateCcw size={15} /> Vymazať všetko uložené v prehliadači</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Stat({ label, value, hint, accent = "", onClick }) {
  return (
    <div className={`card px-3 py-2 ${onClick ? "cursor-pointer hover:border-moss" : ""}`} onClick={onClick}>
      <div className="text-[11px] text-muted">{label}</div>
      <div className={`num font-semibold ${accent}`}>{fmt(value)} €</div>
      {hint && <div className="text-[10px] text-muted truncate">{hint}</div>}
    </div>
  );
}
