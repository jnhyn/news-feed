import { create } from 'zustand';

type SearchState = {
  keyword: string;
  recentKeywords: string[];
  setKeyword: (kw: string) => void;
  addRecent: (kw: string) => void;
  clearRecent: () => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  recentKeywords: [],
  setKeyword: (keyword) => set({ keyword }),
  addRecent: (kw) =>
    set((state) => {
      // 중복 방지 + 최근순 최대 5개
      const next = [kw, ...state.recentKeywords.filter((k) => k !== kw)].slice(
        0,
        5
      );
      return { recentKeywords: next };
    }),
  clearRecent: () => set({ recentKeywords: [] }),
}));
