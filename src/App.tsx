import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { Contract, JsonRpcProvider, Wallet } from 'ethers';
import { CONTRACT_ADDRESS } from './constants';
import { CONTRACT_API } from './data';
import { PlayerBoard } from './PlayerBoard';
import { BigButton } from './BigButton';
import { SignInModule } from './SignInModule';

const App = () => {
    const refContract = useRef<Contract | null>(null);
    const refProvider = useRef<Wallet | null>(null);
    const [signIn, setSignIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [player1, setPlayer1] = useState<number | null>(null);
    const [player2, setPlayer2] = useState<number | null>(null);

    const initApp = async () => {
        setLoading(true);
        const provider = new JsonRpcProvider();
        const signer = await provider.getSigner();
        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, signer);

        refContract.current = contract;

        const [p1, p2] = await Promise.all([contract.player1(), contract.player2()]);

        setPlayer1(parseInt(p1));
        setPlayer2(parseInt(p2));
        setLoading(false);
    };

    const register = (player: number) => async () => {
        setLoading(true);
        if (!refProvider.current) {
            setSignIn(true);
            setLoading(false);
            return;
        }

        const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_API, refProvider.current);

        await contract.register(player);
        await initApp();

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
            {signIn && (
                <SignInModule
                    close={(signer) => {
                        if (signer) {
                            refProvider.current = signer;
                        }
                        setSignIn(false);
                    }}
                />
            )}
        </div>
    );
};

export default App;
