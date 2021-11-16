import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import Switch from '../Switch/';
import PlayButton from '../Button/PlayButton';
import SubmitSolutionButton from '../Button/SubmitSolutionButton';
import { Keyboard } from '../../types/EventListener';
import './index.css';

type Props = {
    type: string;
    className: string;
    prompt: string;
    language: number;
    editable: boolean;
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
        language,
        editable
    } = props;

    const [theme, setTheme] = useState<boolean>(true);

    const changeTheme = () => setTheme(() => !theme);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'r') {
            runCode();
        }
        if (e.ctrlKey && e.key === 's') {
            saveCode();
        }
    };

    const languages: any[] = [[], javascript({ jsx: true }), java(), cpp()];

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
                style={{
                    border: '1px solid black'
                }}
                value={prompt}
                extensions={languages[language]}
                height='620px'
                width='600'
                tabIndex={2}
                theme={theme ? 'light' : 'dark'}
                editable={editable}
            />
        </div>
    );
}
