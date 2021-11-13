import { useEffect, useState } from 'react';
import moment from 'moment';
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
import {
    createComment,
    createLike,
    removeLike
} from '../../store/homeState/actions';
import { selectUser } from '../../store/user/selectors';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
type ParamTypes = {
    id: string;
};

export default function SnippetDetails() {
    const [comment, setComment] = useState<string>('');
    const dispatch = useDispatch();
    const { id } = useParams<ParamTypes>();
    const snippet = useSelector(selectSnippet);
    const user = useSelector(selectUser);

    const submitComment = () => {
        setComment('');
        comment.trim().length && dispatch(createComment(parseInt(id), comment));
    };

    useEffect(() => {
        dispatch(fetchSnippet(parseInt(id)));
    }, []);

    if (!snippet) return <Loading />;

    const showChat = snippet.issue && user;
    const isLiked = snippet.likes.map((like) => like.userId).includes(user?.id);

    return (
        <div className='snippet-page' style={{ display: 'flex' }}>
            <div className='snippet-content'>
                <div>
                    <h2 id='title'>{snippet.title}</h2>
                    <div className='meta-snippet'>
                        <div>
                            <p>
                                <b>Language:</b> {snippet.language.name}
                            </p>
                            <p>
                                <b>Created on: </b>
                                {moment(snippet.createdAt).format('DD-MM-YY')}
                            </p>
                            <p>
                                <b>Last edit: </b>
                                {moment(snippet.updatedAt).fromNow()}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <b>Author:</b>{' '}
                                <Avatar
                                    imgUrl={snippet.user.imgUrl}
                                    alt={snippet.user.name}
                                />
                                {snippet.user.name}
                            </div>
                            <div>
                                {!isLiked ? (
                                    <FavoriteBorderIcon
                                        className='like-button'
                                        style={{ color: 'red' }}
                                        onClick={() =>
                                            dispatch(createLike(snippet.id))
                                        }
                                    />
                                ) : (
                                    <FavoriteIcon
                                        className='like-button'
                                        style={{ color: 'red' }}
                                        onClick={() =>
                                            dispatch(removeLike(snippet.id))
                                        }
                                    />
                                )}
                                {snippet.likes.length}
                            </div>
                        </div>
                        {showChat && (
                            <div>
                                <Button>
                                    <Link to={`/chat/${id}`}>
                                        Join Discussion
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className='md' style={{ minHeight: '305px' }}>
                        <ReactMarkdown children={snippet.description} />
                    </div>
                    <h2 style={{ textAlign: 'center' }}>
                        Comments {snippet.comments.length}
                    </h2>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '0.85rem'
                    }}
                >
                    {user?.id && snippet.public && (
                        <>
                            <TextField
                                style={{ width: '100%' }}
                                label='Comment'
                                name='comment'
                                variant='outlined'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <SendIcon
                                style={{ cursor: 'pointer' }}
                                onClick={submitComment}
                            />
                        </>
                    )}
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
                    language={snippet.language.id}
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
