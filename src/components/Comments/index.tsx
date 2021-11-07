import { Comment } from '../../Types/Comment';
import Avatar from '../Avatar/';
import moment from 'moment';

type Props = {
    comment: Comment;
};

export default function Comments(props: Props) {
    const { comment } = props;
    return (
        <li style={{ marginLeft: '10px', marginTop: '5px', width: '100%' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            imgUrl={comment.user.imgUrl}
                            alt={comment.user.name}
                        />
                        {comment.user.name}
                    </div>
                    <p
                        style={{
                            marginLeft: '38px',
                            marginBottom: 0,
                            maxWidth: '300px'
                        }}
                    >
                        {comment.text}
                    </p>
                </div>
                <div style={{ flex: 3 }}>
                    <span>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            <hr style={{ height: '1px', width: '100%' }}></hr>
        </li>
    );
}
