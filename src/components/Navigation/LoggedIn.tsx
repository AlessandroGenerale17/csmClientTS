import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export default function LoggedIn() {
    return (
        <>
            <Nav.Item style={{ padding: '.5rem 1rem' }}>@</Nav.Item>
            <Button onClick={() => console.log('logout')}>Logout</Button>
        </>
    );
}
