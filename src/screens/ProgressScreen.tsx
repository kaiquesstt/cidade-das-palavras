
import { districts } from "../data/districts";
import { useGameStore } from "../store/useGameStore";
import type { MasteryStage } from "../types";

const stages: Array<{ key: MasteryStage; label: string }> = [
  { key: "recognize", label: "Reconhecer" },
  { key: "explain", label: "Explicar" },
  { key: "apply", label: "Aplicar" },
  { key: "produce", label: "Produzir" }
];

export function ProgressScreen() {
  const progress = useGameStore((s) => s.progress);
  const mastery = useGameStore((s) => s.mastery);

  return (
    <main className="content-screen">
      <header className="screen-heading">
        <span className="eyebrow">MEU PROGRESSO</span>
        <h1>Domínio por conteúdo</h1>
        <p>O jogo separa reconhecer, explicar, aplicar e produzir para não confundir acerto com aprendizagem completa.</p>
      </header>

      <div className="progress-list">
        {districts.map((district) => (
          <article className="progress-row" key={district.key}>
            <div className="progress-title">
              <span className="progress-symbol" style={{ background: district.color }}>{district.icon}</span>
              <div>
                <h2>{district.label}</h2>
                <small>{district.note}</small>
              </div>
            </div>
            <div className="mastery-stages">
              {stages.map((stage) => (
                <span
                  key={stage.key}
                  className={mastery[district.key][stage.key] ? "mastery-stage complete" : "mastery-stage"}
                >
                  {mastery[district.key][stage.key] ? "✓" : "○"} {stage.label}
                </span>
              ))}
            </div>
            <div className="progress-number">{progress[district.key]}%</div>
          </article>
        ))}
      </div>
    </main>
  );
}
