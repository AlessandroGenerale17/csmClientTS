import { Comment } from '../../Types/Comment';

export type PopularSnippet = {
    id: number;
    author: {
        name: string;
        id: number;
    };
    language: string;
    issue: boolean;
    title: string;
    description: string;
    likes: Like[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
};

export type Like = {
    userId: number;
    snippetId: number;
};

export type HomeState = {
    popularSnippets: PopularSnippet[];
};

export type SavePopularSnippets = {
    type: 'SAVE_POPULAR_SNIPPETS';
    payload: PopularSnippet[];
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
    | AddComment;
