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

type Props = {
    handleFormChange: (e: OnChange) => void;
    handleFormSubmit: (e: OnSubmit) => void;
    closeForm: (e: OnClick) => void;
    className: string;
    title: { value: string; err: boolean };
    description: { value: string; err: boolean };
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
                style={{ borderColor: title.err ? 'red' : 'black' }}
                onChange={(e: OnChangeInput) => handleFormChange(e)}
                value={title.value}
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
                style={{ borderColor: description.err ? 'red' : 'black' }}
                onChange={(e: OnChange) => handleFormChange(e)}
                value={description.value}
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
