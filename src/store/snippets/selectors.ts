import { RootState } from '..';
import { Snippet } from '../../types/Snippet';

export const selectSnippets = (reduxState: RootState): Snippet[] =>
    reduxState.snippets.list;

export const selectSnippet = (reduxState: RootState): Snippet | null =>
    reduxState.snippets.selected;

export const selectSnippetCode = (reduxState: RootState): string | null =>
    reduxState.snippets.selected ? reduxState.snippets.selected.code : null;

export const selectLikedSnippets = (reduxState: RootState): Snippet[] =>
    reduxState.snippets.liked;
