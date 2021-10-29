import { RootState } from '..';

export const selectAppLoading = (reduxState: RootState) =>
    reduxState.appState.loading;
export const selectMessage = (reduxState: RootState) =>
    reduxState.appState.message;
