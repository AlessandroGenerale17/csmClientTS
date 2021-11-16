import { User } from '../../types/User';

type LoginSuccess = {
    type: 'LOGIN_SUCCESS';
    payload: User;
};

type TokenStillValid = {
    type: 'TOKEN_STILL_VALID';
    payload: {
        name: string;
        email: string;
        id: number;
        imgUrl: string;
    };
};

type Logout = {
    type: 'LOG_OUT';
};

export type LoggedIn = User | null;

export type UserState = {
    state: LoggedIn;
};

export type UserActions = LoginSuccess | TokenStillValid | Logout;
