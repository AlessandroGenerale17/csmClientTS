import { AppState, AppStateActions } from './types';

const initialState: AppState = {
    loading: false,
    //snippetLoading: false,TODO 
    // theme: TODO 
    message: null
};

const reducer = (state = initialState, action: AppStateActions): AppState => {
    switch (action.type) {
        case 'APP_LOADING':
            return { ...state, loading: true };

        case 'APP_DONE_LOADING':
            return { ...state, loading: false };

        case 'SET_MESSAGE':
            return { ...state, message: action.payload };

        case 'CLEAR_MESSAGE':
            return { ...state, message: null };

        default:
            return state;
    }
};

export default reducer;
