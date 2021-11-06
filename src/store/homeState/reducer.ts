import { HomeActions, HomeState } from './types';

const initialState: HomeState = {
    popularSnippets: []
};

const reducer = (state = initialState, action: HomeActions) => {
    switch (action.type) {
        case 'ADD_LIKE':
            return {
                ...state,
                popularSnippets: state.popularSnippets.map((snippet) => {
                    if (snippet.id === action.payload.snippetId) {
                        return {
                            ...snippet,
                            likes: [...snippet.likes, action.payload]
                        };
                    }
                    return snippet;
                })
            };
        case 'DELETE_LIKE':
            console.log(action);
            return {
                ...state,
                popularSnippets: state.popularSnippets.map((snippet) => {
                    if (snippet.id === action.payload.snippetId) {
                        return {
                            ...snippet,
                            likes: snippet.likes.filter(
                                (like) => like.userId !== action.payload.userId
                            )
                        };
                    }
                    return snippet;
                })
            };
        case 'ADD_COMMENT':
            return {
                ...state,
                popularSnippets: state.popularSnippets.map((snippet) => {
                    if (snippet.id === action.payload.snippetId) {
                        return {
                            ...snippet,
                            comments: [...snippet.comments, action.payload]
                        };
                    }
                    return snippet;
                })
            };
        case 'SAVE_POPULAR_SNIPPETS':
            return {
                ...state,
                popularSnippets: [...state.popularSnippets, ...action.payload]
            };
        default:
            return state;
    }
};

export default reducer;
