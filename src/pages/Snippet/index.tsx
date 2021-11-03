import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import './index.css';
import { showFormAlertWithTimeout } from '../../store/appState/actions';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

type FormState = {
    title: string;
    description: string;
    code: string;
    isOpen: boolean;
};

const initialFormState = {
    title: '',
    description: '',
    code: '',
    isOpen: false
};

export default function Snippet() {
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    const snippet = useSelector(selectSnippet);
    const loading = useSelector(selectAppLoading);
    const saveLoading = useSelector(selectSaveLoading);
    const [formState, setFormState] = useState<FormState>(initialFormState);

    useEffect(() => {
        // IMPORTANT
        if (!snippet || snippet.id !== id) dispatch(fetchSnippet(id));
        if (snippet !== null)
            setFormState({
                ...snippet,
                isOpen: false
            });
    }, [dispatch, snippet]);

    if (loading || !snippet) return <Loading />;

    const handleCodeChange = (code: string) =>
        setFormState({
            ...formState,
            code: code
        });

    const handleFormChange = (e: OnChange) => {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    };

    const handleFormSubmit = (e: OnSubmit) => {
        e.preventDefault();
        const { title, description, code } = formState;

        if (!title.trim().length)
            dispatch(
                showFormAlertWithTimeout(
                    'Please provide a title to your snippet'
                )
            );
        else {
            dispatch(patchSnippet(id, title, description, code));
            setTimeout(() => setFormState(initialFormState), 1500);
        }
    };

    const saveCode = () => {
        const { title, description, code } = formState;
        dispatch(patchSnippet(id, title, description, code));
    };

    const handleFormClick = (e: OnClickFormDiv) => {
        setFormState((prevFormState) => ({
            ...formState,
            isOpen: !prevFormState.isOpen
        }));
    };

    const closeForm = (e: OnClick) => {
        setFormState({
            ...snippet,
            isOpen: false
        });
    };

    return (
        <div className='snippet-page'>
            {!formState.isOpen ? (
                <div className='snippet-content' onClick={handleFormClick}>
                    <h2 id='title'>{snippet.title}</h2>
                    <div className='markdown'>
                        <ReactMarkdown
                            className='md'
                            children={snippet.description}
                        />
                    </div>
                </div>
            ) : (
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    title={formState.title}
                    description={formState.description}
                />
            )}
            <div className='editor-container'>
                <Editor
                    type='snippet'
                    className='editor-newSnippet'
                    prompt={snippet.code}
                    handleCodeChange={handleCodeChange}
                    runCode={() => {}}
                    saveCode={saveCode}
                    submitSolution={() => {}}
                />
                {saveLoading && <LinearProgress />}
            </div>
        </div>
    );
}
