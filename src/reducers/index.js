import { combineReducers } from 'redux';
import qrCode from './qrCode';
import popupControler from './popupControler';
import user from './user';
import whatsappData from './whatsappData';


export default combineReducers({
    qrCode: qrCode,
    popupControler: popupControler,
    userData: user,
    whatsappData: whatsappData,
});