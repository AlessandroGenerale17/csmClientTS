import { SnippetState, SnippetActions } from './types';

const initialState: SnippetState = {
    list: [],
    liked: [],
    selected: null
};

const reducer = (
    state = initialState,
    action: SnippetActions
): SnippetState => {
    switch (action.type) {
        case 'SAVE_SNIPPET':
            return {
                ...state,
                selected: action.payload
            };
        case 'SAVE_SNIPPETS':
            return {
                ...state,
                list: action.payload
            };
        case 'SAVE_LIKED_SNIPPETS':
            return {
                ...state,
                liked: action.payload
            };
        case 'SAVE_LIKED_SNIPPET':
            return {
                ...state,
                liked: [...state.liked, action.payload]
            };
        case 'DELETE_LIKED_SNIPPET':
            return {
                ...state,
                liked: state.liked.filter(
                    (snippet) => snippet.id !== action.payload
                )
            };
        case 'DELETE_SNIPPETS':
            return {
                ...state,
                list: state.list.filter(
                    (snip) => !action.payload.includes(snip.id)
                )
            };
        case 'UPDATE_SNIPPET':
            return {
                ...state,
                list: state.list.map((snip) => {
                    if (snip.id === action.payload.id) {
                        return {
                            ...action.payload
                        };
                    }
                    return snip;
                })
            };
        case 'ADD_LIKE_SELECTED':
            return {
                ...state,
                selected: state.selected
                    ? {
                          ...state.selected,
                          likes: [...state.selected.likes, action.payload]
                      }
                    : null
            };
        case 'REMOVE_LIKE_SELECTED':
            return {
                ...state,
                selected: state.selected
                    ? {
                          ...state.selected,
                          likes: state.selected.likes.filter(
                              (like) => like.userId !== action.payload.userId
                          )
                      }
                    : null
            };
        case 'ADD_SNIPPET':
            return {
                ...state,
                list: [...state.list, action.payload]
            };
        case 'ADD_COMMENT':
            return {
                ...state,
                selected: state.selected
                    ? {
                          ...state.selected,
                          comments: [action.payload, ...state.selected.comments]
                      }
                    : null
            };
        default: {
            return state;
        }
    }
};

export default reducer;
