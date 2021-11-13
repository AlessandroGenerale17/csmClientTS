import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';
import LinearProgress from '../../components/LinearProgress/';
import {
    selectAppLoading,
    selectSaveLoading
} from '../../store/appState/selectors';
import { patchSnippet } from '../../store/snippets/actions';
import ReactMarkdown from 'react-markdown';
import AddSnippetForm from '../../components/AddSnippetForm';
import {
    OnChange,
    OnClick,
    OnClickFormDiv,
    OnSubmit
} from '../../Types/EventListener';
import { showAlertWithTimeout } from '../../store/appState/actions';
import { isFormValid } from '../../Lib/Validators';
import { FormState } from '../../Types/FormState';
import { handleFormChange } from '../../Lib/FormChange';
import { selectUser } from '../../store/user/selectors';
import { Comment } from '../../Types/Comment';
import SendIcon from '@mui/icons-material/Send';
import CommentLine from '../../components/Comments';
import {
    createComment,
    createLike,
    removeLike
} from '../../store/homeState/actions';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Avatar from '../../components/Avatar/';
import moment from 'moment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './index.css';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

const initialFormState = {
    title: { value: '', err: false },
    description: { value: '', err: false },
    language: { value: -1, err: false },
    code: '',
    pub: false,
    issue: false,
    isOpen: false
};

export default function Snippet() {
    const id = parseInt(useParams<ParamTypes>().id);
    const [comment, setComment] = useState<string>('');
    const dispatch = useDispatch();
    const snippet = useSelector(selectSnippet);
    const loading = useSelector(selectAppLoading);
    const saveLoading = useSelector(selectSaveLoading);
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const user = useSelector(selectUser);

    useEffect(() => {
        // IMPORTANT
        if (!snippet || snippet.id !== id) dispatch(fetchSnippet(id));
        if (snippet !== null) {
            setFormState({
                title: { value: snippet.title, err: false },
                description: { value: snippet.description, err: false },
                code: snippet.code,
                language: { value: snippet.language.id, err: false },
                pub: snippet.public,
                issue: snippet.issue,
                isOpen: false
            });
        }
    }, [dispatch, snippet]);

    if (loading || !snippet) return <Loading />;

    const handleCodeChange = (code: string) =>
        setFormState({
            ...formState,
            code: code
        });

    const formChange = (e: OnChange) => handleFormChange(e, setFormState);

    const handleFormSubmit = (e: OnSubmit) => {
        e.preventDefault();
        const { title, description, code, language, pub, issue } = formState;
        const validForm = isFormValid(formState, setFormState);

        if (validForm.length === 0)
            dispatch(
                patchSnippet(
                    id,
                    title.value,
                    description.value,
                    code,
                    language.value,
                    pub,
                    issue
                )
            );
        else
            dispatch(
                showAlertWithTimeout(
                    `Please enter something for field${
                        validForm.length > 1 ? 's' : ''
                    }: ${validForm.toString().split(',').join(', ')}`,
                    'error'
                )
            );
    };

    const submitComment = () => {
        setComment('');
        comment.trim().length && dispatch(createComment(snippet.id, comment));
    };

    const saveCode = () => {
        const { title, description, code, language, pub, issue } = formState;
        if (code !== snippet.code)
            dispatch(
                patchSnippet(
                    id,
                    title.value,
                    description.value,
                    code,
                    language.value,
                    pub,
                    issue
                )
            );
    };

    const handleFormClick = (e: OnClickFormDiv) => {
        setFormState((prevFormState) => ({
            ...formState,
            isOpen: !prevFormState.isOpen
        }));
    };

    const closeForm = (e: OnClick) => {
        setFormState({
            title: { value: snippet.title, err: false },
            description: { value: snippet.description, err: false },
            language: { value: snippet.language.id, err: false },
            code: snippet.code,
            pub: snippet.public,
            issue: snippet.issue,
            isOpen: false
        });
    };

    const showLikes = snippet.public && !snippet.issue;
    const isLiked = snippet.likes.map((like) => like.userId).includes(user?.id);
    return (
        <div className='snippet-page'>
            {!formState.isOpen ? (
                <div className='snippet-content'>
                    <div onClick={handleFormClick}>
                        <h2 id='title'>{snippet.title}</h2>
                        <div className='meta-snippet'>
                            <div>
                                <p>
                                    <b>Language:</b> {snippet.language.name}
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
                                    <p>
                                        <b>Created on: </b>
                                        {moment(snippet.createdAt).format(
                                            'DD-MM-YY'
                                        )}
                                    </p>
                                    <p>
                                        <b>Last edit: </b>
                                        {moment(snippet.updatedAt).fromNow()}
                                    </p>
                                    {/* {showLikes && (
                                        <div>
                                            {!isLiked ? (
                                                <FavoriteBorderIcon
                                                    className='like-button'
                                                    style={{ color: 'red' }}
                                                    onClick={() =>
                                                        dispatch(
                                                            createLike(
                                                                snippet.id
                                                            )
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <FavoriteIcon
                                                    className='like-button'
                                                    style={{
                                                        color: 'red'
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            removeLike(
                                                                snippet.id
                                                            )
                                                        )
                                                    }
                                                />
                                            )}
                                            {snippet.likes.length}
                                        </div>
                                    )} */}
                                </div>
                            </div>
                            {snippet.issue && (
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
                        {snippet.public && (
                            <h2 style={{ textAlign: 'center' }}>
                                Comments {snippet.comments.length}
                            </h2>
                        )}
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
            ) : (
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={formChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    form={formState}
                    langId={snippet.language.id}
                />
            )}
            <div className='editor-container'>
                <Editor
                    type='snippet'
                    className='editor-newSnippet'
                    prompt={snippet.code}
                    language={formState.language.value}
                    handleCodeChange={handleCodeChange}
                    runCode={() => {}}
                    saveCode={saveCode}
                    submitSolution={() => {}}
                    editable={true}
                />
                {saveLoading && <LinearProgress />}
            </div>
        </div>
    );
}
