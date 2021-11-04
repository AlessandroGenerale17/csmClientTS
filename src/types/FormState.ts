export type FormState = {
    title: { value: string; err: boolean };
    description: { value: string; err: boolean };
    language: { value: number; err: boolean };
    code: string;
    isOpen: boolean;
};
