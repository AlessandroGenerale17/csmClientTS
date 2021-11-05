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
import { isFormValid } from '../../Lib/Validators';
import { FormState } from '../../Types/FormState';
import { handleFormChange } from '../../Lib/FormChange';

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
    const dispatch = useDispatch();
    const snippet = useSelector(selectSnippet);
    const loading = useSelector(selectAppLoading);
    const saveLoading = useSelector(selectSaveLoading);
    const [formState, setFormState] = useState<FormState>(initialFormState);

    useEffect(() => {
        // IMPORTANT
        if (!snippet || snippet.id !== id) dispatch(fetchSnippet(id));
        if (snippet !== null) {
            setFormState({
                title: { value: snippet.title, err: false },
                description: { value: snippet.description, err: false },
                code: snippet.code,
                language: { value: snippet.languageId, err: false },
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
                showFormAlertWithTimeout(
                    `Please enter something for field${
                        validForm.length > 1 ? 's' : ''
                    }: ${validForm.toString().split(',').join(', ')}`
                )
            );
    };

    const saveCode = () => {
        const { title, description, code, language, pub, issue } = formState;
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
            language: { value: snippet.languageId, err: false },
            code: snippet.code,
            pub: snippet.public,
            issue: snippet.issue,
            isOpen: false
        });
    };

    return (
        <div className='snippet-page'>
            {!formState.isOpen ? (
                <div className='snippet-content' onClick={handleFormClick}>
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
            ) : (
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={formChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    form={formState}
                    langId={snippet.languageId}
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
