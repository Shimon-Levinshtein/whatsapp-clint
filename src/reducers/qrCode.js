import { CHANGE_KEY_QR_DATA, CHANGE_QR_CODE, STATUS_WHATSAAP_CONECTION, WHATSAAP_DISCONNECTED } from "../actions/changeQrCode";

const defaultState = {
    qrCode: '',
    whatsappConnected: false,
    requestQrCode: false,
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_QR_CODE:
            const newState = { ...state };
            newState.requestQrCode = false;
            newState.qrCode = action.payload;
            return newState;
        case STATUS_WHATSAAP_CONECTION:
            const newStateA = { ...state };
            newStateA.whatsappConnected = action.payload;
            newStateA.requestQrCode = false;
            return newStateA;
        case WHATSAAP_DISCONNECTED:
            const newStateB = { ...state };
            newStateB.qrCode = '';
            newStateB.whatsappConnected = false;
            newStateB.requestQrCode = true;
            return newStateB;
        case CHANGE_KEY_QR_DATA:
            const newStateC = { ...state };
            newStateC[action.payload.key] = action.payload.value;
            return newStateC;
        default:
            return state;

    }
}

export default variable;