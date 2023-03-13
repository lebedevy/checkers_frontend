import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { Contract, JsonRpcProvider } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import { CONTRACT_API } from './data';
import { PlayerBoard } from './PlayerBoard';
import { BigButton } from './BigButton';

const App = () => {
    const ref = useRef<Contract>(null);
    const [loading, setLoading] = useState(true);
    const [player1, setPlayer1] = useState<number | null>(null);
    const [player2, setPlayer2] = useState<number | null>(null);

    const initApp = async () => {
        setLoading(true);
        const provider = new JsonRpcProvider();
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, signer);

        (ref as any).current = contract;

        const [p1, p2] = await Promise.all([contract.player1(), contract.player2()]);

        setPlayer1(parseInt(p1));
        setPlayer2(parseInt(p2));
        setLoading(false);
    };

    const register = (player: number) => async () => {
        setLoading(true);
        const contract = ref.current;
        if (contract) {
            await contract.register(player);
            await initApp();
        }
        setLoading(false);
    };

    useEffect(() => {
        initApp();
    }, []);

    if (loading) return <div>Loading...</div>;

    return player1 && player2 ? (
        <PlayerBoard />
    ) : (
        <div
            className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
            `}
        >
            <h1>Register as a player</h1>
            {!player1 && <BigButton onClick={register(1)} title="Player 1" />}
            {!player2 && <BigButton onClick={register(2)} title="Player 2" />}
        </div>
    );
};

export default App;
