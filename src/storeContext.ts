import { createContext, useContext } from 'react';
import { StoreApi, useStore as uStore } from 'zustand';
import { BoardState } from './boardStore';

export const StoreContext = createContext<StoreApi<BoardState>>(null as any);

// TODO: determine how the state is infered
export const useStore = <T>(selector: (s: BoardState) => T) => {
    const store = useContext(StoreContext);
    return uStore(store, selector);
};
