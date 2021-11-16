import { Dispatch, SetStateAction } from 'react';
import { FormState } from '../types/FormState';

export const isFormValid = (
    formState: FormState,
    setFormState: Dispatch<SetStateAction<FormState>>
): string[] => {
    const { title, description, language } = formState;
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

    if (language.value < 0) {
        setFormState((prev) => ({
            ...prev,
            language: { value: -1, err: true }
        }));
        errors.push('language');
    }

    return errors;
};
