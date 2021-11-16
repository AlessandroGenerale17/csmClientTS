import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnippets, removeSnippets } from '../../store/snippets/actions';
import {
    selectLikedSnippets,
    selectSnippets
} from '../../store/snippets/selectors';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import Table from '../../components/Table/SnippetTable/';
import './index.css';

export default function Manager() {
    const [snippetsToShow, setSnippetsToShow] = useState<
        'mySnippets' | 'likedSnippets'
    >('mySnippets');
    const dispatch = useDispatch();
    const snippets = useSelector(selectSnippets);
    const likedSnippets = useSelector(selectLikedSnippets);
    const loading = useSelector(selectAppLoading);
    const token = useSelector(selectToken);

    useEffect(() => {
        if (!snippets.length || !likedSnippets.length) dispatch(fetchSnippets);
    }, [dispatch, token]);

    const deleteSnippets = (snippetsToDelete: readonly string[]) =>
        dispatch(removeSnippets(snippetsToDelete));

    if (loading) return <Loading />;

    return (
        <div className='manager-page'>
            <div className='manager-filter'>
                <p
                    className={`filter${
                        snippetsToShow === 'mySnippets' ? '-active' : ''
                    }`}
                    onClick={() => setSnippetsToShow('mySnippets')}
                >
                    My Snippets
                </p>
                <p
                    className={`filter${
                        snippetsToShow === 'likedSnippets' ? '-active' : ''
                    }`}
                    onClick={() => setSnippetsToShow('likedSnippets')}
                >
                    Liked Snippets
                </p>
            </div>
            <div>
                <Table
                    list={
                        snippetsToShow === 'mySnippets'
                            ? snippets
                            : likedSnippets
                    }
                    performDispatch={deleteSnippets}
                    tableName={
                        snippetsToShow === 'mySnippets'
                            ? 'My Snippets'
                            : 'Liked Snippets'
                    }
                />
            </div>
        </div>
    );
}
