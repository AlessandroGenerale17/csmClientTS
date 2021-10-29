import { combineReducers } from 'redux';
import snippetsReducer from './snippets/reducer';
import appReducer from './appState/reducer';
import userReducer from './user/reducer';

const reducer = combineReducers({
    appState: appReducer,
    snippets: snippetsReducer,
    user: userReducer
});

export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
