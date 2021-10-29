import { Snippet } from '../../types/Snippet';
import { SAVE_SNIPPETS, SAVE_SNIPPET } from './actions';

export type SnippetState = {
    list: Snippet[];
    selected: Snippet | null;
};

export type saveSnippets = {
    type: typeof SAVE_SNIPPETS;
    payload: Snippet[];
};

export type saveSnippet = {
    type: typeof SAVE_SNIPPET;
    payload: Snippet;
};

export type SnippetActions = saveSnippets | saveSnippet;
