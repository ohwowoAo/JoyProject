// counterStore.ts

import { create, SetState } from "zustand";

// 상태 타입 정의
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounter = create<CounterState>((set: SetState<CounterState>) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounter;
