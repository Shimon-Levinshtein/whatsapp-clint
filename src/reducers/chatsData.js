import { cloneDeep } from 'lodash';
import { ADD_TO_FOCUS_CHAT, UPDATE_CHATS, UPDATE_SINGLE_CHAT } from "../actions/chatsData";

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
        case UPDATE_SINGLE_CHAT:
            // const newChats = state.chats.map(item => {
            //     if (item.id._serialized === action.payload.chatId) {
            //         return {...item, chats: action.payload.chat};
            //     } else {
            //         return item;
            //     }
            // });
            const newStateB = cloneDeep(state);
            newStateB.focusChats.chats = action.payload.chat;
            return newStateB;
        default:
            return state;

    }
}

export default variable;