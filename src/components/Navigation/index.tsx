import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import NavbarItem from './NavbarItem';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

export default function Navigation() {
    //const token = useSelector(selectToken);
    const token = false;
    const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

    return (
        <Navbar bg='light' expand='lg'>
            <Navbar.Brand as={NavLink} to='/'>
                CSM
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav
                    style={{ width: '100%', justifyContent: 'space-evenly' }}
                    fill
                >
                    <NavbarItem path='/' linkText='Home' />
                    <NavbarItem path='/challenges' linkText='Challenges' />
                    <NavbarItem path='/manager' linkText='Manager' />
                    {loginLogoutControls}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
