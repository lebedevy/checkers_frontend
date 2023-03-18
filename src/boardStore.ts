import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CONTRACT_ADDRESS } from './constants';
import { CONTRACT_API } from './data';
import { buildBoard } from './util';

export interface BoardState {
    // RPC Connectors
    provider: JsonRpcProvider;
    signer?: Wallet;
    contract: Contract;

    // Variables
    board: string;
    turn: number;
    loading: boolean;
    player1: string;
    player2: string;

    // update methods
    updateBoard: () => Promise<void>;
    signIn: (w: Wallet) => Promise<void>;
}

export const createBoardStore = async () => {
    const provider = new JsonRpcProvider();
    const signer = await provider.getSigner();
    // Provide signer to the contract
    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, signer);

    return createStore<BoardState>()(
        devtools(
            (set) => ({
                contract,
                provider,
                loading: false as boolean,
                player1: '0x0',
                player2: '0x0',
                board: buildBoard(),
                turn: 0,
                updateBoard: async () => {
                    set((state) => ({ ...state, loading: true }));

                    const [player1, player2, board, turn] = await Promise.all([
                        contract.player1(),
                        contract.player2(),
                        contract.board(),
                        contract.turn(),
                    ]);

                    set((state) => ({ ...state, board: board.toString(2), loading: false, turn }));
                },
                signIn: async (w: Wallet) => {
                    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, w);
                    set((state) => ({ ...state, signer: w, contract }));
                },
            }),
            {
                name: 'board-store',
            }
        )
    );
};
