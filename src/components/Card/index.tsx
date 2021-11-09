import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '../Avatar/';
import { Like } from '../../store/homeState/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Snippet } from '../../Types/Snippet';
import ErrorIcon from '@mui/icons-material/Error';
import './index.css';

type Props = {
    snippet: Snippet;
    isLiked: boolean;
    performDispatch: (postId: number, likes: Like[]) => void;
};

export default function SnippetCard(props: Props) {
    const {
        id,
        title,
        user,
        language,
        createdAt,
        updatedAt,
        likes,
        comments,
        issue
    } = props.snippet;

    const { isLiked } = props;
    const currentUser = useSelector(selectUser);
    return (
        <Card
            style={{
                marginRight: '0.4rem',
                marginBottom: '0.6rem',
                marginTop: '0.6rem',
                backgroundColor: `${issue && '#e5989b'}`
            }}
            sx={{ minWidth: 345 }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem'
                }}
            >
                <Avatar imgUrl={user.imgUrl} alt={user.name} />
                <span>{user.name}</span>
            </div>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                    {issue && (
                        <ErrorIcon
                            style={{ color: 'red', marginLeft: '0.5rem' }}
                        />
                    )}
                </Typography>
                {/* <Typography variant='body2' color='text.secondary'>
                    {description}
                </Typography> */}
                <Typography>{language.name}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>
                    {user.id === currentUser?.id ? (
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/snippets/${id}`}
                        >
                            Learn More
                        </Link>
                    ) : (
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/snippetDetails/${id}`}
                        >
                            Learn More
                        </Link>
                    )}
                </Button>
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}
                >
                    {!issue &&
                        (!isLiked ? (
                            <FavoriteBorderIcon
                                className='like-button'
                                style={{ color: 'red' }}
                                onClick={() => props.performDispatch(id, likes)}
                            />
                        ) : (
                            <FavoriteIcon
                                className='like-button'
                                style={{ color: 'red' }}
                                onClick={() => props.performDispatch(id, likes)}
                            />
                        ))}

                    {!issue && likes.length}
                    {!issue && <InsertCommentIcon />}
                    {!issue && comments.length}
                </div>
            </CardActions>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem'
                }}
            >
                <span style={{ fontSize: '12px' }}>
                    Shared on: {moment(createdAt).format('DD-MM-YY')}
                </span>
                <span style={{ fontSize: '12px' }}>
                    Last edit: {moment(updatedAt).fromNow()}
                </span>
            </div>
        </Card>
    );
}
