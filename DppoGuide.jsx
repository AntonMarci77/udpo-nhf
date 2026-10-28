import { ExternalLink, FileText } from "lucide-react";
import { DPPO_FORM, DPPO_POUCENIE, DPPO_STEPS } from "../data/dppoSteps.js";

// Karta „Postup DPPO“: poradie vypĺňania priznania DPPO 2025 riadok po riadku.
export function DppoGuide() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[16rem]">
          <h2 className="text-lg font-semibold">Postup vyplnenia DPPO 2025</h2>
          <p className="text-sm text-muted">Poradie, v akom ideme na cvičení. Čísla riadkov sú z tlačiva DPPO za rok 2025; sumy PP a OP nájdete v aplikácii na karte Daň z príjmov.</p>
        </div>
        <a className="btn-primary" href={DPPO_FORM} target="_blank" rel="noopener"><ExternalLink size={15} /> Formulár DPPO 2025</a>
        <a className="btn" href={DPPO_POUCENIE} target="_blank" rel="noopener"><FileText size={15} /> Poučenie</a>
      </div>
      <ol className="space-y-2">
        {DPPO_STEPS.map((s, i) => (
          <li key={i} className="card p-3 grid grid-cols-[2.25rem_1fr] gap-3">
            <span className="w-8 h-8 rounded-full bg-moss text-white grid place-items-center font-bold text-sm">{i + 1}</span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-semibold">{s.t}</span>
                {s.r !== "-" && <span className="text-xs font-medium text-moss bg-moss-light rounded px-1.5 py-0.5">{s.r}</span>}
              </div>
              <p className="text-sm mt-1">{s.x}</p>
              {s.tip && <p className="text-xs text-muted mt-1">{s.tip}</p>}
            </div>
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted">Podrobnosti ku každému riadku: poučenie finančnej správy k tlačivu DPPOv25. Postup je aj na stránke predmetu (Postup DPPO) na vytlačenie.</p>
    </div>
  );
}
