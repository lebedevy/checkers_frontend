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
    turn: number;
    loading: boolean;

    // update methods
    updateBoard: () => Promise<void>;
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
                loading: false as boolean,
                board: buildBoard(),
                turn: 0,
                updateBoard: async () => {
                    set((state) => ({ ...state, loading: true }));
                    const board = await contract.board();
                    const turn = await contract.turn();
                    set((state) => ({ ...state, board: board.toString(2), loading: false, turn }));
                },
            }),
            {
                name: 'board-store',
            }
        )
    );
};
