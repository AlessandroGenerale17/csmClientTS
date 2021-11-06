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
    showMessageWithTimeout
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

type ConfigsAuthWithData = {
    headers: {
        Authorization: string;
        Data: string;
    };
};

type ConfigsAuth = {
    headers: {
        Authorization: string;
    };
};

type Configs = ConfigsAuth | ConfigsAuthWithData;

const configs = (token: string, data?: readonly string[]): Configs =>
    data
        ? {
              headers: {
                  Authorization: `Bearer ${token}`,
                  Data: data.toString()
              }
          }
        : {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          };

const saveSnippets = (snippets: Snippet[]): SnippetActions => ({
    type: 'SAVE_SNIPPETS',
    payload: snippets
});

const saveSnippet = (snippet: Snippet): SnippetActions => ({
    type: 'SAVE_SNIPPET',
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
        const snippets: Snippet[] = res.data;
        dispatch(saveSnippets(snippets));
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

            //FIXME

            // if it is public then replace
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
                        // delefeed
                        console.log('deleting from feed');
                        dispatch(deleteFeedPost({ ...res.data }));
                    }
                }
            }

            dispatch(saveDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(saveDoneLoading());
        }
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
            // FIXME auth is missing in this route
            // FIXME missing userId
            const userId = 1;
            console.log('pubbbbbb action', pub);
            const res = await axios.post(`${apiUrl}/snippets/`, {
                title,
                description,
                code,
                userId,
                languageId,
                issue,
                public: pub
            });
            const newSnippet: Snippet = {
                ...res.data
            };
            dispatch(addSnippet(newSnippet));

            dispatch(
                showMessageWithTimeout(
                    'success',
                    true,
                    'Snippet added successfully!',
                    2500
                )
            );
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(appDoneLoading());
        }
    };
