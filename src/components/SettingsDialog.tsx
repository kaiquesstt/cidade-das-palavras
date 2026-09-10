
import { useGameStore } from "../store/useGameStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsDialog({ open, onClose }: Props) {
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const reducedMotion = useGameStore((s) => s.reducedMotion);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const toggleReducedMotion = useGameStore((s) => s.toggleReducedMotion);
  const fontScale = useGameStore((s) => s.fontScale);
  const setFontScale = useGameStore((s) => s.setFontScale);
  const highContrast = useGameStore((s) => s.highContrast);
  const toggleHighContrast = useGameStore((s) => s.toggleHighContrast);
  const resetDemo = useGameStore((s) => s.resetDemo);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">PREFERÊNCIAS</span>
            <h2 id="settings-title">Configurações</h2>
          </div>
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </div>

        <label className="setting-row">
          <span><b>Som</b><small>Efeitos sonoros do jogo</small></span>
          <input type="checkbox" checked={soundEnabled} onChange={toggleSound} />
        </label>

        <label className="setting-row">
          <span><b>Reduzir animações</b><small>Útil para quem prefere menos movimento</small></span>
          <input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} />
        </label>

        <div className="setting-row setting-font-size">
          <span><b>Tamanho da interface</b><small>Amplia textos, botões e áreas clicáveis em todo o jogo</small></span>
          <div className="settings-font-controls">
            <button type="button" aria-label="Diminuir interface" onClick={() => setFontScale(Math.max(0.9, +(fontScale - 0.1).toFixed(2)))}>A−</button>
            <output aria-live="polite">{Math.round(fontScale * 100)}%</output>
            <button type="button" aria-label="Aumentar interface" onClick={() => setFontScale(Math.min(1.5, +(fontScale + 0.1).toFixed(2)))}>A+</button>
          </div>
        </div>

        <label className="setting-row">
          <span><b>Alto contraste</b><small>Aumenta contraste de textos, bordas e foco</small></span>
          <input type="checkbox" checked={highContrast} onChange={toggleHighContrast} />
        </label>

        <button
          type="button"
          className="secondary-action danger-action"
          onClick={() => {
            resetDemo();
            onClose();
          }}
        >
          Restaurar progresso de demonstração
        </button>
      </section>
    </div>
  );
}
