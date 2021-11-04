import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import Switch from '../Switch/';
import PlayButton from '../Button/PlayButton';
import SubmitSolutionButton from '../Button/SubmitSolutionButton';
import { Keyboard } from '../../Types/EventListener';
import './index.css';

type Props = {
    type: string;
    className: string;
    prompt: string;
    language: number;
    handleCodeChange: (code: string) => void;
    submitSolution: () => void;
    runCode: () => void;
    saveCode: () => void;
};

export default function Editor(props: Props) {
    const {
        type,
        prompt,
        className,
        handleCodeChange,
        runCode,
        submitSolution,
        saveCode,
        language
    } = props;

    const [theme, setTheme] = useState<boolean>(false);

    const changeTheme = () => setTheme(() => !theme);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'r') {
            runCode();
        }
        if (e.ctrlKey && e.key === 's') {
            saveCode();
        }
    };

    const languages: any[] = [[], javascript({ jsx: true }), java()];

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
                onKeyDown={(e: Keyboard) => handleKeyDown(e)}
                style={{ border: '1px solid black' }}
                value={prompt}
                extensions={languages[language]}
                height='450px'
                width='600'
                tabIndex={2}
                theme={theme ? 'light' : 'dark'}
            />
        </div>
    );
}
