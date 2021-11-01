import { RootState } from '..';
import { CodeSnippet } from '../../Types/Snippet';

export const selectChallenges = (reduxState: RootState): CodeSnippet[] =>
    reduxState.challenges.list;
