
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';

export const updateContacts = (contacts) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CONTACTS, payload: contacts });
    };
};