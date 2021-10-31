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
                    if (snip.id === action.payload.id)
                        return {
                            ...action.payload
                        };
                    return snip;
                })
            };
        default: {
            return state;
        }
    }
};

export default reducer;
