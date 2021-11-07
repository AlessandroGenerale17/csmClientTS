import Box from '@mui/material/Box';
import FormAlert from '../../components/Alert/FormInputAlert/';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function Login() {
    return (
        <Box
            component='form'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            sx={{
                '& > :not(style)': { m: 1 }
            }}
            noValidate
            autoComplete='off'
        >
            <FormAlert />
            <TextField
                name='email'
                id='outlined-basic'
                label='Email'
                variant='outlined'
            />
            <TextField
                name='password'
                id='outlined-multiline'
                label='Password'
                type='password'
            />
            <Button variant='contained'>Contained</Button>
            <Link to='/signup' style={{ textAlign: 'center' }}>
                Click here to sign up
            </Link>
        </Box>
    );
}
