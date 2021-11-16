import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';

export default function Nava() {
    const token = useSelector(selectToken);

    const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Container>
                <img
                    style={{ width: '60px', marginRight: '0.5rem' }}
                    src={
                        'https://2019.breizhcamp.org/img/carousel/code-busters.png'
                    }
                    alt=''
                />
                <Navbar.Brand as={NavLink} to='/'>
                    CodeBuster
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto' style={{ width: '100%' }} fill>
                        <Nav.Link as={NavLink} to='/' exact>
                            Home
                        </Nav.Link>
                        {token && (
                            <Nav.Link as={NavLink} to='/manager'>
                                Manager
                            </Nav.Link>
                        )}

                        <Nav.Link as={NavLink} to='/challenges'>
                            Challenges
                        </Nav.Link>
                        {loginLogoutControls}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
