//import Immutable from 'immutable';

import {
    AUTH_SIGNIN,
    AUTH_SIGNIN_SUCCESS,
    AUTH_SIGNIN_FAIL,

    AUTH_SIGNOUT,
    AUTH_SIGNOUT_SUCCESS,
    AUTH_SIGNOUT_FAIL,

    AUTH_CHECK_QRCODE,
    AUTH_CHECK_QRCODE_SUCCESS,
    AUTH_CHECK_QRCODE_FAIL

} from '../constants/ActionTypes';


const emptyUser = {
    id: null,
    username: null,
    email: null,
    qrCode: null,
    children: null
};

const initialState = {
    user: emptyUser,
    loggedIn: false,

    signInError: null,
    signingIn: false,

    signOutError: null,
    signingOut: false
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_SIGNIN:
            return {
                ...state,
                signingIn: true,
                signInError: null,
                loggedIn: false
            };
        case AUTH_SIGNIN_SUCCESS:
            return {
                ...state,
                signingIn: false,
                user: action.result,
                signInError: null,
                loggedIn: true
            };
        case AUTH_SIGNIN_FAIL:
            return {
                ...state,
                signingIn: false,
                user: emptyUser,
                signInError: action.error,
                loggedIn: false
            };
        case AUTH_SIGNOUT:
            return {
                ...state,
                signingOut: true,
                signOutError: false
            };
        case AUTH_SIGNOUT_SUCCESS:
            return {
                ...state,
                signingOut: false,
                signOutError: false,
                user: emptyUser,
                loggedIn: false
            };
        case AUTH_SIGNOUT_FAIL:
            return {
                ...state,
                signingOut: false,
                signOutError: action.error
            };

        case AUTH_CHECK_QRCODE:
        case AUTH_CHECK_QRCODE_FAIL:
            return state;
        case AUTH_CHECK_QRCODE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    qrCode: action.result
                }
            };
        default:
            return state;
    }
}
