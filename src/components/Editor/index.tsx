import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useDispatch } from 'react-redux';
import Code from '../../logic/Editor';
import Switch from '../Switch/';
import { patchSnippet } from '../../store/snippets/actions';

type SnippetProp = {
    type: 'snippet';
    codeToInject: string;
    id: number;
};

type CodeProp = {
    type: '';
    codeToInject: string;
    id: number;
};

type Props = SnippetProp | CodeProp;

export default function Editor(props: Props) {
    const [js, setJs] = useState<string>(props.codeToInject);
    const [theme, setTheme] = useState<boolean>(false);
    const dispatch = useDispatch();
    // FIXME
    const isRunnable = false;

    const code = new Code(450);

    const runCode = () => {
        try {
            const args = [2, 2];
            code.setUserFn('const c = 1;', js, 'add');
            console.log(code.fn);
            console.log(code.runFn(args));
        } catch (err) {
            console.log(err);
        }
    };

    const changeTheme = () => setTheme(() => !theme);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 's') {
            dispatch(patchSnippet(props.id, js));
        }
    };

    return (
        <div style={{ border: '1px solid black', flex: 3 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backgroundColor: 'red'
                }}
            >
                <Switch changeTheme={changeTheme} />
                {/* <button onClick={runCode}>Run</button> */}
                <button onClick={() => dispatch(patchSnippet(props.id, js))}>
                    Save
                </button>
            </div>
            <CodeMirror
                onChange={(value, _) => {
                    setJs(value);
                }}
                value={js}
                extensions={[javascript({ jsx: true })]}
                height={code.height}
                width='600'
                tabIndex={code.tabIndex}
                theme={theme ? 'light' : 'dark'}
                onKeyDown={handleKeyDown}
            />
            {isRunnable && <button onClick={runCode}>Run</button>}
        </div>
    );
}
