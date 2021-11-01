import { CodeSnippet } from '../../Types/Snippet';

export type ChallengeState = {
    list: CodeSnippet[];
    selected: CodeSnippet | null;
};

export type SaveChallenges = {
    type: 'SAVE_CHALLENGES';
    payload: CodeSnippet[];
};

export type ChallengeActions = SaveChallenges;
