import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { selectUser } from '../../store/user/selectors';
import { io } from 'socket.io-client';
import { apiUrl } from '../../configs';
import Loading from '../../components/Loading';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnippet } from '../../store/snippets/selectors';
import { fetchSnippet, patchSnippet } from '../../store/snippets/actions';
import Editor from '../../components/Editor';
import ChatMessage from '../../components/ChatMessage';
import { TextField } from '@material-ui/core';
import { remoteSnippetUpdate } from '../../store/snippets/actions';
import SendIcon from '@mui/icons-material/Send';
import { Snippet } from '../../Types/Snippet';
import { OnChangeInput } from '../../Types/EventListener';

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
    const [code, setCode] = useState('');
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

            socket.on('snip_update', (updatedSnippet: Snippet) => {
                // update the current code on the editor
                console.log('received this ', updatedSnippet);
                dispatch(remoteSnippetUpdate(updatedSnippet));
            });

            return () => {
                socket.emit('leave_room', {
                    roomId: id,
                    user: { id: user.id, name: user.name }
                });
            };
        }
    }, [user]);

    if (!issueSnippet || !user) return <Loading />;

    const saveCode = () => {
        if (!user) return;
        if (user.id === issueSnippet.user.id && code !== issueSnippet.code) {
            // FIXME we can move this in our reducer
            dispatch(
                patchSnippet(
                    parseInt(id),
                    issueSnippet.title,
                    issueSnippet.description,
                    code,
                    issueSnippet.language.id,
                    issueSnippet.public,
                    issueSnippet.issue
                )
            );
        }
    };

    console.log('issueSnippet', issueSnippet);

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
                handleCodeChange={(e) => setCode(e)}
                prompt={issueSnippet.code}
                language={issueSnippet.language.id}
                editable={issueSnippet.user.id === user.id}
                saveCode={saveCode}
                runCode={() => {}}
                submitSolution={() => {}}
            />
        </div>
    );
}
