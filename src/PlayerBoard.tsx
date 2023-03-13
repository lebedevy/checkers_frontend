import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Board } from './Board';
import { BoardState, createBoardStore } from './boardStore';
import { StoreApi } from 'zustand';
import { StoreContext } from './storeContext';

export const PlayerBoard = () => {
    const [store, setStore] = useState<StoreApi<BoardState> | null>();

    const initApp = useCallback(async () => {
        const s = await createBoardStore();
        // loading initial board
        s.getState().updateBoard();
        setStore(s);
    }, []);

    useEffect(() => {
        initApp();
    }, [initApp]);

    if (!store) return <div>Loading...</div>;

    return (
        <StoreContext.Provider value={store}>
            <div
                className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                `}
            >
                <Board />
            </div>
        </StoreContext.Provider>
    );
};
