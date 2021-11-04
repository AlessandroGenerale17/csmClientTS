import { RootState } from '..';
import { PopularSnippet } from './types';

export const selectPopularSnippets = (
    reduxState: RootState
): PopularSnippet[] => {
    return reduxState.home.popularSnippets;
};

export const selectIssueSnippets = (
    reduxState: RootState
): PopularSnippet[] => {
    return reduxState.home.issueSnippets;
};
