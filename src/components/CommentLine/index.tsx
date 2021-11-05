import Avatar from '@mui/material/Avatar';
import { Comment } from '../../Types/Comment';
import moment from 'moment';

type Props = {
    comment: Comment;
};

export default function Comments(props: Props) {
    const { comment } = props;
    return (
        <li style={{ maxWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar />
                {comment.user.name}
            </div>
            {comment.text}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span>{moment(comment.createdAt).fromNow()}</span>
            </div>
        </li>
    );
}
