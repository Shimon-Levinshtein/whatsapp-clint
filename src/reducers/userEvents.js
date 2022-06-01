import { CREATE_EVETE_BY_TY, DELETE_EVETE, EDIT_EVETE_BY_ID, GAT_ALL_USER_EVENTS } from "../actions/events";

const defaultState = [];

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case GAT_ALL_USER_EVENTS:
            return action.payload;
        case CREATE_EVETE_BY_TY:
            const newState = [...state];
            newState.push(action.payload);
            return newState;
        case EDIT_EVETE_BY_ID:
            const newStateb = state.map(item => {
                if (item._id === action.payload._id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
            return newStateb;
        case DELETE_EVETE:
            const newStateA = state.filter(event => event._id !== action.payload);
            // newStateA.push(action.payload);
            return newStateA;
        default:
            return state;

    }
}

export default variable;