import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DebugState {
    // Variables
    debug: boolean;
    debugBoard: string;
    debugIndex: boolean;

    // update methods
    setDebug: (d: boolean) => void;
    setDebugBoard: (b: string) => void;
    setDebugIndex: (i: boolean) => void;
}

export const useDebugStore = create<DebugState>()(
    devtools(
        (set) => ({
            debug: false,
            loading: false,
            debugIndex: false,
            debugBoard: (0).toString(10).padStart(96, '0'),
            setDebug: (debug) => set((state) => ({ ...state, debug })),
            setDebugBoard: (debugBoard) => set((state) => ({ ...state, debugBoard })),
            setDebugIndex: (debugIndex) => set((state) => ({ ...state, debugIndex })),
        }),
        {
            name: 'board-store',
        }
    )
);
