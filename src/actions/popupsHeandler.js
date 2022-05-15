export const CHANGE_STATUS_POPUP = 'CHANGE_STATUS_POPUP';

export const changeStutusPopupByType = ({type, yesOrNo, typeText = 'nothing', text = ''}) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_STATUS_POPUP, payload: {type, yesOrNo, typeText, text}});
    }
};