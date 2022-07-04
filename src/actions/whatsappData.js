
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';

export const updateContacts = (contacts, clientInfo) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CONTACTS, payload: {contacts, clientInfo} });
    };
};