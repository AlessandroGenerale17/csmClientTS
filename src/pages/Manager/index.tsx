import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnippets, removeSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Table';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import './index.css';

export default function Manager() {
    const dispatch = useDispatch();
    const snippets = useSelector(selectSnippets);
    const loading = useSelector(selectAppLoading);
    const token = useSelector(selectToken);

    useEffect(() => {
        if (!snippets.length) dispatch(fetchSnippets);
    }, [dispatch, token]);

    const deleteSnippets = (snippetsToDelete: readonly string[]) =>
        dispatch(removeSnippets(snippetsToDelete));

    if (loading) return <Loading />;
    return (
        <div className='manager-page'>
            <div>
                <p>Some configs</p>
            </div>
            <div>
                <Table
                    type='snippet'
                    list={snippets}
                    performDispatch={deleteSnippets}
                    tableName='My Snippets'
                />
            </div>
        </div>
    );
}
