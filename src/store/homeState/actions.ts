import axios from 'axios';
import { AppDispatch, RootState } from '..';
import { apiUrl } from '../../configs';
import { appDoneLoading, appLoading } from '../appState/actions';
import { HomeActions, PopularSnippet } from './types';

export const savePopularSnippets = (
    snippets: PopularSnippet[]
): HomeActions => ({
    type: 'SAVE_POPULAR_SNIPPETS',
    payload: snippets
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
