
import { TeacherGuide } from "../components/TeacherGuide";
import { districtByKey } from "../data/districts";
import { useGameStore } from "../store/useGameStore";

export function MissionBriefing() {
  const selected = useGameStore((s) => s.selectedDistrict);
  const setActiveView = useGameStore((s) => s.setActiveView);
  const mastery = useGameStore((s) => s.mastery);

  if (!selected) {
    return (
      <main className="content-screen">
        <h1>Nenhuma missão selecionada.</h1>
        <button type="button" className="primary-action" onClick={() => setActiveView("map")}>
          Voltar ao mapa
        </button>
      </main>
    );
  }

  const district = districtByKey[selected];
  const status = mastery[selected];

  return (
    <main className="mission-briefing-layout">
      <TeacherGuide />
      <section className="briefing-panel" style={{ "--district-color": district.color } as React.CSSProperties}>
        <button type="button" className="back-link" onClick={() => setActiveView("map")}>← Voltar ao mapa</button>
        <span className="briefing-icon">{district.icon}</span>
        <span className="eyebrow">BRIEFING DA MISSÃO</span>
        <h1>{district.label}</h1>
        <p className="briefing-lead">{district.purpose}</p>

        <div className="briefing-objectives">
          <article>
            <span>01</span>
            <div><b>Descobrir</b><p>Observe primeiro a situação antes de receber uma definição.</p></div>
          </article>
          <article>
            <span>02</span>
            <div><b>Justificar</b><p>Use evidências que realmente provem a classificação.</p></div>
          </article>
          <article>
            <span>03</span>
            <div><b>Aplicar</b><p>Transfira o critério para um caso novo.</p></div>
          </article>
          <article>
            <span>04</span>
            <div><b>Produzir</b><p>Crie algo usando conscientemente o que aprendeu.</p></div>
          </article>
        </div>

        <div className="briefing-status">
          <span className={status.recognize ? "done" : ""}>Reconhecer</span>
          <span className={status.explain ? "done" : ""}>Explicar</span>
          <span className={status.apply ? "done" : ""}>Aplicar</span>
          <span className={status.produce ? "done" : ""}>Produzir</span>
        </div>


        <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {selected === "charge" && (
            <button
              type="button"
              className="primary-action"
              onClick={() => setActiveView("chargeMission")}
            >
              Iniciar investigação da Charge →
            </button>
          )}

          {selected === "fabula" && (
            <button
              type="button"
              className="primary-action"
              onClick={() => setActiveView("fableMission")}
            >
              Entrar na Floresta das Fábulas →
            </button>
          )}

          {selected !== "charge" && selected !== "fabula" && (
            <button
              type="button"
              className="secondary-action"
              onClick={() => setActiveView("map")}
            >
              Missão completa em breve
            </button>
          )}
        </div>

        <div className="pilot-note">
          <b>
            {selected === "charge"
              ? "A missão de Charge está conectada."
              : selected === "fabula"
                ? "A missão de Fábula está conectada."
                : "Este distrito ainda está sendo preparado."}
          </b>
          <p>
            {selected === "fabula"
              ? "A missão trabalha leitura narrativa, características da fábula, moral implícita, justificativa, contraste Fábula × Lenda, aplicação e produção."
              : selected === "charge"
                ? "A experiência percorre observação, classificação, justificativa, contraste, aplicação e produção."
                : "Os próximos distritos usarão o mesmo modelo de aprendizagem já validado em Charge e Fábula."}
          </p>
        </div>
      </section>
    </main>
  );
}
