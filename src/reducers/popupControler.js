import { CHANGE_STATUS_POPUP } from '../actions/popupsHeandler';

const defaultState = {
    ErrorMessage: false,
    ErrorMessageText: {
        message: '',
        status: '',
    },
    Loading: true,
    nothing: '',
    PopupMessage: false,
    PopupMessageData: {
        title:  '',
        message: '',
        buttonText: '',
    },
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS_POPUP:
            const newState = { ...state };
            newState[action.payload.type] = action.payload.yesOrNo;
            if (action.payload.typeText) {
                newState[action.payload.typeText] = action.payload.text;
            }
            return newState;
        default:
            return state;
    }
}

export default variable;