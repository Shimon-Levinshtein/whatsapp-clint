import axios from "axios";
import { CHANGE_STATUS_POPUP } from "./popupsHeandler";
import { authAxios } from "../authAxios";


export const GAT_ALL_USER_EVENTS = 'GAT_ALL_USER_EVENTS';
export const CREATE_EVETE_BY_TY = 'CREATE_EVETE_BY_TY';
export const EDIT_EVETE_BY_ID = 'EDIT_EVETE_BY_ID';
export const DELETE_EVETE = 'DELETE_EVETE';


const serverUrl = process.env.REACT_APP_SERVER_URL;

export const getUserEvents = () => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        authAxios().get(`/events/get-user-events`)
            .then((response) => {
                dispatch({ type: GAT_ALL_USER_EVENTS, payload: response.data });
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

export const createEventByType = (obj, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        authAxios().post(`/events/create-event-by-type`, {
            data: obj
        })
            .then((response) => {
                dispatch({ type: CREATE_EVETE_BY_TY, payload: response.data });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
                dispatch({
                    type: CHANGE_STATUS_POPUP,
                    payload: {
                        type: 'PopupSucceeded',
                        yesOrNo: true,
                        typeText: 'PopupSucceededData',
                        text: {
                            title: 'Awesome!',
                            message: 'Your event has been saved successfully, you can check all your Evnts on the "My Events" page.',
                            buttonText: 'OK',
                        },
                    }
                });
                navigate('/my-events');

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
export const editEventById = (obj, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: true } });
        authAxios().post(`/events/edit-event-by-id`, {
            data: obj
        })
            .then((response) => {
                dispatch({ type: EDIT_EVETE_BY_ID, payload: response.data });
                dispatch({ type: CHANGE_STATUS_POPUP, payload: { type: "Loading", yesOrNo: false } });
                dispatch({
                    type: CHANGE_STATUS_POPUP,
                    payload: {
                        type: 'PopupSucceeded',
                        yesOrNo: true,
                        typeText: 'PopupSucceededData',
                        text: {
                            title: 'Awesome!',
                            message: 'Your event changes has been saved successfully, you can check all your Evnts on the "My Events" page.',
                            buttonText: 'OK',
                        },
                    }
                });
                navigate('/my-events');
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
export const deleteEvent = (eventId) => {
    return async (dispatch) => {
        authAxios().post(`/events/delete-event`, {
            data: eventId
        })
            .then(() => {
                dispatch({ type: DELETE_EVETE, payload: eventId });
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
export const deleteEventLocal = (eventId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVETE, payload: eventId });
    }
};
