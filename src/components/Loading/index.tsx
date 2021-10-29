import Spinner from 'react-bootstrap/Spinner';
import './index.css';

export default function Loading() {
    return (
        <div className='loading_spinner'>
            <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
            </Spinner>
        </div>
    );
}
