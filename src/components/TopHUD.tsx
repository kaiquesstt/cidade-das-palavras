
import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { SettingsDialog } from "./SettingsDialog";

export function TopHUD() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const playerName = useGameStore((s) => s.playerName);
  const xp = useGameStore((s) => s.xp);
  const level = useGameStore((s) => s.level);
  const achievements = useGameStore((s) => s.achievements);

  return (
    <>
      <header className="top-hud">
        <button
          type="button"
          className="brand-lockup"
          onClick={() => useGameStore.getState().setActiveView("home")}
          aria-label="Voltar ao início"
        >
          <span className="brand-city">CIDADE</span>
          <span className="brand-words">DAS <b>PALAVRAS</b></span>
          <small>LER · PENSAR · ESCREVER · TRANSFORMAR</small>
        </button>

        <div className="player-hud" aria-label="Status do jogador">
          <div className="avatar" aria-hidden="true">✦</div>
          <div className="player-data">
            <span>{playerName.toUpperCase()}</span>
            <b>Nível {level}</b>
          </div>
          <div className="xp-meter" aria-label={`${xp} de 400 pontos de experiência`}>
            <i style={{ width: `${Math.min(100, (xp / 400) * 100)}%` }} />
            <span>{xp} / 400 XP</span>
          </div>
          <div className="hud-badge" title="Conquistas">★ {achievements.length}</div>
          <button
            type="button"
            className="hud-icon-button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Abrir configurações"
          >
            ⚙
          </button>
        </div>
      </header>
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
