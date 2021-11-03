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
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { FormState } from '../../Types/FormState';
import InputLabel from '@mui/material/InputLabel';
import './index.css';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../configs';

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
    const [languageOptions, setLanguageOptions] = useState<
        { name: string; id: number }[]
    >([]);
    const loading = useSelector(selectSaveLoading);

    const fetchLanguages = async () => {
        const res = await axios.get(`${apiUrl}/languages`);
        setLanguageOptions(
            res.data.map((language: { id: number; name: string }) => ({
                name: language.name,
                id: language.id
            }))
        );
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

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
                    name='language'
                    onChange={(e: OnChangeSelect) => handleFormChange(e)}
                    error={language.err}
                >
                    <option></option>
                    {languageOptions.map((language) => (
                        <option key={language.id} value={language.id}>
                            {language.name}
                        </option>
                    ))}
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
