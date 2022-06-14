import { combineReducers } from 'redux';
import qrCode from './qrCode';
import popupControler from './popupControler';
import user from './user';
import whatsappData from './whatsappData';
import userEvents from './userEvents';
import chatsData from './chatsData';


export default combineReducers({
    qrCode: qrCode,
    popupControler: popupControler,
    userData: user,
    whatsappData: whatsappData,
    userEvents: userEvents,
    chatsData: chatsData,
});