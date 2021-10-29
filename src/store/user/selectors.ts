import { RootState } from '..';
export const selectToken = (reduxState: RootState) =>
    reduxState.user.state ? reduxState.user.state.token : null;

export const selectUser = (reduxState: RootState) => reduxState.user.state;
