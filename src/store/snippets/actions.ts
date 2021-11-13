import { AppDispatch, RootState } from '..';
import axios from 'axios';

import { apiUrl } from '../../configs';
import { Snippet } from '../../Types/Snippet';
import { SnippetActions } from './types';
import {
    appDoneLoading,
    appLoading,
    saveDoneLoading,
    saveLoading,
    showAlertWithTimeout
} from '../appState/actions';

import {
    addFeedPost,
    deleteFeedPost,
    updateFeedPost
} from '../homeState/actions';
import {
    selectPopularSnippets,
    selectPopularSnippetsIds
} from '../homeState/selectors';
import { selectUser } from '../user/selectors';
import { selectSnippet } from './selectors';
import { configs } from '../../Lib/TokenConfigs';

const saveSnippets = (snippets: Snippet[]): SnippetActions => ({
    type: 'SAVE_SNIPPETS',
    payload: snippets
});

const saveLikedSnippets = (snippets: Snippet[]): SnippetActions => ({
    type: 'SAVE_LIKED_SNIPPETS',
    payload: snippets
});

const saveSnippet = (snippet: Snippet): SnippetActions => ({
    type: 'SAVE_SNIPPET',
    payload: snippet
});

export const saveLikedSnippet = (snippet: Snippet): SnippetActions => ({
    type: 'SAVE_LIKED_SNIPPET',
    payload: snippet
});

const updateSnippet = (snippet: Snippet): SnippetActions => ({
    type: 'UPDATE_SNIPPET',
    payload: snippet
});

const deleteSnippets = (idsArray: number[]): SnippetActions => ({
    type: 'DELETE_SNIPPETS',
    payload: idsArray
});

export const deleteLikedSnippet = (id: number): SnippetActions => ({
    type: 'DELETE_LIKED_SNIPPET',
    payload: id
});

const addSnippet = (snippet: Snippet): SnippetActions => ({
    type: 'ADD_SNIPPET',
    payload: snippet
});

export const fetchSnippets = async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    try {
        dispatch(appLoading());
        const user = getState().user.state;
        if (!user) return;
        const token = user.token;
        const res = await axios.get(`${apiUrl}/snippets`, configs(token));
        const snippets: Snippet[] = res.data.snippets;
        const likedSnippets: Snippet[] = res.data.likedSnippets;
        dispatch(saveSnippets(snippets));
        dispatch(saveLikedSnippets(likedSnippets));
        dispatch(appDoneLoading());
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
        dispatch(appDoneLoading());
    }
};

export const fetchSnippet =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            console.log('fetching snippet');
            dispatch(appLoading());
            const res = await axios.get(`${apiUrl}/snippets/${id}`);
            dispatch(saveSnippet({ ...res.data }));
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(appDoneLoading());
        }
    };

export const patchSnippet =
    (
        id: number,
        title: string,
        description: string,
        code: string,
        languageId: number,
        pub: boolean,
        issue: boolean
    ) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(saveLoading());
            const res = await axios.patch(`${apiUrl}/snippets/${id}`, {
                title,
                code,
                languageId,
                description,
                public: pub,
                issue
            });
            dispatch(saveSnippet({ ...res.data }));
            // update snippet in  list of snippets (manager)
            dispatch(
                updateSnippet({
                    ...res.data
                })
            );

            const popularSnippets = selectPopularSnippets(getState());
            if (popularSnippets.length > 0) {
                const isIncluded = selectPopularSnippetsIds(
                    getState()
                ).includes(id);
                console.log(isIncluded);
                if (pub) {
                    if (isIncluded) {
                        // update Feed
                        console.log('update feed');
                        dispatch(updateFeedPost({ ...res.data }));
                    } else {
                        // addToFeed
                        console.log('add feed');
                        dispatch(addFeedPost({ ...res.data }));
                    }
                } else {
                    if (isIncluded) {
                        // deleted
                        console.log('deleting from feed');
                        dispatch(deleteFeedPost(res.data.id));
                    }
                }
            }

            dispatch(saveDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(saveDoneLoading());
        }
    };

export const patchSnippetCode =
    (code: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(saveLoading());
            const snippet = selectSnippet(getState());
            if (!snippet) return;
            const res = await axios.patch(
                `${apiUrl}/snippets/code/${snippet.id}`,
                { code }
            );
            dispatch(saveSnippet({ ...res.data }));
            dispatch(saveDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(saveDoneLoading());
        }
    };

export const remoteSnippetUpdate =
    (updatedSnippet: Snippet) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
        console.log('action getting triggered ');
        dispatch(saveSnippet(updatedSnippet));
        dispatch(
            showAlertWithTimeout(
                `${updatedSnippet.user.name} recently updated the snippet contents`,
                'success'
            )
        );
    };

export const removeSnippets =
    (idsArray: readonly string[]) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(appLoading());
            const res =
                idsArray.length > 1
                    ? await axios.delete(`${apiUrl}/snippets`, {
                          headers: {
                              data: idsArray.toString()
                          }
                      })
                    : await axios.delete(`${apiUrl}/snippets/${idsArray[0]}`);
            dispatch(
                deleteSnippets(
                    idsArray
                        .toString()
                        .split(',')
                        .map((id) => parseInt(id))
                )
            );
            dispatch(deleteFeedPost(res.data.id));
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(appDoneLoading());
        }
    };

export const createSnippet =
    (
        title: string,
        description: string,
        code: string,
        languageId: number,
        pub: boolean,
        issue: boolean
    ) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(appLoading());
            const user = selectUser(getState());
            if (!user) return;
            const res = await axios.post(`${apiUrl}/snippets/`, {
                title,
                description,
                code,
                userId: user.id,
                languageId,
                issue,
                public: pub
            });
            const newSnippet: Snippet = {
                ...res.data
            };
            dispatch(addSnippet(newSnippet));
            dispatch(addFeedPost(newSnippet));

            dispatch(
                showAlertWithTimeout('Snippet added successfully!', 'success')
            );
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(appDoneLoading());
        }
    };
