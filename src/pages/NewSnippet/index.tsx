import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddSnippetForm from '../../components/AddSnippetForm';
import Editor from '../../components/Editor';
import { OnChange, OnSubmit } from '../../Types/EventListener';
import { createSnippet } from '../../store/snippets/actions';
import { useHistory } from 'react-router-dom';
import './index.css';

type FormState = {
    title: string;
    description: string;
    code: string;
};

const initialFormState = {
    title: '',
    description: '',
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
            [e.target.id]: e.target.value
        });

    const handleFormSubmit = async (e: OnSubmit) => {
        e.preventDefault();
        // TODO Check form validity...
        console.log('submitting ', formState);
        const { title, description, code } = formState;
        dispatch(createSnippet(title, description, code));
        setFormState(initialFormState);
        history.push('/manager');
    };

    const performDispatch = () => {};

    return (
        <div className='page'>
            <h1>Fill in the form to add a new snippet!</h1>
            <div className='content-container'>
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                    closeForm={() => {}}
                    className='form-newSnippet'
                    title={formState.title}
                    description={formState.description}
                />
                <Editor
                    className='editor-newSnippet'
                    type='snippet'
                    codeToInject=''
                    handleCodeChange={handleCodeChange}
                    performDispatch={performDispatch}
                    displayOutput={() => {}}
                />
            </div>
        </div>
    );
}
