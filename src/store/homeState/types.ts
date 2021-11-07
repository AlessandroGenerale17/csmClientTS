import { Comment } from '../../Types/Comment';
import { Snippet } from '../../Types/Snippet';

export type Like = {
    userId: number;
    snippetId: number;
};

export type HomeState = {
    popularSnippets: Snippet[];
};

export type SavePopularSnippets = {
    type: 'SAVE_POPULAR_SNIPPETS';
    payload: Snippet[];
};

export type UpdateFeedPost = {
    type: 'UPDATE_FEED_POST';
    payload: Snippet;
};

export type DeleteFeedPost = {
    type: 'DELETE_FEED_POST';
    payload: number;
};

export type AddFeedPost = {
    type: 'ADD_FEED_POST';
    payload: Snippet;
};

export type UpdateLike = {
    type: 'ADD_LIKE';
    payload: Like;
};

export type DeleteLike = {
    type: 'DELETE_LIKE';
    payload: Like;
};

export type AddComment = {
    type: 'ADD_COMMENT';
    payload: Comment;
};

export type HomeActions =
    | SavePopularSnippets
    | UpdateLike
    | DeleteLike
    | AddComment
    | AddFeedPost
    | DeleteFeedPost
    | UpdateFeedPost;
