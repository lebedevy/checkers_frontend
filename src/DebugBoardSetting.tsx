import { useState } from 'react';
import { useStore } from './storeContext';

export const DebugBoardSetting: React.FC = () => {
    const debug = useStore((s) => s.debug);
    const debugBoard = useStore((s) => s.debugBoard);
    const setDebug = useStore((s) => s.setDebug);
    const setDebugBoard = useStore((s) => s.setDebugBoard);
    const [input, setInput] = useState(debugBoard);

    return (
        <div>
            <input
                type="checkbox"
                checked={debug}
                onChange={(e) => setDebug(e.currentTarget.checked)}
            ></input>
            <label>debug</label>
            {debug && <input onChange={(e) => setInput(e.currentTarget.value)} value={input} />}
            <button onClick={() => setDebugBoard(input)}>Set</button>
        </div>
    );
};
