import { useState, useEffect, SyntheticEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { signUp } from '../../store/user/actions';
import { selectToken } from '../../store/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { OnChangeInput } from '../../Types/EventListener';
import CircularProgress from '@mui/material/CircularProgress';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
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

        dispatch(signUp(name, email, password));

        setEmail('');
        setPassword('');
        setName('');
    }

    const uploadImage = async (e: OnChangeInput) => {
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
        // setImage(file.url); //put the url in local state, next step you can send it to the backend
    };

    return (
        <Container>
            <Form as={Col} md={{ span: 6, offset: 3 }} className='mt-5'>
                <h1 className='mt-5 mb-5'>Signup</h1>
                <Form.Group controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type='text'
                        placeholder='Enter name'
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type='email'
                        placeholder='Enter email'
                        required
                    />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Upload an image for your avatar</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type='file' onChange={uploadImage} />
                        <CircularProgress />
                        <CheckBoxIcon style={{ color: 'green' }} />
                    </div>
                </Form.Group>
                <Form.Group className='mt-5'>
                    <Button
                        variant='primary'
                        type='submit'
                        onClick={submitForm}
                    >
                        Sign up
                    </Button>
                </Form.Group>
                <Link to='/login'>Click here to log in</Link>
            </Form>
        </Container>
    );
}
