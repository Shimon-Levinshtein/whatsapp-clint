import axios from "axios";

export const CHANGE_QR_CODE = 'CHANGE_QR_CODE';

export const changeQrCode = (qrCode) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_QR_CODE, payload: qrCode });
    };
};