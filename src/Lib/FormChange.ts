import { Dispatch, SetStateAction } from 'react';
import { FormState } from '../types/FormState';
import { OnChange } from '../types/EventListener';

export const handleFormChange = (
    e: OnChange,
    setFormState: Dispatch<SetStateAction<FormState>>
) => {
    if (e.target.name === 'public') {
        console.log('hello');
        setFormState((prev) => ({
            ...prev,
            pub: !prev.pub
        }));
    } else if (e.target.name === 'issue') {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: !prev.issue
        }));
    } else {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: { value: e.target.value, err: false }
        }));
    }
};

export const handleCodeChange = (
    code: string,
    setFormState: Dispatch<SetStateAction<FormState>>
) => {
    setFormState((prev) => ({
        ...prev,
        code: code
    }));
};
