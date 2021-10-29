import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippets } from '../../store/snippets/actions';
import { selectSnippets } from '../../store/snippets/selectors';
import Table from '../../components/Table/';
import Loading from '../../components/Loading';

export default function Manager() {
    const dispatch = useDispatch();

    const snippets = useSelector(selectSnippets);

    // why infinite loop?
    // shallow cloning lol
    useEffect(() => {
        if (!snippets.length) dispatch(fetchSnippets);
    }, [dispatch]);

    if (!snippets.length) return <Loading />;
    return (
        <div>
            <div>
                <Table snippets={snippets} />
            </div>
        </div>
    );
}
