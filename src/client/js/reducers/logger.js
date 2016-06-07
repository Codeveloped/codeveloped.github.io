import store from '../store';

export default function (state = {}, action) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(action.type, store && store.getState() || null, action);
    }
    return state;
}
