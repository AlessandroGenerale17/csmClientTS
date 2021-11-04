import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';
import { fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';

type ParamTypes = {
    id: string;
};

export default function SnippetDetails() {
    const dispatch = useDispatch();
    const { id } = useParams<ParamTypes>();
    const snippet = useSelector(selectSnippet);

    useEffect(() => {
        dispatch(fetchSnippet(parseInt(id)));
    }, []);

    if (!snippet) return <Loading />;
    return (
        <div className='snippet-page'>
            <div className='snippet-content'>
                <h2 id='title'>{snippet.title}</h2>
                <p>{snippet.language}</p>
                <div className='markdown'>
                    <ReactMarkdown
                        className='md'
                        children={snippet.description}
                    />
                </div>
                {/* <div>TAGS</div> */}
            </div>
            <div className='editor-container'>
                <Editor
                    type='snippet'
                    className='editor-newSnippet'
                    prompt={snippet.code}
                    language={snippet.languageId}
                    handleCodeChange={() => {}}
                    runCode={() => {}}
                    saveCode={() => {}}
                    submitSolution={() => {}}
                    editable={false}
                />
            </div>
        </div>
    );
}
