import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { patchSnippet } from '../../store/snippets/actions';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

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

export default function Snippet() {
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    const snippet = useSelector(selectSnippet);
    const loading = useSelector(selectAppLoading);
    const [formState, setFormState] = useState<formState>({
        title: { isOpen: false, value: '' },
        description: { isOpen: false, value: '' },
        code: { value: '' }
    });

    useEffect(() => {
        dispatch(fetchSnippet(id));
    }, [dispatch]);

    if (loading || !snippet) return <Loading />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(() => ({
            ...formState,
            [e.target.id]: {
                isOpen: true,
                value: e.target.value
            }
        }));
    };

    const handleCodeChange = (code: string) => {
        setFormState({
            ...formState,
            code: {
                value: code
            }
        });
    };

    const handleClick = (
        e: React.MouseEvent<HTMLHeadElement> | React.MouseEvent
    ) => {
        setFormState(() => ({
            ...formState,
            title: {
                ...formState.title,
                value: snippet.title
            }
        }));
    };

    const performDispatch = () =>
        dispatch(patchSnippet(id, formState.code.value));
    /* TODO make form appear when user clicks on an 'editable' field */
    /* const addPizza = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(add(formState));
        // clear form
        setFormState({ name: '', description: '' });
    }; */
    return (
        <div style={{ padding: '0.85rem', display: 'flex' }}>
            <div style={{ flex: 2 }}>
                {!formState.title.isOpen ? (
                    <h2 id='title' onClick={handleClick}>
                        {snippet.title}
                    </h2>
                ) : (
                    <input
                        id='value'
                        value={snippet.title}
                        onChange={handleChange}
                    />
                )}
                <h2 style={{ textAlign: 'center' }}>Notes</h2>
                <div>
                    {/* MARKUP INPUT ON DOUBLE CLICK else MARKDOWN*/}
                    <p>{snippet.description}</p>
                </div>
            </div>

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
