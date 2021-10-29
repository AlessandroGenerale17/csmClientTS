import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/';
import Question from './pages/Question/';
import Navigation from './components/Navigation';
import Manager from './pages/Manager/';
import Snippet from './pages/Snippet';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from './store/appState/selectors';
import { getUserWithStoredToken } from './store/user/actions';
import Loading from './components/Loading';
import SignUp from './pages/Signup';

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectAppLoading);

    useEffect(() => {
        dispatch(getUserWithStoredToken());
    }, [dispatch]);

    return (
        <div className='App'>
            <Navigation />
            {isLoading ? <Loading /> : null}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
                <Route path='/questions' component={Question} />
                <Route path='/manager' component={Manager} />
                <Route path='/snippets/:id' component={Snippet} />
            </Switch>
        </div>
    );
}

export default App;
