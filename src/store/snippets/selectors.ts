import { RootState } from '..';
import { Snippet } from '../../types/Snippet';

export const selectSnippets = (reduxState: RootState): Snippet[] =>
    reduxState.snippets.list;

export const selectSnippet = (reduxState: RootState): Snippet | null =>
    reduxState.snippets.selected;
