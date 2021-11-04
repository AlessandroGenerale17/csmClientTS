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
        const snippets: Snippet[] = res.data.map(
            (snip: any): Snippet => ({
                id: snip.id,
                title: snip.title,
                description: snip.description,
                code: snip.code,
                userId: snip.userId,
                language: snip.language.name,
                languageId: snip.language.id,
                createdAt: snip.createdAt,
                updatedAt: snip.updatedAt
            })
        );
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
            dispatch(
                saveSnippet({ ...res.data, language: res.data.language.name })
            );
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
        languageId: number
    ) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(saveLoading());
            const res = await axios.patch(`${apiUrl}/snippets/${id}`, {
                title,
                code,
                languageId,
                description
            });
            dispatch(
                saveSnippet({ ...res.data, language: res.data.language.name })
            );
            // update snippet in  list of snippets
            dispatch(
                updateSnippet({
                    ...res.data, language: res.data.language.name
                })
            );
            dispatch(saveDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(saveDoneLoading());
        }
    };

/*
 * @param {readonly string[]} idsArray
 * action to delete one or more snippets
 * FIXME auth is missing for this route
 */
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
    (title: string, description: string, code: string, languageId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(appLoading());
            // FIXME auth is missing in this route
            // FIXME missing userId
            const userId = 1;
            const res = await axios.post(`${apiUrl}/snippets/`, {
                title,
                description,
                code,
                userId,
                languageId
            });
            const newSnippet: Snippet = {
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                code: res.data.code,
                userId: res.data.id,
                // FIXME THIS
                language: res.data.language.name,
                languageId: res.data.language.id,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt
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
