import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddSnippetForm from '../../components/AddSnippetForm';
import Editor from '../../components/Editor';
import { OnChange, OnClick, OnSubmit } from '../../Types/EventListener';
import { createSnippet } from '../../store/snippets/actions';
import { useHistory } from 'react-router-dom';
import { showFormAlertWithTimeout } from '../../store/appState/actions';
import './index.css';

type FormState = {
    title: { value: string; err: boolean };
    description: { value: string; err: boolean };
    code: string;
};

const initialFormState = {
    title: { value: '', err: false },
    description: { value: '', err: false },
    code: ''
};

export default function NewSnippet() {
    const [formState, setFormState] = useState<FormState>(initialFormState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleCodeChange = (code: string) => {
        setFormState({
            ...formState,
            code: code
        });
    };

    const handleFormChange = (e: OnChange) =>
        setFormState({
            ...formState,
            [e.target.id]: { value: e.target.value, err: false }
        });

    const dispatchFormError = (inputFieldLabel: string) =>
        dispatch(
            showFormAlertWithTimeout(
                `Please provide a ${inputFieldLabel}  to your snippet`
            )
        );

    const handleFormSubmit = async (e: OnSubmit) => {
        e.preventDefault();
        const { code } = formState;
        const description = formState.description.value;
        const title = formState.title.value;

        if (!title.trim().length) {
            dispatchFormError('title');
            setFormState(() => ({
                ...formState,
                title: { value: formState.title.value, err: true }
            }));
        } else if (!description.trim().length) {
            dispatchFormError('description');
            setFormState(() => ({
                ...formState,
                description: {
                    value: formState.description.value,
                    err: true
                }
            }));
        } else {
            dispatch(createSnippet(title, description, code));
            setFormState(initialFormState);
            history.push('/manager');
        }
    };

    console.log(formState);

    const closeForm = (e: OnClick) => history.push('/manager');

    return (
        <div className='page'>
            <h1>Fill in the form to add a new snippet!</h1>
            <div className='content-container'>
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    title={formState.title}
                    description={formState.description}
                />
                <Editor
                    className='editor-newSnippet'
                    type='snippet'
                    handleCodeChange={handleCodeChange}
                    prompt={formState.code}
                    saveCode={() => {}}
                    runCode={() => {}}
                    submitSolution={() => {}}
                />
            </div>
        </div>
    );
}
