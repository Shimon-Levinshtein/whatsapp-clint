import { CHANGE_QR_CODE } from "../actions/changeQrCode";

const defaultState =  '';

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_QR_CODE:
            return action.payload;
        default:
            return state;

    }
}

export default variable;