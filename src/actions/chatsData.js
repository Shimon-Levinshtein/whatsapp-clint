
export const UPDATE_CHATS = 'UPDATE_CHATS';

export const updateChats = (chats) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CHATS, payload: chats });
    };
};