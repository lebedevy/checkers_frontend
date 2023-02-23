import { forwardRef } from 'react';
import { Contract } from 'ethers';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { RED, SQUARE_SIZE, WHITE } from './constants';

const getPiece = (index: number, board: string) => {
    return board.slice(index * 3, index * 3 + 3);
};

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

export const BlackCell = forwardRef<
    Contract,
    {
        index: number;
        move: number | undefined;
        setMove: (i: number | undefined) => void;
        board: string;
        setBoard: (b: string) => void;
    }
>(({ index, move, setMove, board, setBoard }, ref) => {
    const bit = getPiece(index, board);
    const isPiece = bit === RED || bit === WHITE;

    const test = async (from: number, to: number) => {
        const contract: Contract = (ref as any).current;

        if (contract) {
            console.log(31 - from, 31 - to);
            await contract.move(31 - from, 31 - to);
            // const res = await (ref as any).current.move(from, to, {
            //     gasPrice: 1000000,
            //     gasLimit: 1000000,
            //     maxFeePerGas: 1000000,
            //     value: 0,
            // });
            // console.log(res);
        } else {
            throw new Error('Invalid contract data');
        }
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
                        // set previous square to empty
                        // let newBoard = updateBoard(move, '000', board);
                        // set new square to piece
                        console.log(getPiece(move, board));
                        test(move, index);
                        // setBoard(updateBoard(index, getPiece(move, board), newBoard));
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
                31 - index
            )}
        </Cell>
    );
});
