import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Table/';
import Loading from '../../components/Loading';
import { selectToken } from '../../store/user/selectors';

export default function Manager() {
    const dispatch = useDispatch();
    const snippets = useSelector(selectSnippets);
    const token = useSelector(selectToken);

    useEffect(() => {
        if (!snippets.length) dispatch(fetchSnippets);
    }, [token]);

    if (!snippets.length) return <Loading />;
    return (
        <div>
            <h2>My Snippets</h2>
            <div>
                <Table snippets={snippets} />
            </div>
        </div>
    );
}
