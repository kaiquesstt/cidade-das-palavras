
import { useGameStore } from "../store/useGameStore";

const badges = [
  { name: "Primeira pista", desc: "Encontrou a primeira evidência relevante.", icon: "⌕" },
  { name: "Leitor atento", desc: "Explicou uma classificação usando pistas do texto.", icon: "◉" },
  { name: "Investigador", desc: "Visitou diferentes bairros da Cidade das Palavras.", icon: "✦" },
  { name: "Cronista da crítica", desc: "Concluiu o Distrito da Charge dominando leitura crítica e produção.", icon: "?!" },
  { name: "Leitor de entrelinhas", desc: "Concluiu a Floresta das Fábulas inferindo moral, justificando o gênero e produzindo uma nova fábula.", icon: "◆" },
  { name: "Mestre dos contrastes", desc: "Diferencie conceitos próximos sem depender de memorização.", icon: "⚖" },
  { name: "Autor da cidade", desc: "Complete uma produção própria.", icon: "✎" },
  { name: "Cidade restaurada", desc: "Alcance 100% em todos os bairros.", icon: "★" }
];

export function AchievementsScreen() {
  const unlocked = useGameStore((s) => s.achievements);

  return (
    <main className="content-screen">
      <header className="screen-heading">
        <span className="eyebrow">CONQUISTAS</span>
        <h1>Selos da jornada</h1>
        <p>As conquistas celebram habilidades desenvolvidas, não apenas quantidade de respostas.</p>
      </header>

      <div className="achievement-grid">
        {badges.map((badge) => {
          const isUnlocked = unlocked.includes(badge.name);
          return (
            <article className={`achievement-card ${isUnlocked ? "unlocked" : "locked"}`} key={badge.name}>
              <div className="achievement-icon">{badge.icon}</div>
              <div>
                <span className="card-kicker">{isUnlocked ? "DESBLOQUEADO" : "AINDA BLOQUEADO"}</span>
                <h2>{badge.name}</h2>
                <p>{badge.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
