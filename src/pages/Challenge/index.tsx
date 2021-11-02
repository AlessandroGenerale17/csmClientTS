import Editor from '../../components/Editor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChallenge } from '../../store/challenges/selectors';
import { fetchChallenge } from '../../store/challenges/actions';
import Loading from '../../components/Loading';
import Code from '../../logic/Editor';
import './index.css';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

export default function Challenge() {
    const [codeChallenge, setCodeChallenge] = useState<string>('');
    const challenge = useSelector(selectChallenge);
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    const code = new Code(450);

    useEffect(() => {
        if (!challenge || challenge.id !== id) dispatch(fetchChallenge(id));
        if (challenge !== null) setCodeChallenge(challenge.prompt);
    }, [dispatch, challenge]);

    // TODO here I take care of the state of stuff like test cases input
    // submission

    const handleCodeChange = (code: string) => {
        setCodeChallenge(code);
    };

    const displayOutput = () => {
        const out = runCode();
        console.log('output: ', out);
        // if the output matches
        if (typeof out === 'number' && out === 4)
            console.log('you passed a test');
    };

    const runCode = () => {
        try {
            const stringArgs = '[2, 2]';
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
            console.log(err);
        }
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
                    runCode={displayOutput}
                />
            </div>
            <div className='challenge-footer'>
                <div className='testcase'>TESTCASE INPUT</div>
                <div className='output'>OUTPUT</div>
            </div>
        </div>
    );
}
