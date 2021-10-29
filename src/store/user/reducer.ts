import { UserState } from './types';
const initialState: UserState = {
    state: null
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            if (action.payload.token)
                localStorage.setItem('token', action.payload.token);
            return { ...state, state: { ...action.payload } };

        case 'LOG_OUT':
            localStorage.removeItem('token');
            return { ...initialState, state: null };

        default:
            return state;
    }
};

export default reducer;
