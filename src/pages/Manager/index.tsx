import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Table/';

export default function Manager() {
    const dispatch = useDispatch();

    const snippets = useSelector(selectSnippets);

    // why infinite loop?
    // shallow cloning lol
    useEffect(() => {
        if (!snippets.length) dispatch(fetchSnippets);
    }, [dispatch]);

    if (!snippets.length) return <p>Loading...</p>;
    return (
        <div>
            <div>
                <Table snippets={snippets} />
            </div>
        </div>
    );
}
