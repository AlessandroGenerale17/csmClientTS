import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createSnippet, fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { patchSnippet } from '../../store/snippets/actions';
import ReactMarkdown from 'react-markdown';
import AddSnippetForm from '../../components/AddSnippetForm';
import {
    OnChange,
    OnClick,
    OnClickFormDiv,
    OnSubmit
} from '../../Types/EventListener';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const [formState, setFormState] = useState<FormState>(initialFormState);

    useEffect(() => {
        dispatch(fetchSnippet(id));
        if (snippet !== null)
            setFormState({
                ...snippet,
                isOpen: false
            });
    }, [dispatch]);

    if (loading || !snippet) return <Loading />;

    const handleCodeChange = (code: string) => {
        setFormState({
            ...formState,
            code: code
        });
    };

    const handleFormChange = (e: OnChange) =>
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });

    const handleFormSubmit = async (e: OnSubmit) => {
        e.preventDefault();
        // TODO Check form validity...
        console.log('submitting ', formState);
        const { title, description, code } = formState;
        dispatch(patchSnippet(id, title, description, code));
        setFormState(initialFormState);
        // history.push('/manager');
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

    const performDispatch = () => {};
    /* TODO make form appear when user clicks on an 'editable' field */
    /* const addPizza = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(add(formState));
        // clear form
        setFormState({ name: '', description: '' });

    }; */
    return (
        <div style={{ display: 'flex' }}>
            {!formState.isOpen ? (
                <div style={{ flex: 2 }} onClick={handleFormClick}>
                    <h2 id='title'>{snippet.title}</h2>

                    <h2 style={{ textAlign: 'center' }}>Notes</h2>
                    <div>
                        <ReactMarkdown children={snippet.description} />
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
            <Editor
                type='snippet'
                className='editor-newSnippet'
                codeToInject={snippet.code}
                handleCodeChange={handleCodeChange}
                performDispatch={performDispatch}
                displayOutput={() => {}}
            />
        </div>
    );
}
