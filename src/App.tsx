import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Contract, JsonRpcProvider, Signer } from 'ethers';
import { toBits } from './util';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const BOARD_SIZE = 8;
const SQUARE_SIZE = 50;

const RED = '010';
const WHITE = '001';

const buildBoard = (): string => {
    // Positions
    // 001 (1) first player, non king piece
    // 010 (2) second player, non king piece

    let board = BigInt(2);

    // player has 12 pieces; we started with the first one
    // for every piece, shift bits by 3, and add the player piece in the new position
    for (let i = 1; i < 32; i++) {
        board = board << BigInt(3);

        if (i < 12) board += BigInt(2);
        if (i >= 32 - 12) board += BigInt(1);
    }

    return toBits(board);
};

type CellArgs = { blackCell?: boolean; selected?: boolean };

const Cell = styled.div<CellArgs>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${SQUARE_SIZE}px;
    width: ${SQUARE_SIZE}px;
    border: 1px solid black;
    background-color: ${({ blackCell, selected }) =>
        blackCell ? (selected ? 'blue' : 'black') : 'white'};
    color: ${({ blackCell }) => (blackCell ? 'white' : 'black')};
`;

// const ProviderContext = createContext<{
//     provider: JsonRpcProvider | null;
//     contract: Contract | null;
//     signer: Signer | null;
// }>({
//     provider: null,
//     contract: null,
//     signer: null,
// });

const App = () => {
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState(buildBoard());
    const [move, setMove] = useState<number>();
    const provider = useRef<JsonRpcProvider | null>(null);
    const contract = useRef<Contract | null>(null);
    const signer = useRef<Signer | null>(null);

    const initProvider = useCallback(async () => {
        setLoading(true);
        const p = new JsonRpcProvider();
        provider.current = p;
        contract.current = new Contract(
            CONTRACT_ADDRESS,
            [
                {
                    inputs: [],
                    name: 'increment',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'number',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: 'newNumber',
                            type: 'uint256',
                        },
                    ],
                    name: 'setNumber',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ],
            p
        );
        signer.current = await p.getSigner();
        setLoading(false);
    }, []);

    useEffect(() => {
        initProvider();
    }, [initProvider]);

    const squares = useMemo(() => Array(BOARD_SIZE * BOARD_SIZE).fill(0), []);

    if (loading) return <div>Loading...</div>;

    // console.log(BigInt('0b' + board).toString(10));

    return (
        <div
            className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
            `}
        >
            <button
                onClick={async () => {
                    const b = BigInt('0b' + board);
                    for (let i = 0; i < 32; i++) {
                        console.log(`${i} ${((b >> BigInt(i * 3)) & BigInt(7)).toString(2)}`);
                    }
                }}
            >
                Hello
            </button>
            <div>
                {squares
                    .reduce((prev, _, ind) => {
                        // collect
                        if (ind % BOARD_SIZE === 0) {
                            prev.push([]);
                        }

                        // offset is 0 for even rows, 1 for odd rows; this creates a checkerboard pattern
                        const offset = Math.floor(ind / BOARD_SIZE) % 2;
                        // every other cell is black
                        const blackCell = ind % 2 !== offset;
                        let cell;

                        if (blackCell) {
                            const i = offset ? ind / 2 : Math.floor(ind / 2);
                            // the board is stored in a 96 bit integer; every 3 bits represent a square
                            cell = (
                                <BlackCell
                                    key={ind}
                                    move={move}
                                    setMove={setMove}
                                    index={i}
                                    board={board}
                                    setBoard={setBoard}
                                />
                            );
                        } else {
                            cell = <Cell key={ind} />;
                        }

                        prev[prev.length - 1].push(cell);

                        return prev;
                    }, [] as Array<React.ReactNode[]>)
                    .map((row: React.ReactNode[], ind: number) => (
                        <div
                            key={ind}
                            className={css`
                                display: flex;
                            `}
                        >
                            {row}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default App;

const getPiece = (index: number, board: string) => {
    return board.slice(index * 3, index * 3 + 3);
};

const updateBoard = (position: number, piece: string, board: string) => {
    const p = position * 3;
    return board.substring(0, p) + piece + board.substring(p + 3);
};

const Test = forwardRef<any, { test: number }>(({ test }) => {
    return <div></div>;
});

const BlackCell: React.FC<{
    index: number;
    move: number | undefined;
    setMove: (i: number | undefined) => void;
    board: string;
    setBoard: (b: string) => void;
}> = ({ index, move, setMove, board, setBoard }, ref) => {
    const bit = getPiece(index, board);
    const isPiece = bit === RED || bit === WHITE;

    return (
        <Cell
            blackCell
            selected={move === index}
            onClick={() => {
                if (isPiece) {
                    setMove(index);
                } else {
                    if (move != null) {
                        // set previous square to empty
                        let newBoard = updateBoard(move, '000', board);
                        // set new square to piece
                        setBoard(updateBoard(index, getPiece(move, board), newBoard));
                    }
                    setMove(undefined);
                }
            }}
        >
            {isPiece ? (
                <div
                    className={css`
                        height: ${SQUARE_SIZE - 15}px;
                        width: ${SQUARE_SIZE - 15}px;
                        border-radius: 50%;
                        background-color: ${bit === RED ? 'red' : 'white'};
                        // Index css
                        color: ${bit === RED ? 'white' : 'black'};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {31 - index}
                </div>
            ) : (
                index
            )}
        </Cell>
    );
};
