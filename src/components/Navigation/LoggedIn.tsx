import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/user/actions';
import { selectUser } from '../../store/user/selectors';
import { useHistory } from 'react-router';

export default function LoggedIn() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    return (
        <>
            <Nav.Item style={{ padding: '.5rem 1rem' }}>{user.email}</Nav.Item>
            <Button
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
