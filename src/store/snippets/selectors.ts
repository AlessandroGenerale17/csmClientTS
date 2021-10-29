import { ReduxState } from '../rootReducer';
import { Snippet } from '../../types/Snippet';

export const selectSnippets = (reduxState: ReduxState): Snippet[] =>
    reduxState.snippets.list;

export const selectSnippet = (reduxState: ReduxState): Snippet | null =>
    reduxState.snippets.selected;
