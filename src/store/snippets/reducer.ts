import { SnippetState, SnippetActions } from './types';

const initialState: SnippetState = {
    list: [],
    selected: null
};

const reducer = (
    state = initialState,
    action: SnippetActions
): SnippetState => {
    switch (action.type) {
        case 'SAVE_SNIPPET':
            console.log('SAVE SNIPPET', action.payload);
            return {
                ...state,
                selected: action.payload
            };
        case 'SAVE_SNIPPETS':
            return {
                ...state,
                list: action.payload
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
                        console.log('entered here ', action.payload);
                        return {
                            ...action.payload
                        };
                    }
                    return snip;
                })
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
