import { useCallback, useEffect, useRef, useState } from 'react';
import { Contract, JsonRpcProvider, Signer } from 'ethers';
import { printBoard, toBits } from './util';
import { css } from '@emotion/css';
import { CONTRACT_API } from './data';
import { Board } from './Board';
import { CONTRACT_ADDRESS } from './constants';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState<string | null>(null);
    const provider = useRef<JsonRpcProvider | null>(null);
    const contract = useRef<Contract | null>(null);
    const signer = useRef<Signer | null>(null);

    const initProvider = useCallback(async () => {
        setLoading(true);
        const p = new JsonRpcProvider();
        provider.current = p;
        const s = await p.getSigner();
        signer.current = s;
        // Provide signer to the contract
        contract.current = new Contract(CONTRACT_ADDRESS, CONTRACT_API, s);
        setLoading(false);
    }, []);

    useEffect(() => {
        initProvider();
    }, [initProvider]);

    const getBoard = useCallback(async () => {
        if (!loading && contract.current) {
            const b = await contract.current.board();
            setBoard(toBits(b));
            printBoard(toBits(b));
            console.log(await contract.current.turn());
        }
    }, [loading]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    if (loading || !board) return <div>Loading...</div>;

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
            <Board ref={contract} board={board} />
        </div>
    );
};

export default App;
