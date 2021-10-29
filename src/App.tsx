import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/';
import Question from './pages/Question/';
import Navigation from './components/Navigation';
import Manager from './pages/Manager/';
import Snippet from './pages/Snippet';

function App() {
    return (
        <div className='App'>
            <Navigation />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/questions' component={Question} />
                <Route path='/manager' component={Manager} />
                <Route path='/snippets/:id' component={Snippet} />
            </Switch>
        </div>
    );
}

export default App;
