import Editor from '../../components/Editor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChallenge } from '../../store/challenges/selectors';
import { fetchChallenge } from '../../store/challenges/actions';
import Loading from '../../components/Loading';
import Code from '../../logic/Editor';
import './index.css';
import { OnChangeInput } from '../../Types/EventListener';

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
    const [outputCode, setOutputCode] = useState<CodeOutput>({
        error: false,
        value: ''
    });
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

    // const displayOutput = () => {
    //     const out = runCode();
    //     console.log('output: ', out);
    //     // if the output matches
    //     if (typeof out === 'number' && out === 4)
    //         console.log('you passed a test');
    // };

    const submitSolution = () => {
        if (challenge !== null) {
            let score = 0;
            const total = challenge.testcases.length;
            let failed: number[] = [];

            challenge.testcases.forEach((testcase, index) => {
                const solution = JSON.parse(testcase.solution);
                const output = runCode(testcase.args);
                console.log('output ', output);
                console.log('solution ', solution);
                if (output !== solution || typeof output !== typeof solution) {
                    console.log('failed');
                    failed = [...failed, index];
                } else {
                    score += 1;
                }
            });
            console.log('score ', score, total);
        }
    };

    const runCode = (stringArgs: string) => {
        try {
            const args = JSON.parse(stringArgs);
            if (challenge !== null) {
                const hiddenCode = challenge.hiddenPrompt
                    ? challenge.hiddenPrompt
                    : '';
                code.setUserFn(hiddenCode, codeChallenge, challenge.fName);
                const output = code.runFn(args);
                return output;
            }
        } catch (err) {
            if (err instanceof Error)
                return { error: `${err} : ${err.message}` };
        }
    };

    const runCodeWithTestCase = () => {
        const out = runCode(localTestcase);
        if (out.error) setOutputCode({ error: true, value: out.error });
        else setOutputCode({ error: false, value: JSON.stringify(out) });
    };

    if (!challenge) return <Loading />;

    return (
        <div className='challenge-page'>
            <div className='challenge'>
                <div className='challenge-details'>
                    <h2>Question</h2>
                    {/*<Editor />*/}
                    <p>Some text about question MD format</p>
                </div>
                <Editor
                    type='code'
                    className='editor-newSnippet'
                    prompt={codeChallenge}
                    handleCodeChange={handleCodeChange}
                    submitSolution={submitSolution}
                    runCode={runCodeWithTestCase}
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
                <div className={`output ${outputCode.error && 'error'}`}>
                    <p>{outputCode.value}</p>
                </div>
            </div>
        </div>
    );
}
