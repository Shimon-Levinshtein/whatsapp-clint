import { CREATE_EVETE_BY_TY, DELETE_EVETE, GAT_ALL_USER_EVENTS } from "../actions/events";

const defaultState =  [];

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case GAT_ALL_USER_EVENTS:
            return action.payload;
        case CREATE_EVETE_BY_TY:
            const newState = [...state];
            newState.push(action.payload);
            return newState;
        case DELETE_EVETE:
            const newStateA = state.filter(event => event._id !== action.payload);
            // newStateA.push(action.payload);
            return newStateA;
        default:
            return state;

    }
}

export default variable;