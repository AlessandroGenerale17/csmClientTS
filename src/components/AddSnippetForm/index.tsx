import {
    OnChange,
    OnChangeInput,
    OnClick,
    OnSubmit
} from '../../Types/EventListener';
import LoadingButton from '../Button/LoadingButton/';
import { useSelector } from 'react-redux';
import { selectSaveLoading } from '../../store/appState/selectors';
import CloseButton from '../Button/CloseButton/';
import FormAlert from '../../components/Alert/FormInputAlert/';
import './index.css';
import { TextField } from '@material-ui/core';

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

    const loading = useSelector(selectSaveLoading);

    return (
        <form
            id='snippetForm'
            className={className}
            onSubmit={(e: OnSubmit) => handleFormSubmit(e)}
        >
            <FormAlert />
            <label htmlFor='title'>Title</label>
            <input
                id='title'
                type='text'
                onChange={(e: OnChangeInput) => handleFormChange(e)}
                value={title}
            />

            <label htmlFor='language'>Language</label>
            {/* TODO fix so that it works with the languages available */}
            <select id='language'>
                <option value='JavaScript'>JavaScript</option>
                <option value='C'>C</option>
            </select>
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
