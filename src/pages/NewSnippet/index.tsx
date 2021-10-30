import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Editor from '../../components/Editor';

type formState = {
    title: {
        isOpen: boolean;
        value: string;
    };
    description: {
        isOpen: boolean;
        value: string;
    };
    code: {
        value: string;
    };
};

export default function NewSnippet() {
    const [formState, setFormState] = useState<formState>({
        title: { isOpen: false, value: '' },
        description: { isOpen: false, value: '' },
        code: { value: '' }
    });

    const dispatch = useDispatch();

    const handleCodeChange = (code: string) => {
        setFormState({
            ...formState,
            code: {
                value: code
            }
        });
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
                <form id='snippetForm'>
                    <label htmlFor='title'>Title</label>
                    <input id='title' type='text' />
                    <label htmlFor='description'>
                        Insert details in MD format
                    </label>
                    <textarea form='snippetForm' id='description' />
                </form>
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
