import axios from 'axios';
import { AppDispatch, RootState } from '..';
import { apiUrl } from '../../configs';
import { Comment } from '../../Types/Comment';
import { appDoneLoading, appLoading } from '../appState/actions';
import { HomeActions } from './types';
import { configs } from '../../Lib/TokenConfigs';
import { Snippet } from '../../Types/Snippet';
import {
    saveLikedSnippet,
    deleteLikedSnippet,
    addLikeSelected,
    removeLikeSelected
} from '../snippets/actions';
import { selectSnippet } from '../snippets/selectors';

export const savePopularSnippets = (snippets: Snippet[]): HomeActions => ({
    type: 'SAVE_POPULAR_SNIPPETS',
    payload: snippets
});

export const updateLike = (toAdd: {
    userId: number;
    snippetId: number;
}): HomeActions => ({
    type: 'ADD_LIKE',
    payload: toAdd
});

export const deleteLike = (toRemove: {
    userId: number;
    snippetId: number;
}): HomeActions => ({
    type: 'DELETE_LIKE',
    payload: toRemove
});

export const addComment = (comment: Comment): HomeActions => ({
    type: 'ADD_COMMENT',
    payload: comment
});

export const updateFeedPost = (snippet: Snippet): HomeActions => ({
    type: 'UPDATE_FEED_POST',
    payload: snippet
});

export const addFeedPost = (snippet: Snippet): HomeActions => ({
    type: 'ADD_FEED_POST',
    payload: snippet
});

export const deleteFeedPosts = (ids: number[]): HomeActions => ({
    type: 'DELETE_FEED_POSTS',
    payload: ids
});

export const fetchPopularSnippets = async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    try {
        dispatch(appLoading());
        const res = await axios.get(`${apiUrl}/home`);
        const snippets = res.data;
        dispatch(savePopularSnippets(snippets));
        dispatch(appDoneLoading());
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
        dispatch(appDoneLoading());
    }
};

export const createLike =
    (snippetId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const user = getState().user.state;
            if (!user) return;
            const userId = user.id;
            dispatch(updateLike({ userId, snippetId }));
            const isSnippetSelected = selectSnippet(getState());
            if (isSnippetSelected)
                dispatch(addLikeSelected({ userId, snippetId }));
            const res = await axios.post(
                `${apiUrl}/likes/${snippetId}`,
                {
                    userId,
                    snippetId
                },
                configs(user.token)
            );
            if (res.data.likedSnippet.userId !== userId)
                dispatch(saveLikedSnippet(res.data.likedSnippet));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };

export const removeLike =
    (snippetId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const user = getState().user.state;
            if (!user) return;
            const userId = user.id;
            dispatch(deleteLike({ userId, snippetId }));
            dispatch(deleteLikedSnippet(snippetId));
            const isSnippetSelected = selectSnippet(getState());
            if (isSnippetSelected)
                dispatch(removeLikeSelected({ userId, snippetId }));
            const res = await axios.delete(
                `${apiUrl}/likes/${snippetId}`,
                configs(user.token)
            );
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };

export const createComment =
    (snippetId: number, comment: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const user = getState().user.state;
            const res = await axios.post(
                `${apiUrl}/comments/`,
                {
                    snippetId,
                    text: comment
                },
                configs(user.token)
            );
            dispatch(addComment(res.data));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };
