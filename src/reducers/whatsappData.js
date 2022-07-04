import { UPDATE_CONTACTS } from "../actions/whatsappData";

const defaultState =  {
    contacts: [],
    clientInfo: {},
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_CONTACTS:
            const newState = { ...state };
            newState.contacts = action.payload.contacts;
            newState.clientInfo = action.payload.clientInfo;
            return newState;
        default:
            return state;

    }
}

export default variable;