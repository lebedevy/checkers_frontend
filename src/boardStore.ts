import { Contract, JsonRpcProvider, JsonRpcSigner } from 'ethers';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CONTRACT_ADDRESS } from './constants';
import { CONTRACT_API } from './data';
import { buildBoard } from './util';

export interface BoardState {
    // RPC Connectors
    provider: JsonRpcProvider;
    signer: JsonRpcSigner;
    contract: Contract;

    // Variables
    board: string;
    loading: boolean;
    debug: boolean;
    debugBoard: string;

    // update methods
    updateBoard: () => Promise<void>;
    setDebug: (d: boolean) => void;
    setDebugBoard: (b: string) => void;
}

export const createBoardStore = async () => {
    const provider = new JsonRpcProvider();
    const signer = await provider.getSigner();
    // Provide signer to the contract
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, signer);

    return createStore<BoardState>()(
        devtools(
            (set) => ({
                provider,
                signer,
                contract,
                debug: false as boolean,
                loading: false as boolean, // Why is this breaking?
                debugBoard: (0).toString(10).padStart(96, '0'),
                setDebug: (debug) => set((state) => ({ ...state, debug })),
                setDebugBoard: (debugBoard) => set((state) => ({ ...state, debugBoard })),
                board: buildBoard(),
                updateBoard: async () => {
                    set((state) => ({ ...state, loading: true }));
                    const board = await contract.board();
                    set((state) => ({ ...state, board: board.toString(2), loading: false }));
                },
            }),
            {
                name: 'board-store',
            }
        )
    );
};
