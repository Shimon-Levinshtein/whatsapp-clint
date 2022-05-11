import { REQUEST_CONECT } from "../actions/requestConnect";

const defaultState =  {
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    userRole: '',
    userStatus: '',
    userToken: '',
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case REQUEST_CONECT:
            return action.payload;
        default:
            return state;

    }
}

export default variable;