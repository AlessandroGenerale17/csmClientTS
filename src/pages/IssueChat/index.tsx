import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { selectUser } from '../../store/user/selectors';
import { io } from 'socket.io-client';
import { apiUrl } from '../../configs';
import Loading from '../../components/Loading';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnippet } from '../../store/snippets/selectors';
import { fetchSnippet } from '../../store/snippets/actions';
import { OnChangeInput } from '../../Types/EventListener';
import Editor from '../../components/Editor';
import ChatMessage from '../../components/ChatMessage';
import { TextField } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';

type Message = {
    user: {
        id: number;
        name: string;
        imgUrl: string;
    };
    text: string;
};

type ParamTypes = {
    id: string;
};

const socket = io(apiUrl);

export default function Chat() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const { id } = useParams<ParamTypes>();

    const user = useSelector(selectUser);
    const issueSnippet = useSelector(selectSnippet);

    const sendMessage = () => {
        socket.emit('new_message', {
            roomId: id,
            user: { id: user.id, name: user.name, imgUrl: user.imgUrl },
            text: input
        });
        setInput('');
    };
    useEffect(() => {
        if (!issueSnippet) dispatch(fetchSnippet(parseInt(id)));

        if (user) {
            socket.emit('join_room', {
                roomId: id,
                user: { id: user.id, name: user.name }
            });
            // connect to chat using the current issue ID
            // and the user ID
            socket.on('joined_room', (prevMessages) => {
                console.log('here ', prevMessages);
                setMessages([...prevMessages]);
            });

            socket.on('new_message', (messageInfo) => {
                const { user, text } = messageInfo;
                setMessages((prev) => [{ user: user, text: text }, ...prev]);
            });

            return () => {
                socket.emit('leave_room', {
                    roomId: id,
                    user: { id: user.id, name: user.name }
                });
            }; 
        }
    }, [user]);

    if (!issueSnippet) return <Loading />;

    return (
        <div style={{ display: 'flex' }}>
            <div
                className='chat'
                style={{
                    flex: 2,
                    padding: '0.5rem'
                }}
            >
                <div
                    style={{
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <TextField
                        style={{ width: '80%' }}
                        name='name'
                        id='outlined-basic'
                        variant='outlined'
                        value={input}
                        placeholder='Type a new message'
                        onChange={(e: OnChangeInput) =>
                            setInput(e.target.value)
                        }
                    />
                    <SendIcon
                        style={{ fontSize: '2.5rem' }}
                        onClick={sendMessage}
                        type='submit'
                    />
                </div>
                <div
                    style={{
                        padding: '0.6rem',
                        backgroundColor: 'gray',
                        borderRadius: '0.5rem'
                    }}
                >
                    <ul
                        style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '0',
                            height: '75vh',
                            overflow: 'hidden',
                            overflowY: 'scroll'
                        }}
                    >
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                user={message.user}
                                text={message.text}
                                align={
                                    user.id === message.user.id
                                        ? 'start'
                                        : 'end'
                                }
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Editor
                className='editor-newSnippet'
                type='snippet'
                handleCodeChange={() => {}}
                prompt={''}
                language={1}
                editable={true}
                saveCode={() => {}}
                runCode={() => {}}
                submitSolution={() => {}}
            />
        </div>
    );
}
