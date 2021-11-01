import { combineReducers } from 'redux';
import snippetsReducer from './snippets/reducer';
import challengesReucer from './challenges/reducer';
import appReducer from './appState/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
    appState: appReducer,
    user: userReducer,
    snippets: snippetsReducer,
    challenges: challengesReucer
});

export default reducer;
