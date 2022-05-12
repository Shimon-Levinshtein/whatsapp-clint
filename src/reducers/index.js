import { combineReducers } from 'redux';
import qrCode from './qrCode';
import popupControler from './popupControler';
import user from './user';


export default combineReducers({
    qrCode: qrCode,
    popupControler: popupControler,
    userData: user,
});