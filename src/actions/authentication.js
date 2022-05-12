import axios from "axios";
import { CHANGE_STATUS_POPUP } from "./popupsHeandler";

export const SING_UP = 'SING_UP';

export const singUp = (obj) => {
    return async (dispatch) => {
        axios.post('http://10.0.2.122:3050/users/sing-up', {
            data: obj
        })
            .then((response) => {
                console.log('response......');
                console.log(response);
                dispatch({ type: SING_UP, payload: response.data });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: CHANGE_STATUS_POPUP,
                    payload: {
                        type: 'ErrorMessage',
                        yesOrNo: true,
                        typeText: 'ErrorMessageText',
                        text: {
                            message: error.response.data.error,
                            status: error.response.status,
                        },
                    }
                });
            });
    }
};