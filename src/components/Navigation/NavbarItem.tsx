import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

type Props = {
    path: string;
    linkText: string;
};

export default function NavbarItem(props: Props) {
    return (
        <div>
            <Nav.Item>
                <Nav.Link as={NavLink} to={props.path}>
                    {props.linkText}
                </Nav.Link>
            </Nav.Item>
        </div>
    );
}
