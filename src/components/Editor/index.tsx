import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Code from '../../logic/Editor';
import Switch from '../Switch/';
import './index.css';

type Props = {
    type: string;
    className: string;
    prompt: string;
    hiddenPrompt: string;
    fName: string;
    handleCodeChange: (code: string) => void;
    performDispatch: () => void;
    displayOutput: (output: string) => void;
    // tableName: string;
    // // TODO perform dispatch to delete
    // performDispatch: (snippetsToDelete: readonly string[]) => void;
};

export default function Editor(props: Props) {
    const { type, handleCodeChange, prompt, hiddenPrompt, fName } = props;

    const [theme, setTheme] = useState<boolean>(false);
    // FIXME
    const { className } = props;

    const code = new Code(450);

    const runCode = () => {
        try {
            const args = [2, 2];
            // hidden prompt
            // prompt
            // fnName
            if (type === 'code') {
                code.setUserFn(hiddenPrompt, prompt, fName);
                console.log(code.fn);
                console.log(code.runFn(args));
                const output = code.runFn(args);
                console.log(typeof output);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const changeTheme = () => setTheme(() => !theme);
    // CTRL S TO SAVE
    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //     if (e.ctrlKey && e.key === 's') {
    //         dispatch(patchSnippet(props.id, js));
    //     }
    // };
    //style={{ border: '1px solid black', flex: 3 }}
    return (
        <div className={className}>
            <div className={`toolbar ${theme ? 'active' : ''}`}>
                <Switch changeTheme={changeTheme} />
                {/* <button onClick={runCode}>Run</button> */}
                {/*<button onClick={() => props.performDispatch()}>Save</button>*/}
            </div>
            <CodeMirror
                onChange={(value, _) => {
                    handleCodeChange(value);
                }}
                value={prompt}
                extensions={[javascript({ jsx: true })]}
                height={code.height}
                width='600'
                tabIndex={code.tabIndex}
                theme={theme ? 'light' : 'dark'}
            />
            {type === 'code' && <button onClick={runCode}>Run</button>}
        </div>
    );
}
