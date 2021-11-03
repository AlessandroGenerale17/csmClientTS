import { RootState } from '..';

export const selectAppLoading = (reduxState: RootState) =>
    reduxState.appState.loading;
export const selectMessage = (reduxState: RootState) =>
    reduxState.appState.message;
export const selectSaveLoading = (reduxState: RootState) =>
    reduxState.appState.saveLoading;
export const selectFormAlertMessage = (reduxState: RootState) =>
    reduxState.appState.formMessage;
