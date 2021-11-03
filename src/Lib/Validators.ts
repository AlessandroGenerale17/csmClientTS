import { Dispatch, SetStateAction } from 'react';
import { FormState } from '../Types/FormState';

export const isFormValid = (
    formState: FormState,
    setFormState: Dispatch<SetStateAction<FormState>>
): string[] => {
    const { title, description, code } = formState;
    const errors = [];
    if (!title.value.trim().length) {
        console.log('entering for title');
        setFormState((prev) => ({
            ...prev,
            title: { value: title.value, err: true }
        }));
        errors.push('title');
    }
    if (!description.value.trim().length) {
        setFormState((prev) => ({
            ...prev,
            description: { value: description.value, err: true }
        }));
        errors.push('description');
    }

    return errors;
};
