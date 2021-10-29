import { SnippetState, SnippetActions} from './types';

const initialState: SnippetState = {
    list: [],
    selected: null
};

const reducer = (state = initialState, action: SnippetActions): SnippetState => {
    switch (action.type) {
        case 'SAVE_SNIPPET': 
            return {
                ...state,
                selected: action.payload
            }
        case 'SAVE_SNIPPETS': 
            return {
                ...state,
                list: action.payload
            }
        default: {
            return state;
        }
    }
};

export default reducer;
