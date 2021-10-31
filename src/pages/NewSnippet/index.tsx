import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddSnippetForm from '../../components/AddSnippetForm';
import Editor from '../../components/Editor';
import { OnChange, OnSubmit } from '../../Types/EventListener';

type formState = {
    title: string;
    description: string;
    code: string;
};

export default function NewSnippet() {
    const [formState, setFormState] = useState<formState>({
        title: '',
        description: '',
        code: ''
    });

    const dispatch = useDispatch();

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

    const handleFormSubmit = (e: OnSubmit) => {
        e.preventDefault();
        // dispatch action
        console.log('submitting ', formState);
    };

    const performDispatch = () => {
        // TODO Check form validity
        //dispatch(createSnippet)
        console.log('dispatching action');
    };

    return (
        <div>
            <h1>Fill in the form to add a new snippet!</h1>
            <div>
                <AddSnippetForm
                    handleFormSubmit={handleFormSubmit}
                    handleFormChange={handleFormChange}
                />
                <Editor
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
