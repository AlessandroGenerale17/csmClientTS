import { HomeActions, HomeState } from './types';

const initialState: HomeState = {
    popularSnippets: [],
    issueSnippets: []
};

const reducer = (state = initialState, action: HomeActions) => {
    switch (action.type) {
        case 'SAVE_POPULAR_SNIPPETS':
            return {
                ...state,
                popularSnippets: [
                    ...state.popularSnippets,
                    ...action.payload.filter((snip) => !snip.issue)
                ],
                issueSnippets: [
                    ...state.issueSnippets,
                    ...action.payload.filter((snip) => snip.issue)
                ]
            };
        default:
            return state;
    }
};

export default reducer;
