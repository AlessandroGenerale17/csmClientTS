import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/';
import Question from './pages/Challenge';
import Manager from './pages/Manager/';
import Snippet from './pages/Snippet';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from './store/appState/selectors';
import { getUserWithStoredToken } from './store/user/actions';
import Loading from './components/Loading';
import SignUp from './pages/Signup';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import MessageBox from './components/MessageBox';
import NewSnippet from './pages/NewSnippet';
import './App.css';
import SnippetDetails from './pages/SnippetDetails';
import Navbar from './components/Navigation/Navbar';

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAppLoading);

    useEffect(() => {
        dispatch(getUserWithStoredToken());
    }, [dispatch]);

    return (
        <div className='App'>
            <Navbar />
            <MessageBox />
            {isLoading ? <Loading /> : null}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
                <Route path='/questions' component={Question} />
                <Route path='/manager' component={Manager} />
                <Route path='/challenges/:id' component={Challenge} />
                <Route path='/challenges' component={Challenges} />
                <Route path='/newSnippet' component={NewSnippet} />
                <Route path='/snippets/:id' component={Snippet} />
                <Route path='/snippetDetails/:id' component={SnippetDetails} />
            </Switch>
        </div>
    );
}

export default App;
