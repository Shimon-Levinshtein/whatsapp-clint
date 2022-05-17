import axios from "axios";

export const CHANGE_QR_CODE = 'CHANGE_QR_CODE';
export const STATUS_WHATSAAP_CONECTION = 'STATUS_WHATSAAP_CONECTION';

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