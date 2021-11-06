import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CommentLine from '../../components/CommentLine';
import SendIcon from '@mui/icons-material/Send';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';
import { fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';
import { Comment } from '../../Types/Comment';
import { OnChange } from '../../Types/EventListener';
import { createComment } from '../../store/homeState/actions';

type ParamTypes = {
    id: string;
};

export default function SnippetDetails() {
    const [comment, setComment] = useState<string>('');
    const dispatch = useDispatch();
    const { id } = useParams<ParamTypes>();
    const snippet = useSelector(selectSnippet);

    const onCommentChange = (e: OnChange) => setComment(e.target.value);
    const submitComment = () => {
        setComment('');
        comment.trim().length && dispatch(createComment(parseInt(id), comment));
    };

    useEffect(() => {
        dispatch(fetchSnippet(parseInt(id)));
    }, []);

    if (!snippet) return <Loading />;

    return (
        <>
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
            <div>
                <h2>Comments</h2>
                <div>
                    <input
                        type='text'
                        placeholder='write your comment'
                        onChange={onCommentChange}
                        value={comment}
                    />
                    <SendIcon
                        style={{ cursor: 'pointer' }}
                        onClick={submitComment}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <ul style={{ listStyle: 'none' }}>
                        {snippet.comments.map((comment: Comment) => (
                            <CommentLine key={comment.id} comment={comment} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
