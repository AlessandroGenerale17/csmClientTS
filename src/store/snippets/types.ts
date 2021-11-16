import { Comment } from '../../Types/Comment';
import { Snippet } from '../../Types/Snippet';
import { Like } from '../homeState/types';

export type SnippetState = {
    list: Snippet[];
    liked: Snippet[];
    selected: Snippet | null;
};

export type SaveSnippets = {
    type: 'SAVE_SNIPPETS';
    payload: Snippet[];
};

export type SaveLikedSnippets = {
    type: 'SAVE_LIKED_SNIPPETS';
    payload: Snippet[];
};

export type SaveSnippet = {
    type: 'SAVE_SNIPPET';
    payload: Snippet;
};

export type SaveLikedSnippet = {
    type: 'SAVE_LIKED_SNIPPET';
    payload: Snippet;
};

export type DeleteLikedSnippet = {
    type: 'DELETE_LIKED_SNIPPET';
    payload: number;
};

export type UpdateSnippet = {
    type: 'UPDATE_SNIPPET';
    payload: Snippet;
};

export type DeleteSnippets = {
    type: 'DELETE_SNIPPETS';
    payload: number[];
};

export type AddSnippet = {
    type: 'ADD_SNIPPET';
    payload: Snippet;
};

export type AddComment = {
    type: 'ADD_COMMENT';
    payload: Comment;
};

export type AddLikeSelected = {
    type: 'ADD_LIKE_SELECTED';
    payload: Like;
};

export type RemoveLikeSelected = {
    type: 'REMOVE_LIKE_SELECTED';
    payload: Like;
};

export type SnippetActions =
    | SaveSnippets
    | SaveSnippet
    | SaveLikedSnippets
    | SaveLikedSnippet
    | DeleteLikedSnippet
    | UpdateSnippet
    | DeleteSnippets
    | AddSnippet
    | AddComment
    | AddLikeSelected
    | RemoveLikeSelected;
