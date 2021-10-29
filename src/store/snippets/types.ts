import { Snippet } from '../../types/Snippet';

export type SnippetState = {
    list: Snippet[];
    selected: Snippet | null;
};

export type saveSnippets = {
    type: 'SAVE_SNIPPETS';
    payload: Snippet[];
};

export type saveSnippet = {
    type: 'SAVE_SNIPPET';
    payload: Snippet;
};

export type SnippetActions = saveSnippets | saveSnippet;
