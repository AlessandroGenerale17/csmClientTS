import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:4000');

export default function Home() {
    const loading = useSelector(selectAppLoading);

    // different domain
    //const socket = io("https://server-domain.com");

    useEffect(() => {
        socket.on('private', (msg) => {
            console.log(msg);
        });
        socket.on('second-channel', (msg) => {
            console.log(msg);
        });
    }, []);
    if (loading) return <Loading />;
    return (
        <div>
            <h1>Home</h1>
            <button
                onClick={() => {
                    socket.emit('message-server');
                    socket.emit('message-secondChannel');
                }}
            >
                Press
            </button>
        </div>
    );
}
