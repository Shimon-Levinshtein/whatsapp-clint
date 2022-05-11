import { REQUEST_CONECT } from "../actions/requestConnect";

const defaultState =  '';

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_CONECT:
            return action.payload;
        default:
            return state;

    }
}

export default variable;