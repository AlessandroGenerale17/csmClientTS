import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';

export default function BasicTextFields() {
    return (
        <Box
            component='form'
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete='off'
        >
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                Age
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native'
                }}
            >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </NativeSelect>
        </Box>
    );
}
