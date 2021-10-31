import { Snippet } from '../../Types/Snippet';

export type SnippetState = {
    list: Snippet[];
    selected: Snippet | null;
};

export type SaveSnippets = {
    type: 'SAVE_SNIPPETS';
    payload: Snippet[];
};

export type SaveSnippet = {
    type: 'SAVE_SNIPPET';
    payload: Snippet;
};

export type UpdateSnippet = {
    type: 'UPDATE_SNIPPET';
    payload: Snippet;
};

export type DeleteSnippets = {
    type: 'DELETE_SNIPPETS';
    payload: number[];
};

export type SnippetActions =
    | SaveSnippets
    | SaveSnippet
    | UpdateSnippet
    | DeleteSnippets;
