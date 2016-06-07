import Immutable from 'immutable';
import {toRecordSet} from '../lib/immutableHelper';

import {
    FAVORITES_GET,
    FAVORITES_GET_SUCCESS,
    FAVORITES_GET_FAIL,
    FAVORITES_UNFAVORITE,
    FAVORITES_UNFAVORITE_SUCCESS,
    FAVORITES_UNFAVORITE_FAIL,
    FAVORITES_FAVORITE,
    FAVORITES_FAVORITE_SUCCESS,
    FAVORITES_FAVORITE_FAIL
} from '../constants/ActionTypes';


const initialState = {
    favorites: Immutable.List(),
    favoritesLoading: false,
    favoritesError: false,
    unfavoriteLoading: false,
    unfavoriteError: false,
    favoriteLoading: true,
    favoriteError: false
};

const FavoriteRecord = Immutable.Record({
    name: null,
    id: null
});


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case '@@redux/INIT':
            if (state !== initialState) {
                return {
                    ...initialState,
                    favorites: toRecordSet(state.favorites, FavoriteRecord)
                }
            }
            return state;
        case FAVORITES_GET:
            return {
                ...state,
                favoritesLoading: true,
                favoritesError: false
            };
        case FAVORITES_GET_SUCCESS:
            return {
                ...state,
                favoritesLoading: false,
                favorites: toRecordSet(action.result, FavoriteRecord)
            };
        case FAVORITES_GET_FAIL:
            return {
                ...state,
                favoritesLoading: false,
                favoritesError: action.error
            };
        case FAVORITES_UNFAVORITE:
            return {
                ...state,
                unfavoriteLoading: true,
                unfavoriteError: false
            };
        case FAVORITES_UNFAVORITE_SUCCESS:
            return {
                ...state,
                unfavoriteLoading: false,
                favorites: state.favorites.delete(action.result.id)
            };
        case FAVORITES_UNFAVORITE_FAIL:
            return {
                ...state,
                unfavoriteLoading: false,
                unfavoriteError: action.error
            };
        case FAVORITES_FAVORITE:
            return {
                ...state,
                favoriteLoading: true,
                favoriteError: false
            };
        case FAVORITES_FAVORITE_SUCCESS:
            return {
                ...state,
                favoriteLoading: false,
                favorites: state.favorites.set(action.result.id, FavoriteRecord(action.result))
            };
        case FAVORITES_FAVORITE_FAIL:
            return {
                ...state,
                favoriteLoading: false,
                favoriteError: action.error
            };
        default:
            return state;
    }
}
