import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function LoggedOut() {
    return (
        <>
            <div>
                <Nav.Item>
                    <Nav.Link
                        as={NavLink}
                        to='/login'
                        style={{ textDecoration: 'none' }}
                    >
                        Login
                    </Nav.Link>
                </Nav.Item>
            </div>
        </>
    );
}
