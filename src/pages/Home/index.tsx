import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import {
    fetchPopularSnippets,
    createLike,
    removeLike
} from '../../store/homeState/actions';
import {
    selectIssueSnippets,
    selectPopularSnippets
} from '../../store/homeState/selectors';
import Card from '../../components/Card/';
import { Like, PopularSnippet } from '../../store/homeState/types';
import { selectUser } from '../../store/user/selectors';

export default function Home() {
    const loading = useSelector(selectAppLoading);
    const dispatch = useDispatch();
    const popularSnippets = useSelector(selectPopularSnippets);
    const issueSnippets = useSelector(selectIssueSnippets);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!popularSnippets.length) dispatch(fetchPopularSnippets);
    }, []);

    const likeSnippet = (postId: number, likes: Like[]) => {
        if (user) {
            console.log('liking post ', postId);
            if (likes.filter((like) => like.userId === user.id).length > 0) {
                dispatch(removeLike(postId));
            } else dispatch(createLike(postId));
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div>
                <h1>Popular Snippets</h1>
                <div
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {popularSnippets.map((snippet: PopularSnippet) => (
                        <Card
                            key={snippet.id}
                            snippet={snippet}
                            performDispatch={likeSnippet}
                        />
                    ))}
                </div>
            </div>
            <div>
                <h1>Issues</h1>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flex: 1,
                        justifyContent: 'space-evenly'
                    }}
                >
                    {issueSnippets.map((snippet: PopularSnippet) => (
                        <Card
                            key={snippet.id}
                            snippet={snippet}
                            performDispatch={likeSnippet}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
