import { Dispatch } from 'redux';
import { RootState } from '..';
import axios from 'axios';

import { apiUrl } from '../../configs';
import { Snippet } from '../../types/Snippet';
import { SnippetActions } from './types';

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

export const fetchSnippets = async (
    dispatch: Dispatch,
    getState: () => RootState
) => {
    try {
        const token = getState().user.state.token;
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
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
    }
};

export const fetchSnippet =
    (id: number) => async (dispatch: Dispatch, getState: () => RootState) => {
        try {
            const res = await axios.get(`${apiUrl}/snippets/${id}`);
            dispatch(saveSnippet({ ...res.data }));
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };
