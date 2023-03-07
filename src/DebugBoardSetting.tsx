import { useState } from 'react';
import { useDebugStore } from './debugStore';
import { useStore } from './storeContext';

export const DebugBoardSetting: React.FC = () => {
    const board = useStore((s) => s.board);
    const debug = useDebugStore((s) => s.debug);
    const debugIndex = useDebugStore((s) => s.debugIndex);
    const debugBoard = useDebugStore((s) => s.debugBoard);
    const setDebug = useDebugStore((s) => s.setDebug);
    const setDebugIndex = useDebugStore((s) => s.setDebugIndex);
    const setDebugBoard = useDebugStore((s) => s.setDebugBoard);
    const [input, setInput] = useState(debugBoard);

    return (
        <div>
            <input
                type="checkbox"
                checked={debug}
                onChange={(e) => setDebug(e.currentTarget.checked)}
            />
            <label>debug</label>
            {debug && <input onChange={(e) => setInput(e.currentTarget.value)} value={input} />}
            <button onClick={() => setDebugBoard(input)}>Set</button>
            <div>
                <label>{BigInt('0b' + (debug ? debugBoard : board)).toString()}</label>
            </div>
            <input
                type="checkbox"
                checked={debugIndex}
                onChange={(e) => setDebugIndex(e.currentTarget.checked)}
            />
            <label>Debug index</label>
        </div>
    );
};
