import { ReduxState } from '../rootReducer';

export const selectAppLoading = (reduxState: ReduxState) =>
    reduxState.appState.loading;
export const selectMessage = (reduxState: ReduxState) =>
    reduxState.appState.message;
