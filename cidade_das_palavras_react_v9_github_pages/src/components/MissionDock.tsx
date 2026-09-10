
import { districtByKey } from "../data/districts";
import { useGameStore } from "../store/useGameStore";

export function MissionDock() {
  const selected = useGameStore((s) => s.selectedDistrict);
  const enterMissionBriefing = useGameStore((s) => s.enterMissionBriefing);
  const district = selected ? districtByKey[selected] : null;

  return (
    <section className="mission-dock" aria-label="Missão atual">
      <div className="mission-icon" aria-hidden="true">✓</div>
      <div className="mission-copy">
        <span className="eyebrow">MISSÃO ATUAL</span>
        <b>{district ? `Investigue: ${district.label}` : "Explore um bairro da cidade"}</b>
        <small>
          {district
            ? district.note
            : "Selecione um ponto colorido do mapa para conhecer a missão."}
        </small>
      </div>
      <div className="mission-state">
        <span>{district ? "Pronta para briefing" : "Aguardando seleção"}</span>
      </div>
      <button
        type="button"
        className="primary-action"
        disabled={!district}
        onClick={() => district && enterMissionBriefing(district.key)}
      >
        {district ? "ENTRAR NA MISSÃO" : "ESCOLHA UM DESTINO"} →
      </button>
    </section>
  );
}
