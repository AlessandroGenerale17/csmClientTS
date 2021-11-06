import axios from 'axios';
import { AppDispatch, RootState } from '..';
import { apiUrl } from '../../configs';
import { Comment } from '../../Types/Comment';
import { appDoneLoading, appLoading } from '../appState/actions';
import { HomeActions, Like, PopularSnippet } from './types';
import { configs } from '../../Lib/TokenConfigs';

export const savePopularSnippets = (
    snippets: PopularSnippet[]
): HomeActions => ({
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

export const fetchPopularSnippets = async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    try {
        dispatch(appLoading());
        const res = await axios.get(`${apiUrl}/home`);
        const snippets: PopularSnippet[] = res.data.map(
            (snip: any): PopularSnippet => ({
                id: snip.id,
                title: snip.title,
                description: snip.description,
                language: snip.language.name,
                author: {
                    id: snip.user.id,
                    name: snip.user.name
                },
                likes: snip.likes,
                comments: snip.comments,
                issue: snip.issue,
                createdAt: snip.createdAt,
                updatedAt: snip.updatedAt
            })
        );
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
            // FIXME should be auth
            const user = getState().user.state;
            if (!user) return;
            const userId = user.id;
            dispatch(updateLike({ userId, snippetId }));
            const res = await axios.post(
                `${apiUrl}/likes/${snippetId}`,
                {
                    userId,
                    snippetId
                },
                configs(user.token)
            );
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
            console.log('Creating comment ', comment);
            const userId = 1;
            const res = await axios.post(`${apiUrl}/comments/`, {
                userId,
                snippetId,
                text: comment
            });
            console.log(res.data);
            dispatch(addComment(res.data));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };
