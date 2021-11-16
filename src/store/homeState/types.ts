import { Comment } from '../../types/Comment';
import { Snippet } from '../../types/Snippet';

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

export type DeleteFeedPosts = {
    type: 'DELETE_FEED_POSTS';
    payload: number[];
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
    | DeleteFeedPosts
    | UpdateFeedPost;
