import { OnChange, OnSubmit } from '../../Types/EventListener';
import LoadingButton from '../Button/LoadingButton/';
import { useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import './index.css';

type Props = {
    handleFormChange: (e: OnChange) => void;
    handleFormSubmit: (e: OnSubmit) => void;
    className: string;
};

export default function AddSnippetForm(props: Props) {
    const { handleFormChange, handleFormSubmit, className } = props;
    const loading = useSelector(selectAppLoading);

    return (
        <form
            id='snippetForm'
            className={className}
            onSubmit={(e: OnSubmit) => handleFormSubmit(e)}
        >
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
            ></textarea>
            <LoadingButton
                backgroundColor='#282c34'
                loading={loading}
                handleClick={handleFormSubmit}
            />
        </form>
    );
}
