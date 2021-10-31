import { Dispatch } from 'redux';
import { AppDispatch, RootState } from '..';
import axios from 'axios';

import { apiUrl } from '../../configs';
import { Snippet } from '../../types/Snippet';
import { SnippetActions } from './types';
import { appDoneLoading, appLoading } from '../appState/actions';

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
    (id: number, code: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(appLoading());
            const res = await axios.patch(`${apiUrl}/snippets/${id}`, {
                code: code
            });
            dispatch(saveSnippet({ ...res.data }));
            // update snippet in  list of snippets
            dispatch(updateSnippet({ ...res.data }));
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
            dispatch(appDoneLoading());
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
            // TODO Dispatch to reducer the deleted stuff
            // FIXME
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
