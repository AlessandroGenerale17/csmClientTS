import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (x: any) => x;

const enhancer = compose(applyMiddleware(ReduxThunk), devTools);

const store = createStore(rootReducer, enhancer);

export default store;
