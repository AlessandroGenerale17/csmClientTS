import { RootState } from '..';
import { Snippet } from '../../types/Snippet';

export const selectPopularSnippets = (reduxState: RootState): Snippet[] => {
    return reduxState.home.popularSnippets
        .filter((snippet) => !snippet.issue)
        .sort(
            (snippetA, snippetB) =>
                snippetB.likes.length +
                snippetB.comments.length -
                (snippetA.likes.length + snippetA.comments.length)
        );
    // .slice(0, 5);
};

export const selectIssueSnippets = (reduxState: RootState): Snippet[] => {
    return reduxState.home.popularSnippets.filter((snippet) => snippet.issue);
};

export const selectPopularSnippetsIds = (reduxState: RootState): number[] =>
    reduxState.home.popularSnippets.map((snippet) => snippet.id);
