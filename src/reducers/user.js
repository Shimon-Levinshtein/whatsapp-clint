import { LOGIN, LOG_OUT, SING_UP } from "../actions/authentication";

const defaultState = {
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
            localStorage.setItem('userEmail', action.payload.mail);
            localStorage.setItem('userToken', action.payload.token);
            return newState;
        case LOGIN:
            const newStateB = { ...state };
            newStateB.userId = action.payload._id;
            newStateB.userName = action.payload.name;
            newStateB.userEmail = action.payload.mail;
            newStateB.userPhone = action.payload.phone;
            newStateB.userToken = action.payload.token;
            newStateB.signIn = true;
            localStorage.setItem('userId', action.payload._id);
            localStorage.setItem('userEmail', action.payload.mail);
            localStorage.setItem('userToken', action.payload.token);
            return newStateB;
        case LOG_OUT:
            localStorage.setItem('userId', '');
            localStorage.setItem('userEmail', '');
            localStorage.setItem('userToken', '');
            return defaultState;
        default:
            return state;

    }
}

export default variable;