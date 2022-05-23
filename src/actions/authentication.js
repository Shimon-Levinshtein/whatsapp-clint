import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CHANGE_STATUS_POPUP } from "./popupsHeandler";


export const SING_UP = 'SING_UP';
export const LOGIN = 'LOGIN';
export const LOG_OUT = 'LOG_OUT';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const singUp = (obj) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        axios.post(`${serverUrl}/users/sing-up`, {
            data: obj
        })
            .then((response) => {
                dispatch({ type: SING_UP, payload: response.data });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
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
export const login = (obj) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        axios.post(`${serverUrl}/users/login`, {
            data: obj
        })
            .then((response) => {
                dispatch({ type: LOGIN, payload: response.data });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
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
export const loginRefresh = (obj, navigate) => {
    return async (dispatch) => {
        // axios.post(`http://10.0.2.122:3050/users/login-refresh`, {
        axios.post(`${serverUrl}/users/login-refresh`, {
            data: obj
        })
            .then((response) => {
                dispatch({ type: LOGIN, payload: response.data });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
            })
            .catch(error => {
                console.log('error..............');
                console.log(error);
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
                navigate('/login');
            });
    }
};
export const logOut = navigate => {
    navigate('/login');
    return async (dispatch) => {
        dispatch({ type: LOG_OUT, payload: {} });
    };
};
export const sendResetPassword = (mail, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        axios.post(`${serverUrl}/users/send-reset-password`, {
            data: { mail: mail }
        })
            .then((response) => {
                navigate('/login');
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
                dispatch({
                    type: CHANGE_STATUS_POPUP,
                    payload: {
                        type: 'PopupMessage',
                        yesOrNo: true,
                        typeText: 'PopupMessageData',
                        text: {
                            title: 'sent successfully',
                            message: `We sent you an email with a link to reset your password.`,
                            buttonText: 'Ok',
                        },
                    }
                });
            })
            .catch(error => {
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
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
export const changePassword = (obj, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        axios.post(`${serverUrl}/users/change-password`, {
            data: obj
        })
            .then((response) => {
                navigate('/login');
                dispatch({
                    type: CHANGE_STATUS_POPUP,
                    payload: {
                        type: 'PopupMessage',
                        yesOrNo: true,
                        typeText: 'PopupMessageData',
                        text: {
                            title: 'succeeded',
                            message: `Your password has changed successfully, you can login with the new password.`,
                            buttonText: 'Ok',
                        },
                    }
                });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
            })
            .catch(error => {
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
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