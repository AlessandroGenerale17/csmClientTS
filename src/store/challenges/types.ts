import { CodeSnippet } from '../../types/Snippet';

export type ChallengeState = {
    list: CodeSnippet[];
    selected: CodeSnippet | null;
};

export type SaveChallenges = {
    type: 'SAVE_CHALLENGES';
    payload: CodeSnippet[];
};

export type SaveChallenge = {
    type: 'SAVE_CHALLENGE';
    payload: CodeSnippet;
};

export type ChallengeActions = SaveChallenges | SaveChallenge;
