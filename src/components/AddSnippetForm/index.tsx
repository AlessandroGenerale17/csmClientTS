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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
        <Box
            className={className}
            component='form'
            sx={{
                '& > :not(style)': { m: 1 }
            }}
            noValidate
            autoComplete='off'
        >
            <FormAlert />
            <TextField
                name='title'
                id='outlined-basic'
                label='Title'
                variant='outlined'
                value={title.value}
                onChange={(e: OnChangeInput) => handleFormChange(e)}
                error={title.err}
            />
            <TextField
                name='description'
                id='outlined-multiline'
                label='Description'
                multiline
                rows={4}
                value={description.value}
                onChange={(e: OnChange) => handleFormChange(e)}
                error={description.err}
            />
            <div className='form-commands'>
                <LoadingButton
                    backgroundColor='#282c34'
                    loading={loading}
                    handleClick={handleFormSubmit}
                />
                <CloseButton handleClick={closeForm} />
            </div>
        </Box>
    );
}
