import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CommentLine from '../../components/Comments/';
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
            <div style={{ display: 'flex' }}>
                <div className='snippet-content'>
                    <h2 id='title'>{snippet.title}</h2>
                    <p>{snippet.language}</p>
                    <div style={{ minHeight: '305px' }}>
                        <ReactMarkdown
                            className='md'
                            children={snippet.description}
                        />
                    </div>
                    <h4 style={{ textAlign: 'center' }}>
                        Comments {snippet.comments.length}
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '0.85rem'
                        }}
                    >
                        <input
                            type='text'
                            placeholder='write your comment'
                            onChange={onCommentChange}
                            value={comment}
                            style={{ width: '100%', marginBottom: '4px' }}
                        />
                        <SendIcon
                            style={{ cursor: 'pointer' }}
                            onClick={submitComment}
                        />
                    </div>

                    <ul
                        style={{
                            listStyle: 'none',
                            height: '200px',
                            paddingLeft: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden',
                            overflowY: 'scroll'
                        }}
                    >
                        {snippet.comments.map((comment: Comment) => (
                            <CommentLine key={comment.id} comment={comment} />
                        ))}
                    </ul>
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
        </>
    );
}
