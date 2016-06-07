import Immutable from 'immutable';

import {
    CITYCARD_GET_REQUEST,
    CITYCARD_GET_REQUEST_SUCCESS,
    CITYCARD_GET_REQUEST_FAIL
    } from '../constants/ActionTypes';


const initialState = {
    isRequested: null,
    isLoading: false
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case CITYCARD_GET_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case CITYCARD_GET_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRequested: action.result
            };
        case CITYCARD_GET_REQUEST_FAIL:
            return {
                ...state,
                isLoading: false,
                isRequested: false
            };
        default:
            return state;
    }
}
