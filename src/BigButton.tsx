import { css } from '@emotion/css';

export const BigButton: React.FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={css`
                margin: 10px;
                padding: 10px;
                font-size: 20px;
                font-weight: bold;
                color: white;
                border-radius: 5px;
                background-color: #007bff;
                &:hover {
                    background-color: #0069d9;
                }
            `}
        >
            {title}
        </button>
    );
};
