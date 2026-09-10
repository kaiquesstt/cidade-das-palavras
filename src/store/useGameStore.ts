
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DistrictKey, MasteryStage, ViewKey } from "../types";

type ProgressMap = Record<DistrictKey, number>;
type MasteryMap = Record<DistrictKey, Record<MasteryStage, boolean>>;

interface GameState {
  playerName: string;
  xp: number;
  level: number;
  achievements: string[];
  activeView: ViewKey;
  selectedDistrict: DistrictKey | null;
  progress: ProgressMap;
  mastery: MasteryMap;
  reducedMotion: boolean;
  soundEnabled: boolean;
  fontScale: number;
  highContrast: boolean;
  recentlyRestored: DistrictKey | null;
  setActiveView: (view: ViewKey) => void;
  selectDistrict: (key: DistrictKey | null) => void;
  enterMissionBriefing: (key: DistrictKey) => void;
  setPlayerName: (name: string) => void;
  toggleReducedMotion: () => void;
  toggleSound: () => void;
  setFontScale: (value: number) => void;
  toggleHighContrast: () => void;
  clearRecentlyRestored: () => void;
  markStage: (district: DistrictKey, stage: MasteryStage) => void;
  addAchievement: (achievement: string) => void;
  resetDemo: () => void;
}

const initialProgress: ProgressMap = {
  charge: 0,
  fabula: 0,
  lenda: 0,
  estatuto: 0,
  artigo: 0,
  carta: 25,
  miniconto: 75,
  figuras: 50
};

const initialMastery: MasteryMap = {
  charge: { recognize: false, explain: false, apply: false, produce: false },
  fabula: { recognize: false, explain: false, apply: false, produce: false },
  lenda: { recognize: false, explain: false, apply: false, produce: false },
  estatuto: { recognize: false, explain: false, apply: false, produce: false },
  artigo: { recognize: false, explain: false, apply: false, produce: false },
  carta: { recognize: true, explain: false, apply: false, produce: false },
  miniconto: { recognize: true, explain: true, apply: true, produce: false },
  figuras: { recognize: true, explain: true, apply: false, produce: false }
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: "Explorador(a)",
      xp: 220,
      level: 3,
      achievements: ["Primeira pista", "Leitor atento", "Investigador"],
      activeView: "home",
      selectedDistrict: null,
      progress: initialProgress,
      mastery: initialMastery,
      reducedMotion: false,
      soundEnabled: true,
      fontScale: 1,
      highContrast: false,
      recentlyRestored: null,

      setActiveView: (activeView) => set({ activeView }),
      selectDistrict: (selectedDistrict) => set({ selectedDistrict }),
      enterMissionBriefing: (selectedDistrict) =>
        set({ selectedDistrict, activeView: "mission" }),
      setPlayerName: (playerName) => set({ playerName }),
      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      setFontScale: (value) =>
        set({ fontScale: Math.max(0.9, Math.min(1.5, value)) }),

      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),

      clearRecentlyRestored: () => set({ recentlyRestored: null }),

      markStage: (district, stage) => {
        const current = get().mastery;
        if (current[district][stage]) return;

        const updated = {
          ...current,
          [district]: { ...current[district], [stage]: true }
        };
        const stageOrder: MasteryStage[] = ["recognize", "explain", "apply", "produce"];
        const count = stageOrder.filter((item) => updated[district][item]).length;

        set((state) => {
          const rawXP = state.xp + 25;
          const leveledUp = rawXP >= 400;
          return {
            mastery: updated,
            progress: { ...state.progress, [district]: count * 25 },
            xp: leveledUp ? rawXP - 400 : rawXP,
            level: leveledUp ? state.level + 1 : state.level,
            recentlyRestored: count === 4 ? district : state.recentlyRestored
          };
        });
      },

addAchievement: (achievement) =>
  set((state) => ({
    achievements: state.achievements.includes(achievement)
      ? state.achievements
      : [...state.achievements, achievement]
  })),

resetDemo: () =>
        set({
          playerName: "Explorador(a)",
          xp: 220,
          level: 3,
          achievements: ["Primeira pista", "Leitor atento", "Investigador"],
          activeView: "home",
          selectedDistrict: null,
          progress: initialProgress,
          mastery: initialMastery,
          reducedMotion: false,
          soundEnabled: true,
          fontScale: 1,
          highContrast: false,
          recentlyRestored: null
        })
    }),
    {
      name: "cidade-das-palavras-v9",
      version: 12,
      migrate: (persistedState: unknown, version) => {
        const state = persistedState as Partial<GameState>;
        const progress = {
          ...initialProgress,
          ...(state.progress ?? {})
        };
        const mastery = {
          ...initialMastery,
          ...(state.mastery ?? {})
        };

        if (version < 10) {
          progress.lenda = 0;
          mastery.lenda = initialMastery.lenda;
        }

        if (version < 11) {
          progress.estatuto = 0;
          mastery.estatuto = initialMastery.estatuto;
        }

        // V12 introduz a missão real de Artigo de Opinião.
        // O antigo 50% era apenas progresso demonstrativo.
        if (version < 12) {
          progress.artigo = 0;
          mastery.artigo = initialMastery.artigo;
        }

        const clearRestored =
          (version < 10 && state.recentlyRestored === "lenda") ||
          (version < 11 && state.recentlyRestored === "estatuto") ||
          (version < 12 && state.recentlyRestored === "artigo");

        return {
          ...state,
          progress,
          mastery,
          recentlyRestored: clearRestored
            ? null
            : (state.recentlyRestored ?? null)
        } as GameState;
      }
    }
  )
);
