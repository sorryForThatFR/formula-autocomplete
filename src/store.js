import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useStore = create((set) => ({
  formulaTokens: [],
  result: 0,
  expression: "",
  setFormulaTokens: (newTokens) =>
    set(() => ({
      formulaTokens: newTokens.map((el) => ({ ...el, id: uuidv4() })),
    })),
  setResult: (newResult) => set(() => ({ result: newResult })),
  setExpression: (newExpression) => set(() => ({ expression: newExpression })),
}));
