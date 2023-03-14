import { css } from '@emotion/css';
import { JsonRpcProvider, Wallet } from 'ethers';
import { useCallback, useState } from 'react';
import { BigButton } from './BigButton';

export const SignInModule: React.FC<{ close: (w?: Wallet) => void }> = ({ close }) => {
    const [key, setKey] = useState('');

    const signIn = useCallback(async () => {
        const provider = new JsonRpcProvider();
        close(new Wallet(key, provider));
    }, [close, key]);

    return (
        <div
            className={css`
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            `}
        >
            <div
                className={css`
                    background-color: white;
                    height: 200px;
                    width: 400px;
                    border-radius: 10px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                `}
            >
                <button
                    onClick={() => close()}
                    className={css`
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    `}
                >
                    x
                </button>
                <h2>Sign In</h2>
                <input placeholder="private key" onChange={(e) => setKey(e.currentTarget.value)} />
                <BigButton onClick={signIn} title="Sign In" />
            </div>
        </div>
    );
};
