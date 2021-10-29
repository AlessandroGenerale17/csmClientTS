import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Code from '../../logic/Editor';

type Props = {
    codeToInject: string;
};

export default function Editor(props: Props) {
    const [js, setJs] = useState<string>(props.codeToInject);
    const [theme, setTheme] = useState<boolean>(false);

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

    return (
        <div style={{ border: '1px solid black', flex: 3 }}>
            <CodeMirror
                onChange={(value, _) => {
                    console.log(_);
                    setJs(value);
                }}
                value={js}
                extensions={[javascript({ jsx: true })]}
                height={code.height}
                width='600'
                tabIndex={code.tabIndex}
                theme='light'
            />
            {isRunnable && <button onClick={runCode}>Run</button>}
        </div>
    );
}
