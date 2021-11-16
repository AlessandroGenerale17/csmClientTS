import { RootState } from '..';
import { Snippet } from '../../types/Snippet';

export const selectPopularSnippets = (reduxState: RootState): Snippet[] => {
    return reduxState.home.popularSnippets.filter((snippet) => !snippet.issue);
};

export const selectIssueSnippets = (reduxState: RootState): Snippet[] => {
    return reduxState.home.popularSnippets.filter((snippet) => snippet.issue);
};

export const selectPopularSnippetsIds = (reduxState: RootState): number[] =>
    reduxState.home.popularSnippets.map((snippet) => snippet.id);
