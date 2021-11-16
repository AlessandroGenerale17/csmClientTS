import { useState, useEffect, SyntheticEvent } from 'react';
import { signUp } from '../../store/user/actions';
import { selectToken } from '../../store/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { OnChangeInput } from '../../types/EventListener';
import CircularProgress from '@mui/material/CircularProgress';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import FormAlert from '../../components/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const history = useHistory();

    useEffect(() => {
        if (token !== null) {
            history.push('/');
        }
    }, [token, history]);

    function submitForm(event: SyntheticEvent) {
        event.preventDefault();

        if (!imgUploading) dispatch(signUp(name, email, password, imgUrl));

        setEmail('');
        setPassword('');
        setName('');
        setImgUrl('');
    }

    const uploadImage = async (e: OnChangeInput) => {
        setImgUploading(true);
        const files = e.target.files;
        const data = new FormData();
        if (files) data.append('file', files[0]);
        //first parameter is always upload_preset, second is the name of the preset
        data.append('upload_preset', 'oh9s25kg');

        //post request to Cloudinary, remember to change to your own link
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dpkg9kv62/image/upload ',
            {
                method: 'POST',
                body: data
            }
        );

        const file = await res.json();
        console.log('file', file); //check if you are getting the url back
        setImgUrl(file.url); //put the url in local state, next step you can send it to the backend
        setImgUploading(false);
        setUploadSuccess(true);
    };

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <h1>Sign Up</h1>
            <Box
                component='form'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '400px'
                }}
                sx={{
                    '& > :not(style)': { m: 1 }
                }}
                noValidate
                autoComplete='off'
            >
                <FormAlert />
                <TextField
                    style={{ width: '100%' }}
                    name='name'
                    id='outlined-basic'
                    label='Name'
                    variant='outlined'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    style={{ width: '100%' }}
                    name='email'
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    style={{ width: '100%' }}
                    name='password'
                    id='outlined-multiline'
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div style={{ display: 'flex' }}>
                    <input type='file' onChange={uploadImage} />
                    {imgUploading && <CircularProgress />}
                    {uploadSuccess && (
                        <CheckBoxIcon style={{ color: 'green' }} />
                    )}
                </div>

                <Button variant='contained' type='submit' onClick={submitForm}>
                    Sign up
                </Button>
                <Link to='/login'>Click here to log in</Link>
            </Box>
        </Container>
    );
}
