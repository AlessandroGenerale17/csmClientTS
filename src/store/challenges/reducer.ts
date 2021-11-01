import { ChallengeActions, ChallengeState } from './types';

const initialState: ChallengeState = {
    list: [],
    selected: null
};

const reducer = (state = initialState, action: ChallengeActions) => {
    switch (action.type) {
        case 'SAVE_CHALLENGES':
            return {
                ...state,
                list: action.payload
            };
        case 'SAVE_CHALLENGE':
            return {
                ...state,
                selected: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
