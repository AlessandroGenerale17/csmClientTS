import { RootState } from '..';
import { UserState } from './types';
export const selectToken = (reduxState: UserState) =>
    reduxState.user ? reduxState.user.token : null;

export const selectUser = (reduxState: RootState) => reduxState.user.user;
