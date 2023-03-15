import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { BlackCell, Cell } from './Cell';
import { BOARD_SIZE } from './constants';
import { DebugBoardSetting } from './DebugBoardSetting';
import { useStore } from './storeContext';
import { SignInModule } from './SignInModule';
import { BigButton } from './BigButton';

// 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

export const Board: React.FC = () => {
    const [move, setMove] = useState<number>();
    const turn = useStore((s) => s.turn);
    const setSigner = useStore((s) => s.signIn);
    const signer = useStore((s) => s.signer);
    const [signIn, setSignIn] = useState(false);

    const updateBoard = useStore((s) => s.updateBoard);
    const provider = useStore((s) => s.provider);

    const updateListener = useCallback(() => {
        console.log('block');
        updateBoard();
    }, [updateBoard]);

    useEffect(() => {
        console.log(provider);
        console.log(updateListener);
        provider?.on('block', updateListener);
        // return () => {
        //     provider?.off('block', updateListener);
        // };
    }, [provider, updateListener]);

    const squares = useMemo(() => Array(BOARD_SIZE * BOARD_SIZE).fill(0), []);

    return (
        <div>
            {!signer && (
                <BigButton
                    title="Sign in"
                    onClick={() => {
                        setSignIn(true);
                    }}
                />
            )}
            <div>{`${turn}`}</div>
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
                        cell = <BlackCell key={ind} move={move} setMove={setMove} index={31 - i} />;
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
            <DebugBoardSetting />
            {signIn && (
                <SignInModule
                    close={(signer) => {
                        if (signer) {
                            setSigner(signer);
                        }
                        setSignIn(false);
                    }}
                />
            )}
        </div>
    );
};
