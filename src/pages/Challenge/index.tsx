import Editor from '../../components/Editor';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChallenge } from '../../store/challenges/selectors';
import { fetchChallenge } from '../../store/challenges/actions';
import Loading from '../../components/Loading';
import { OnChangeInput } from '../../Types/EventListener';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Code from '../../Logic/Editor';
import './index.css';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

type CodeOutput = {
    error: boolean;
    value: string;
};

export default function Challenge() {
    const [codeChallenge, setCodeChallenge] = useState<string>('');
    const [localTestcase, setLocalTestcase] = useState<string>('');
    const [output, setOutput] = useState<CodeOutput[]>([]);
    const challenge = useSelector(selectChallenge);
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    const code = new Code(450);

    useEffect(() => {
        if (!challenge || challenge.id !== id) dispatch(fetchChallenge(id));
        if (challenge !== null) {
            setCodeChallenge(challenge.prompt);
            setLocalTestcase(challenge.testcases[0].args);
        }
    }, [dispatch, challenge]);

    // TODO here I take care of the state of stuff like test cases input
    // submission
    const handleCodeChange = (code: string) => {
        setCodeChallenge(code);
    };

    const submitSolution = () => {
        const submitOutput: CodeOutput[] = [];
        if (challenge !== null) {
            challenge.testcases.forEach((testcase, index) => {
                const solution = JSON.parse(testcase.solution);
                const out = runCode(testcase.args);
                if (out !== solution || typeof out !== typeof solution) {
                    console.log('failed ');
                    submitOutput.push({
                        error: true,
                        value: `Testcase ${index + 1} failed`
                    });
                } else {
                    submitOutput.push({
                        error: false,
                        value: `Testcase ${index + 1} passed`
                    });
                }
            });
            setOutput(submitOutput);
        }
    };

    const runCode = (stringArgs: string) => {
        try {
            const args = JSON.parse(stringArgs);
            if (challenge !== null) {
                if (args.length !== 2)
                    return {
                        error: `Provided ${args.length} arguments, but the function expects ${challenge.numArgs}`
                    };
                const hiddenCode = challenge.hiddenPrompt
                    ? challenge.hiddenPrompt
                    : '';
                code.setUserFn(
                    hiddenCode,
                    codeChallenge,
                    challenge.fName,
                    args
                );
                const output = code.runFn();
                return output;
            }
        } catch (err) {
            if (err instanceof Error) return { error: `${err}` };
            console.log(err);
        }
    };

    const runCodeWithTestCase = () => {
        const out = runCode(localTestcase);
        if (out.error) setOutput([{ error: true, value: out.error }]);
        else setOutput([{ error: false, value: JSON.stringify(out) }]);
    };

    if (!challenge) return <Loading />;

    return (
        <div className='challenge-page'>
            <div className='challenge'>
                <div className='challenge-details'>
                    <h2>Question</h2>
                    <p>Some text about question MD formatSome text about</p>
                </div>
                <Editor
                    type='code'
                    className='editor-newSnippet'
                    prompt={codeChallenge}
                    handleCodeChange={handleCodeChange}
                    submitSolution={submitSolution}
                    runCode={runCodeWithTestCase}
                    saveCode={() => {}}
                />
            </div>
            <div className='challenge-footer'>
                <div className='testcase'>
                    <label htmlFor='testcase-input'>Testcase</label>
                    <input
                        id='testcase-input'
                        type='text'
                        value={localTestcase}
                        onChange={(e: OnChangeInput) =>
                            setLocalTestcase(e.target.value)
                        }
                    />
                </div>
                <div className='output'>
                    {output.map((out, index) => (
                        <p
                            key={index}
                            style={{
                                color: `${out.error ? 'red' : ' #adff2f'}`
                            }}
                        >
                            {out.error ? (
                                <CancelIcon style={{ color: 'red' }} />
                            ) : (
                                output.length > 1 && (
                                    <CheckBoxIcon
                                        style={{ color: '#adff2f' }}
                                    />
                                )
                            )}
                            {out.value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
