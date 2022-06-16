
export const UPDATE_CHATS = 'UPDATE_CHATS';
export const ADD_TO_FOCUS_CHAT = 'ADD_TO_FOCUS_CHAT';

export const updateChats = (chats) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CHATS, payload: chats });
    };
};
export const addToFocusChats = (data) => {
    return async (dispatch) => {
        dispatch({ type: ADD_TO_FOCUS_CHAT, payload: data });
    };
};