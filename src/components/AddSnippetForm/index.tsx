import { OnChange, OnSubmit } from '../../Types/EventListener';

type Props = {
    handleFormChange: (e: OnChange) => void;
    handleFormSubmit: (e: OnSubmit) => void;
};

export default function AddSnippetForm(props: Props) {
    const { handleFormChange, handleFormSubmit } = props;
    return (
        <form id='snippetForm' onSubmit={(e: OnSubmit) => handleFormSubmit(e)}>
            <label htmlFor='title'>Title</label>
            <input
                id='title'
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFormChange(e)
                }
            />
            <label htmlFor='markup'>Description</label>
            <textarea
                id='description'
                form='snippetForm'
                onChange={(e: OnChange) => handleFormChange(e)}
            />
            <button type='submit'>Submit</button>
        </form>
    );
}
