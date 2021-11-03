import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddSnippetForm from '../../components/AddSnippetForm';
import Editor from '../../components/Editor';
import { OnChange, OnClick, OnSubmit } from '../../Types/EventListener';
import { createSnippet } from '../../store/snippets/actions';
import { useHistory } from 'react-router-dom';
import { showFormAlertWithTimeout } from '../../store/appState/actions';
import { isFormValid } from '../../Lib/Validators';
import { FormState } from '../../Types/FormState';
import './index.css';

const initialFormState = {
    title: { value: '', err: false },
    description: { value: '', err: false },
    language: { value: -1, err: false },
    code: '',
    isOpen: true
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

    const handleFormChange = (e: OnChange) => {
        console.log(e.target.name, e.target.value);
        setFormState({
            ...formState,
            [e.target.name]: { value: e.target.value, err: false }
        });
    };

    const handleFormSubmit = async (e: OnSubmit) => {
        e.preventDefault();
        const { title, description, code, language } = formState;
        const validForm = isFormValid(formState, setFormState);

        if (validForm.length === 0) {
            dispatch(createSnippet(title.value, description.value, code));
            setFormState(initialFormState);
            history.push('/manager');
        } else {
            dispatch(
                showFormAlertWithTimeout(
                    `Please enter something for field${
                        validForm.length > 1 ? 's' : ''
                    }: ${validForm.toString().split(',').join(', ')}`
                )
            );
        }
    };

    const closeForm = (e: OnClick) => history.push('/manager');
    console.log(formState);
    return (
        <div className='page'>
            <h1>Fill in the form to add a new snippet!</h1>
            <div className='content-container'>
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    form={formState}
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
