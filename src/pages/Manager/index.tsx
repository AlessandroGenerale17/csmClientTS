import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Tables/Snippets';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';

export default function Manager() {
    const dispatch = useDispatch();
    const snippets = useSelector(selectSnippets);
    const loading = useSelector(selectAppLoading);
    const token = useSelector(selectToken);

    useEffect(() => {
        dispatch(fetchSnippets);
    }, [dispatch, token]);

    if (loading) return <Loading />;
    return (
        <div>
            <h2>My Snippets</h2>
            <div>
                <Table list={snippets} />
            </div>
        </div>
    );
}
