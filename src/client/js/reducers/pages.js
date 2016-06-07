import Immutable from 'immutable';

import {
    PAGE_GET,
    PAGE_GET_FAIL,
    PAGE_GET_SUCCESS
} from '../constants/ActionTypes';


const emptyPage = {
    slug: null,
    error: null,
    content: null,
    title: null
};

const initialState = {
    page: {}
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case PAGE_GET:
            return {
                page: {
                    ...state.page,
                    [action.slug]: {
                        ...emptyPage
                    }
                }
            };
        case PAGE_GET_FAIL:
            return {
                page: {
                    ...state.page,
                    [action.slug]: {
                        ...emptyPage,
                        content: [],
                        error: action.error
                    }
                }
            };
        case PAGE_GET_SUCCESS:
            return {
                page: {
                    ...state.page,
                    [action.slug]: {
                        ...emptyPage,
                        slug: action.slug,
                        content: action.result.main_content || [],
                        title: action.result.title || ''
                    }
                }
            };
        default:
            return state;
    }
}
