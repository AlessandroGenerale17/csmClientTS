import axios from 'axios';
import { AppDispatch, RootState } from '..';
import { apiUrl } from '../../configs';
import { appDoneLoading, appLoading } from '../appState/actions';
import { HomeActions, Like, PopularSnippet } from './types';

export const savePopularSnippets = (
    snippets: PopularSnippet[]
): HomeActions => ({
    type: 'SAVE_POPULAR_SNIPPETS',
    payload: snippets
});

export const updateLike = (like: Like): HomeActions => ({
    type: 'UPDATE_LIKE',
    payload: like
});

export const deleteLike = (toRemove: {
    userId: number;
    snippetId: number;
}): HomeActions => ({
    type: 'DELETE_LIKE',
    payload: toRemove
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
    (postId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            // FIXME should be auth
            const res = await axios.post(`${apiUrl}/home/like/${postId}`);
            dispatch(updateLike(res.data));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };

export const removeLike =
    (snippetId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            console.log('disliking ', snippetId);
            const res = await axios.delete(`${apiUrl}/home/like/${snippetId}`);
            const userId = 1;
            dispatch(deleteLike({ userId, snippetId }));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };
