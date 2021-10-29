import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Table/';
import Loading from '../../components/Loading';

export default function Manager() {
    const dispatch = useDispatch();

    const snippets = useSelector(selectSnippets);

    useEffect(() => {
        if (!snippets.length) dispatch(fetchSnippets);
    }, [dispatch, snippets.length]);

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
