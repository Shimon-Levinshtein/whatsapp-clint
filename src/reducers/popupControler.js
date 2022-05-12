import { CHANGE_STATUS_POPUP } from '../actions/popupsHeandler';

const defaultState = {
    ErrorMessage: false,
    ErrorMessageText: {
        message: '',
        status: '',
    },
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS_POPUP:
            const newState = { ...state };
            newState[action.payload.type] = action.payload.yesOrNo;
            newState[action.payload.typeText] = action.payload.text;
            return newState;
        default:
            return state;
    }
}

export default variable;