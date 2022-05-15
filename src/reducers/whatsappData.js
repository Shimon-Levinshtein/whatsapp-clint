import { UPDATE_CONTACTS } from "../actions/whatsappData";

const defaultState =  {
    contacts: [],
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_CONTACTS:
            const newState = { ...state };
            newState.contacts = action.payload;
            return newState;
        default:
            return state;

    }
}

export default variable;