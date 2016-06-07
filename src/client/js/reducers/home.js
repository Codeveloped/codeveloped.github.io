import Immutable from 'immutable';

import {
    TOP5_GET,
    TOP5_GET_SUCCESS,
    TOP5_GET_FAIL
    } from '../constants/ActionTypes';

const initialState = {
    top5Activities: Immutable.List(),
    top5Companies: Immutable.List(),
    lastTop5Activities: Immutable.List(),
    loading: false,
    error: false
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case TOP5_GET:
            return {
                ...state,
                error: false,
                loading: true
            };
        case TOP5_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                top5Activities: Immutable.fromJS(action.result.top5Activities),
                top5Companies: Immutable.fromJS(action.result.top5Companies),
                lastTop5Activities: Immutable.fromJS(action.result.lastTop5Activities)
            };
        case TOP5_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}
