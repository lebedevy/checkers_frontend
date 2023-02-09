import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Contract, JsonRpcProvider, Signer } from 'ethers';
import { css } from '@emotion/css';

const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const BOARD_SIZE = 8;
const SQUARE_SIZE = 50;

const App = () => {
    const [loading, setLoading] = useState(true);
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

    const squares = Array(BOARD_SIZE * BOARD_SIZE).fill(0);

    if (loading) return <div>Loading...</div>;

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
                    if (!provider.current || !contract.current) return;
                    console.log('hello');
                    console.log(await provider.current.getBlockNumber());
                    console.log(await contract.current.number());
                    console.log(await contract.current.increment());
                    console.log(await contract.current.number());
                }}
            >
                Hello
            </button>
            <div>
                {squares
                    .reduce((prev, cur, ind) => {
                        // collect
                        if (ind % BOARD_SIZE === 0) {
                            prev.push([]);
                        }
                        prev[prev.length - 1].push(
                            <div
                                className={css`
                                    height: ${SQUARE_SIZE}px;
                                    width: ${SQUARE_SIZE}px;
                                    border: 1px solid black;
                                `}
                            />
                        );

                        return prev;
                    }, [] as Array<React.ReactNode[]>)
                    .map((row: React.ReactNode[]) => (
                        <div
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
