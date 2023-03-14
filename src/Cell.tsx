import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { SQUARE_SIZE } from './constants';
import { useStore } from './storeContext';
import { getActualIndex, getPiece } from './util';
import { useMemo } from 'react';
import { useDebugStore } from './debugStore';

type CellArgs = { blackCell?: boolean; selected?: boolean };

export const Cell = styled.div<CellArgs>`
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

export const BlackCell: React.FC<{
    index: number;
    move: number | undefined;
    setMove: (i: number | undefined) => void;
}> = ({ index, move, setMove }) => {
    const debug = useDebugStore((state) => state.debug);
    const debugBoard = useDebugStore((state) => state.debugBoard);
    const contractBoard = useStore((state) => state.board);
    const updateBoard = useStore((state) => state.updateBoard);
    const debugIndex = useDebugStore((state) => state.debugIndex);
    const contract = useStore((state) => state.contract);
    const board = useMemo(
        () => (debug ? debugBoard : contractBoard),
        [debug, debugBoard, contractBoard]
    );

    const piece = getPiece(index, board);
    const isPiece = (piece & 3) !== 0;

    const column = useMemo(() => (debugIndex ? getActualIndex(index) : index), [index, debugIndex]);

    const movePiece = async (from: number, to: number) => {
        await contract.move(from, to);
        await updateBoard();
    };

    return (
        <Cell
            blackCell
            selected={move === index}
            onClick={() => {
                if (isPiece) {
                    setMove(index);
                } else {
                    if (move != null) {
                        movePiece(move, index);
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
                        background-color: ${(piece & 2) === 2 ? 'red' : 'white'};
                        // Index css
                        color: ${(piece & 2) === 2 ? 'white' : 'black'};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {(piece & 4) === 4 ? 'K' : column}
                </div>
            ) : (
                column
            )}
        </Cell>
    );
};
