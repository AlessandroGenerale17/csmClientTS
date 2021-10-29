import { UserState } from './types';
const initialState: UserState = {
    user: null
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            if (action.payload.token)
                localStorage.setItem('token', action.payload.token);
            return { ...state, user: { ...action.payload } };

        case 'LOG_OUT':
            localStorage.removeItem('token');
            return { ...initialState, user: null };

        case 'TOKEN_STILL_VALID':
            return { ...state, user: { ...action.payload } };

        default:
            return state;
    }
};

export default reducer;
