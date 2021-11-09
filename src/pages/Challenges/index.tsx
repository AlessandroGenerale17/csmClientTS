import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChallenges } from '../../store/challenges/actions';
import Table from '../../components/Table';
import { selectChallenges } from '../../store/challenges/selectors';
import { selectAppLoading } from '../../store/appState/selectors';
import Loading from '../../components/Loading';
import './index.css';

export default function Challenges() {
    const dispatch = useDispatch();
    const challenges = useSelector(selectChallenges);
    const loading = useSelector(selectAppLoading);

    useEffect(() => {
        if (!challenges.length) dispatch(fetchChallenges);
    }, [dispatch]);

    if (loading) return <Loading />;
    return (
        <div className='challenges-page'>
            <div>
                <Table
                    performDispatch={() => []}
                    type='code'
                    list={challenges}
                    tableName='Challenges'
                />
            </div>
        </div>
    );
}
