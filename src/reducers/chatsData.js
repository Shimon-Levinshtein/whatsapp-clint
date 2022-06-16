import { ADD_TO_FOCUS_CHAT, UPDATE_CHATS } from "../actions/chatsData";

const defaultState = {
    chats: [],
    focusChats: false,
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_CHATS:
            const newState = { ...state };
            newState.chats = action.payload;
            return newState;
        case ADD_TO_FOCUS_CHAT:
            const newStateA = { ...state };
            newStateA.focusChats = action.payload;
            return newStateA;
        default:
            return state;

    }
}

export default variable;