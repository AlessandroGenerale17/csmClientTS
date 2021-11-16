import { RootState } from '..';

export const selectAppLoading = (reduxState: RootState) =>
    reduxState.appState.loading;
export const selectSaveLoading = (reduxState: RootState) =>
    reduxState.appState.saveLoading;
export const selectAlert = (reduxState: RootState) => reduxState.appState.alert;
