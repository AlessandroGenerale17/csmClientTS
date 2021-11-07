import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000');

export default function Home() {
    const loading = useSelector(selectAppLoading);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<
        { user: string; message: string }[]
    >([]);

    // whenever a new issue snippet is created a chat room is created
    useEffect(() => {
        socket.on('private', (msg) => {
            console.log(msg);
        });
        socket.on('second-channel', (msg) => {
            console.log(msg);
        });
        socket.on('join_room', (msg) => {
            console.log(msg);
        });

        socket.on('joined', (data) => {
            console.log(data);
            setMessages((prev) => [...data]);
        });
        socket.on('newMessage', (msg) => {
            setMessages((prev) => [{ user: '1', message: msg }, ...prev]);
        });

        return () => {
            socket.emit('disconnect');
        };
    }, []);
    console.log(messages)

    if (loading) return <Loading />;

    return (
        <div>
            <h1>Home</h1>
            <button
                onClick={() => {
                    socket.emit('join_room', 'halo');
                }}
            >
                Join room halo
            </button>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                }
                value={input}
            />
            <button
                onClick={() => {
                    socket.emit('new_message', input);
                    setInput('');
                }}
            >
                send
            </button>
            <ul>
                {messages.map((message) => (
                    <li>{message.message}</li>
                ))}
            </ul>
        </div>
    );
}
