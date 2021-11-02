import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import Switch from '../Switch/';
import PlayButton from '../Button/PlayButton';
import './index.css';
import SubmitSolutionButton from '../Button/SubmitSolutionButton';

type Props = {
    type: string;
    className: string;
    prompt: string;
    handleCodeChange: (code: string) => void;
    submitSolution: () => void;
    runCode: () => void;
    // performDispatch: () => void;
    // displayOutput: () => void;
    // tableName: string;
    // // TODO perform dispatch to delete
    // performDispatch: (snippetsToDelete: readonly string[]) => void;
};

export default function Editor(props: Props) {
    const { type, prompt, handleCodeChange, runCode, submitSolution } = props;

    const [theme, setTheme] = useState<boolean>(false);
    // FIXME
    const { className } = props;

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
                {type === 'code' && (
                    <>
                        <PlayButton handleClick={runCode} />
                        <SubmitSolutionButton handleClick={submitSolution} />
                    </>
                )}
            </div>
            <CodeMirror
                onChange={(value, _) => {
                    handleCodeChange(value);
                }}
                value={prompt}
                extensions={[javascript({ jsx: true })]}
                height='450px'
                width='600'
                tabIndex={2}
                theme={theme ? 'light' : 'dark'}
            />
        </div>
    );
}
