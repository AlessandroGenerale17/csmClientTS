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
import { handleFormChange, handleCodeChange } from '../../Lib/FormChange';
import './index.css';

const initialFormState = {
    title: { value: '', err: false },
    description: { value: '', err: false },
    language: { value: -1, err: false },
    pub: false,
    issue: false,
    code: '',
    isOpen: true
};

export default function NewSnippet() {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const dispatch = useDispatch();
    const history = useHistory();
    const formChange = (e: OnChange) => handleFormChange(e, setFormState);
    const codeChange = (code: string) => handleCodeChange(code, setFormState);

    const closeForm = (e: OnClick) => history.push('/manager');
    const handleFormSubmit = async (e: OnSubmit) => {
        e.preventDefault();
        const { title, description, code, language, pub, issue } = formState;
        const validForm = isFormValid(formState, setFormState);

        if (validForm.length === 0) {
            dispatch(
                createSnippet(
                    title.value,
                    description.value,
                    code,
                    language.value,
                    pub,
                    issue
                )
            );
            setFormState(initialFormState);
            setTimeout(() => history.push('/manager'), 2000);
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

    console.log(formState);

    return (
        <div className='page'>
            <h1>Fill in the form to add a new snippet!</h1>
            <div className='content-container'>
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={formChange}
                    closeForm={closeForm}
                    className='form-newSnippet'
                    form={formState}
                />
                <Editor
                    className='editor-newSnippet'
                    type='snippet'
                    handleCodeChange={codeChange}
                    prompt={formState.code}
                    language={formState.language.value}
                    editable={true}
                    saveCode={() => {}}
                    runCode={() => {}}
                    submitSolution={() => {}}
                />
            </div>
        </div>
    );
}
