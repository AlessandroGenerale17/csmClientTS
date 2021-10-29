import { combineReducers } from 'redux';
import snippetsReducer from './snippets/reducer';

const reducer = combineReducers({
    snippets: snippetsReducer
});

export default reducer;

export type ReduxState = ReturnType<typeof reducer>;
