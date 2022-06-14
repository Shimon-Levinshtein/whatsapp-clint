import { UPDATE_CHATS } from "../actions/chatsData";

const defaultState =  {
    chats: [],
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_CHATS:
            const newState = { ...state };
            newState.chats = action.payload;
            return newState;
        default:
            return state;

    }
}

export default variable;