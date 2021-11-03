import {
    OnChange,
    OnChangeInput,
    OnClick,
    OnSubmit,
    OnChangeSelect
} from '../../Types/EventListener';
import LoadingButton from '../Button/LoadingButton/';
import { useSelector } from 'react-redux';
import { selectSaveLoading } from '../../store/appState/selectors';
import CloseButton from '../Button/CloseButton/';
import FormAlert from '../../components/Alert/FormInputAlert/';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';

import FormControl from '@mui/material/FormControl';
import { FormState } from '../../Types/FormState';
import InputLabel from '@mui/material/InputLabel';
import './index.css';

type Props = {
    handleFormChange: (e: OnChange) => void;
    handleFormSubmit: (e: OnSubmit) => void;
    closeForm: (e: OnClick) => void;
    className: string;
    form: FormState;
};

export default function AddSnippetForm(props: Props) {
    const { handleFormChange, handleFormSubmit, closeForm, form, className } =
        props;
    const { title, description, language } = form;
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
            <FormControl>
                <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                    Language
                </InputLabel>
                <NativeSelect
                    inputProps={{
                        name: 'language',
                        id: 'uncontrolled-native'
                    }}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </NativeSelect>
            </FormControl>
            <TextField
                name='description'
                id='outlined-multiline'
                label='Description'
                multiline
                rows={4}
                value={description.value}
                onChange={(e: OnChangeInput) => handleFormChange(e)}
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
