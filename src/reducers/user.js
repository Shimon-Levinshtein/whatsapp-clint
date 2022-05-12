import { SING_UP } from "../actions/authentication";

const defaultState =  {
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userToken: '',
    signIn: false,
};

const variable = (state = defaultState, action) => {
    switch (action.type) {
        case SING_UP:
            const newState = { ...state };
            newState.userId = action.payload._id;
            newState.userName = action.payload.name;
            newState.userEmail = action.payload.mail;
            newState.userPhone = action.payload.phone;
            newState.userToken = action.payload.token;
            newState.signIn = true;
            localStorage.setItem('userId', action.payload._id);
            localStorage.setItem('userEmail', action.payload.name);
            localStorage.setItem('userToken', action.payload.token);
            return newState;
        default:
            return state;

    }
}

export default variable;