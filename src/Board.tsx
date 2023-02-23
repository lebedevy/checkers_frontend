import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { BlackCell, Cell } from './Cell';
import { BOARD_SIZE } from './constants';
import { Contract } from 'ethers';

export const Board = forwardRef<Contract, { board: string }>(
    ({ board: initialBoard }, contract) => {
        useEffect(() => {}, [initialBoard]);
        const [board, setBoard] = useState<string>(initialBoard);
        const [move, setMove] = useState<number>();

        const squares = useMemo(() => Array(BOARD_SIZE * BOARD_SIZE).fill(0), []);

        return (
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
                                    ref={contract}
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
        );
    }
);
