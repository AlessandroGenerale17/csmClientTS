import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSnippet } from '../../store/snippets/actions';
import { selectSnippet } from '../../store/snippets/selectors';
import Editor from '../../components/Editor';
import Loading from '../../components/Loading';

// FIXME possibly export
type ParamTypes = {
    id: string;
};

export default function Lnippet() {
    const id = parseInt(useParams<ParamTypes>().id);
    const dispatch = useDispatch();
    const snippet = useSelector(selectSnippet);

    useEffect(() => {
        dispatch(fetchSnippet(id));
    }, [dispatch]);


    if (!snippet || id !== snippet?.id) return <Loading />;

    return (
        <div>
            <Editor codeToInject={snippet.code} />
        </div>
    );
}
