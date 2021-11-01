import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChallenges } from '../../store/challenges/actions';
import Table from '../../components/Tables';
import { selectChallenges } from '../../store/challenges/selectors';
import { selectAppLoading } from '../../store/appState/selectors';
import Loading from '../../components/Loading';

export default function Challenges() {
    const dispatch = useDispatch();
    const challenges = useSelector(selectChallenges);
    const loading = useSelector(selectAppLoading);
    console.log(challenges);

    useEffect(() => {
        dispatch(fetchChallenges);
    }, [dispatch]);

    if (loading) return <Loading />;
    return (
        <div>
            <h1>Challenges</h1>
            <Table
                performDispatch={() => []}
                type='code'
                list={challenges}
                tableName='Challenges'
            />
        </div>
    );
}
