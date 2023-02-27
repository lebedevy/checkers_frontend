import { Contract } from 'ethers';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { RED, SQUARE_SIZE, WHITE } from './constants';
import { useStore } from './storeContext';
import { getPiece } from './util';

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
    const board = useStore<string>((state) => state.board);
    const contract = useStore<Contract>((state) => state.contract);
    const bit = getPiece(index, board);
    const isPiece = bit === RED || bit === WHITE;

    const movePiece = async (from: number, to: number) => {
        await contract.move(from, to);
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
                        background-color: ${bit === RED ? 'red' : 'white'};
                        // Index css
                        color: ${bit === RED ? 'white' : 'black'};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `}
                >
                    {index}
                </div>
            ) : (
                index
            )}
        </Cell>
    );
};
