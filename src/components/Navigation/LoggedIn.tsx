import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/user/actions';
import { selectUser } from '../../store/user/selectors';
import { useHistory } from 'react-router';
import Avatar from '../Avatar/';

export default function LoggedIn() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    return (
        <>
            <Nav.Item
                style={{
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Avatar imgUrl={user.imgUrl} alt={user.name} />
                <span style={{ marginLeft: '0.5rem' }}>{user.name}</span>
            </Nav.Item>
            <Button
                style={{ color: 'white', borderColor: 'white' }}
                variant='outlined'
                onClick={() => {
                    history.push('/');
                    dispatch(logOut());
                }}
            >
                Logout
            </Button>
        </>
    );
}
