import Editor from '../../components/Editor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChallenge } from '../../store/challenges/selectors';
import { fetchChallenge } from '../../store/challenges/actions';
import Loading from '../../components/Loading';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

export default function Challenge() {
    const [codeChallenge, setCodeChallenge] = useState<string>('');
    const challenge = useSelector(selectChallenge);
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!challenge || challenge.id !== id) dispatch(fetchChallenge(id));
        if (challenge !== null) setCodeChallenge(challenge.prompt);
    }, [dispatch, challenge]);

    // TODO here I take care of the state of stuff like test cases input
    // submission

    const handleCodeChange = (code: string) => {
        setCodeChallenge(code);
    };

    const displayOutput = (output: string) => {
        console.log(output);
    };
    console.log(challenge);

    if (!challenge) return <Loading />;

    return (
        <div>
            <div>
                <h2>Question</h2>
                {/*<Editor />*/}
                <p>Some text about question MD format</p>
            </div>
            <Editor
                type='code'
                className='editor-newSnippet'
                prompt={codeChallenge}
                hiddenPrompt={
                    challenge.hiddenPrompt ? challenge.hiddenPrompt : ''
                }
                fName={challenge.fName}
                handleCodeChange={handleCodeChange}
                performDispatch={() => {}}
                displayOutput={displayOutput}
            />
        </div>
    );
}
