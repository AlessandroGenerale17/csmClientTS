import { AppDispatch, RootState } from '..';
import { ChallengeActions } from './types';
import { CodeSnippet } from '../../Types/Snippet';
import axios from 'axios';
import { apiUrl } from '../../configs';
import { appDoneLoading, appLoading } from '../appState/actions';

const saveChallenges = (snippets: CodeSnippet[]): ChallengeActions => ({
    type: 'SAVE_CHALLENGES',
    payload: snippets
});

const saveChallenge = (snippet: CodeSnippet): ChallengeActions => ({
    type: 'SAVE_CHALLENGE',
    payload: snippet
});

export const fetchChallenges = async (
    dispatch: AppDispatch,
    getState: () => RootState
) => {
    try {
        dispatch(appLoading());
        const res = await axios.get(`${apiUrl}/challenges/`);
        const challenges: CodeSnippet[] = res.data.map(
            (codeSnip: any): CodeSnippet => ({
                id: codeSnip.id,
                title: codeSnip.title,
                description: codeSnip.description,
                code: codeSnip.code,
                userId: codeSnip.userId,
                language: codeSnip.language.name,
                languageId: codeSnip.language.id,
                prompt: codeSnip.prompt,
                hiddenPrompt: codeSnip.hiddenPrompt,
                fName: codeSnip.fName,
                numArgs: codeSnip.numArgs,
                difficulty: {
                    name: codeSnip.difficulty.name,
                    value: codeSnip.difficulty.value
                },
                testcases: [],
                createdAt: codeSnip.createdAt,
                updatedAt: codeSnip.updatedAt
            })
        );
        dispatch(saveChallenges(challenges));
        dispatch(appDoneLoading());
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
        dispatch(appDoneLoading());
    }
};

export const fetchChallenge =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(appLoading());
            const res = await axios.get(`${apiUrl}/challenges/${id}`);
            dispatch(saveChallenge(res.data));
            dispatch(appDoneLoading());
        } catch (err) {
            if (err instanceof Error) console.log(err.message);
        }
    };
