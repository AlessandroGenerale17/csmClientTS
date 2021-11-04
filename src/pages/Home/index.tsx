import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchPopularSnippets } from '../../store/homeState/actions';
import {
    selectIssueSnippets,
    selectPopularSnippets
} from '../../store/homeState/selectors';
import Card from '../../components/Card/';
import { PopularSnippet } from '../../store/homeState/types';

export default function Home() {
    const loading = useSelector(selectAppLoading);
    const dispatch = useDispatch();
    const popularSnippets = useSelector(selectPopularSnippets);
    const issueSnippets = useSelector(selectIssueSnippets);

    useEffect(() => {
        if (!popularSnippets.length) dispatch(fetchPopularSnippets);
    }, []);

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
                        <Card key={snippet.id} snippet={snippet} />
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
                        <Card key={snippet.id} snippet={snippet} />
                    ))}
                </div>
            </div>
        </div>
    );
}
