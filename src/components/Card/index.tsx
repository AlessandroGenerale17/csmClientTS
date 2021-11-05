import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Like, PopularSnippet } from '../../store/homeState/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './index.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

type Props = {
    snippet: PopularSnippet;
    isLiked: boolean;
    performDispatch: (postId: number, likes: Like[]) => void;
};

export default function SnippetCard(props: Props) {
    const {
        id,
        title,
        description,
        author,
        language,
        createdAt,
        likes,
        comments,
        issue
    } = props.snippet;

    const { isLiked } = props;
    const user = useSelector(selectUser);
    return (
        <Card
            style={{ marginRight: '0.4rem', marginBottom: '0.6rem' }}
            sx={{ minWidth: 345 }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem'
                }}
            >
                <Avatar style={{ marginRight: '0.5rem' }} />
                <span>{author.name}</span>
            </div>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {description}
                </Typography>
                <Typography>{language}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>
                    {user?.id === author.id ? (
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
                    Last edit on: {moment(createdAt).format('DD-MM-YY')}
                </span>
            </div>
        </Card>
    );
}
