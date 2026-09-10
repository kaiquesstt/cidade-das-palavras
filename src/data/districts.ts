
import type { District } from "../types";

export const districts: District[] = [
  {
    key: "charge",
    label: "Charge",
    shortLabel: "Charge",
    color: "#ff5656",
    x: 18,
    y: 23,
    note: "Ironia, crítica e contexto",
    purpose: "Criticar ou comentar uma situação por meio da relação entre linguagem verbal, visual, humor e contexto.",
    clue: "A contradição entre o que se diz e o que a imagem mostra costuma ser uma pista forte.",
    contrast: "Não basta ser desenho com humor: a charge costuma depender de contexto social ou político.",
    icon: "?!"
  },
  {
    key: "fabula",
    label: "Fábula",
    shortLabel: "Fábula",
    color: "#69da6a",
    x: 49,
    y: 23,
    note: "Personagens, conflito e moral",
    purpose: "Construir uma reflexão sobre comportamentos por meio de uma narrativa simbólica.",
    clue: "As escolhas das personagens e suas consequências ajudam a revelar a moral.",
    contrast: "A presença de animais não basta: o enredo precisa conduzir a uma reflexão moral.",
    icon: "◆"
  },
  {
    key: "lenda",
    label: "Lenda",
    shortLabel: "Lenda",
    color: "#a879ff",
    x: 79,
    y: 24,
    note: "Tradição, memória e mistério",
    purpose: "Transmitir narrativas tradicionais ligadas à memória e à cultura de uma comunidade.",
    clue: "Lugar, tradição, transmissão entre gerações e acontecimento extraordinário são pistas centrais.",
    contrast: "Diferentemente da fábula, não precisa construir uma moral sobre comportamento.",
    icon: "☾"
  },
  {
    key: "estatuto",
    label: "Estatuto",
    shortLabel: "Estatuto",
    color: "#61adff",
    x: 14,
    y: 53,
    note: "Regras, direitos e deveres",
    purpose: "Organizar normas, direitos, deveres e regras de convivência.",
    clue: "Artigos, deveres, permissões, proibições e organização normativa aparecem como pistas.",
    contrast: "Não tenta apenas convencer: sua finalidade principal é regulamentar.",
    icon: "§"
  },
  {
    key: "artigo",
    label: "Artigo de opinião",
    shortLabel: "Artigo",
    color: "#ff9f48",
    x: 49,
    y: 49,
    note: "Tese, argumentos e evidências",
    purpose: "Defender uma tese por meio de argumentos, evidências e resposta a objeções.",
    clue: "Pergunte: qual posição está sendo defendida e com base em quê?",
    contrast: "Opinião isolada não é artigo de opinião: é preciso sustentar uma tese.",
    icon: "✦"
  },
  {
    key: "carta",
    label: "Carta do leitor",
    shortLabel: "Carta",
    color: "#ff6ccc",
    x: 80,
    y: 49,
    note: "Sua voz em diálogo",
    purpose: "Permitir que o leitor dialogue publicamente com algo que foi publicado.",
    clue: "Normalmente existe referência a uma matéria, publicação ou assunto já apresentado.",
    contrast: "Ao contrário do artigo, costuma responder diretamente a uma publicação e assumir a voz do leitor.",
    icon: "✉"
  },
  {
    key: "miniconto",
    label: "Miniconto",
    shortLabel: "Miniconto",
    color: "#4bd9d1",
    x: 39,
    y: 76,
    note: "Poucas palavras, grande efeito",
    purpose: "Produzir efeito narrativo com extrema concisão e espaço para inferência.",
    clue: "Poucas palavras, recorte de situação, sugestão e impacto são características importantes.",
    contrast: "Não é apenas uma frase curta: precisa sugerir algum movimento narrativo.",
    icon: "▣"
  },
  {
    key: "figuras",
    label: "Figuras de linguagem",
    shortLabel: "Figuras",
    color: "#ffd22f",
    x: 77,
    y: 75,
    note: "Efeitos de sentido em ação",
    purpose: "Explorar como escolhas linguísticas produzem ritmo, imagem, suavização, comparação e personificação.",
    clue: "Primeiro observe o efeito de sentido; depois dê o nome à figura.",
    contrast: "O nome da figura não deve ser decorado sem compreender o efeito que ela produz.",
    icon: "✺"
  }
];

export const districtByKey = Object.fromEntries(
  districts.map((district) => [district.key, district])
) as Record<(typeof districts)[number]["key"], District>;
