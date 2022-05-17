import { CHANGE_QR_CODE, STATUS_WHATSAAP_CONECTION } from "../actions/changeQrCode";

const defaultState =  {
    qrCode: '',
    whatsappConnected: false,
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_QR_CODE:
            const newState = { ...state };
            newState.qrCode = action.payload;   
            return newState;
        case STATUS_WHATSAAP_CONECTION:
            const newStateA = { ...state };
            newStateA.whatsappConnected = action.payload;   
            return newStateA;
        default:
            return state;

    }
}

export default variable;