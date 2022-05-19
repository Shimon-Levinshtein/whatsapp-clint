import axios from "axios";

export const CHANGE_QR_CODE = 'CHANGE_QR_CODE';
export const STATUS_WHATSAAP_CONECTION = 'STATUS_WHATSAAP_CONECTION';
export const WHATSAAP_DISCONNECTED = 'WHATSAAP_DISCONNECTED';
export const CHANGE_KEY_QR_DATA = 'CHANGE_KEY_QR_DATA';

export const changeQrCode = (qrCode) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_QR_CODE, payload: qrCode });
    };
};
export const changeStatusConection = (status) => {
    return async (dispatch) => {
        dispatch({ type: STATUS_WHATSAAP_CONECTION, payload: status });
    };
};
export const whatsappDisconnected = () => {
    return async (dispatch) => {
        dispatch({ type: WHATSAAP_DISCONNECTED, payload: {} });
    };
};
export const changekeyQrData = ({key, value}) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_KEY_QR_DATA, payload: {key, value} });
    };
};