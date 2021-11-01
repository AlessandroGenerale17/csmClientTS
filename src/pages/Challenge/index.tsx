import Editor from '../../components/Editor';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectChallenge } from '../../store/challenges/selectors';
import { fetchChallenge } from '../../store/challenges/actions';
import Loading from '../../components/Loading';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

export default function Question() {
    const challenge = useSelector(selectChallenge);
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    console.log(challenge);

    useEffect(() => {
        if (!challenge || challenge.id !== id) dispatch(fetchChallenge(id));
    }, [dispatch, challenge]);

    if (!challenge) return <Loading />;

    return (
        <div>
            <div>
                <h2>Question</h2>
                {/*<Editor />*/}
                <p>Some text about question MD format</p>
            </div>
            {/* <Editor
                type='code'
                className='editor-newSnippet'
                codeToInject={snippet.code}
                handleCodeChange={handleCodeChange}
                performDispatch={performDispatch}
                displayOutput={() => {}}
            /> */}
        </div>
    );
}
