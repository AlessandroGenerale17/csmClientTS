import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { selectAppLoading } from '../../store/appState/selectors';
import NewForm from '../../components/AddSnippetForm/newForm';

export default function Home() {
    const loading = useSelector(selectAppLoading);

    if (loading) return <Loading />;
    return (
        <div>
            <h1>Home</h1>
            <NewForm />
        </div>
    );
}
