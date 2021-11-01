import { OnChange, OnClick, OnSubmit } from '../../Types/EventListener';
import LoadingButton from '../Button/LoadingButton/';
import { useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import CloseButton from '../Button/CloseButton/';
import './index.css';

type Props = {
    handleFormChange: (e: OnChange) => void;
    handleFormSubmit: (e: OnSubmit) => void;
    closeForm: (e: OnClick) => void;
    className: string;
    title: string;
    description: string;
};

export default function AddSnippetForm(props: Props) {
    const {
        handleFormChange,
        handleFormSubmit,
        closeForm,
        className,
        title,
        description
    } = props;
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
                value={title}
            />
            <label htmlFor='markup'>Description</label>
            <textarea
                id='description'
                form='snippetForm'
                onChange={(e: OnChange) => handleFormChange(e)}
                value={description}
            ></textarea>
            <div className='form-commands'>
                <LoadingButton
                    backgroundColor='#282c34'
                    loading={loading}
                    handleClick={handleFormSubmit}
                />
                <CloseButton handleClick={closeForm} />
            </div>
        </form>
    );
}
