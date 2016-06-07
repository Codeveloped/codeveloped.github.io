import * as types from '../constants/ActionTypes';
import Auth from '../api/auth';


export function signIn(email, password) {
    return {
        types: [
            types.AUTH_SIGNIN,
            types.AUTH_SIGNIN_SUCCESS,
            types.AUTH_SIGNIN_FAIL],
        promise: Auth.signIn(email, password)
    };
}

export function signOut() {
    return {
        types: [
            types.AUTH_SIGNOUT,
            types.AUTH_SIGNOUT_SUCCESS,
            types.AUTH_SIGNOUT_FAIL],
        promise: Auth.signOut()
    };
}
