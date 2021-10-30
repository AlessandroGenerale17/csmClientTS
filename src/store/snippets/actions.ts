import { Dispatch } from 'redux';
import { AppDispatch, RootState } from '..';
import axios from 'axios';

import { apiUrl } from '../../configs';
import { Snippet } from '../../types/Snippet';
import { SnippetActions } from './types';
import { appDoneLoading, appLoading } from '../appState/actions';

const configs = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

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
