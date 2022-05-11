import axios from "axios";

export const REQUEST_CONECT = 'REQUEST_CONECT';

export const requestConnect = (obj) => {
    return async (dispatch) => {
        axios.post('http://10.0.2.122:3050/whatsapp/connect-qr', {
            userId: 1
        })
            .then((response) => {
                dispatch({ type: REQUEST_CONECT, payload: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
};