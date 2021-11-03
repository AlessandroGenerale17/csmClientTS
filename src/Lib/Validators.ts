import { Dispatch, SetStateAction } from 'react';
import { FormState } from '../Types/FormState';

export const isFormValid = (
    formState: FormState,
    setFormState: Dispatch<SetStateAction<FormState>>
): string[] => {
    const { title, description, language, code } = formState;
    const errors = [];
    if (!title.value.trim().length) {
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

    // TODO fix this for number
    if (!language) {
        setFormState((prev) => ({
            ...prev,
            language: { value: -1, err: true }
        }));
        errors.push('language');
    }

    return errors;
};
