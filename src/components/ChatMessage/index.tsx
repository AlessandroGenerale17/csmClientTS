import Avatar from '../Avatar/';

type Props = {
    user: {
        name: string;
        imgUrl: string;
    };
    text: string;
    align: 'start' | 'end';
};

export default function ChatMessage(props: Props) {
    const { user, text, align } = props;
    return (
        <li
            style={{
                alignSelf: `${align}`,
                marginBottom: '0.5rem'
            }}
        >
            <div
                style={{
                    backgroundColor: `${
                        align === 'start' ? 'white ' : 'yellow'
                    }`,
                    borderRadius: '0.5rem',
                    padding: '0.4rem'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: `${
                            align === 'start' ? 'row' : 'row-reverse'
                        }`,
                        alignItems: 'center'
                    }}
                >
                    <Avatar imgUrl={user.imgUrl} alt={user.name} />
                    {text}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        fontSize: '12px'
                    }}
                >
                    time
                </div>
            </div>
        </li>
    );
}
