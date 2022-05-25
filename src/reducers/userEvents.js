import { GAT_ALL_USER_EVENTS } from "../actions/events";

const defaultState =  [];

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case GAT_ALL_USER_EVENTS:
            return action.payload;
        default:
            return state;

    }
}

export default variable;