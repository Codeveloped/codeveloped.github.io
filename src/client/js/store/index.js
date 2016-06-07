import { createStore, combineReducers, compose } from 'redux';
import {reduxReactRouter} from 'redux-router';
import {createHistory} from 'history';

import middleware from '../middleware';
import * as reducers from '../reducers';
import routes from '../routes';

export const history = createHistory();


history.listen(location => {
    // Use setTimeout to make sure this runs after React Router's own listener
    setTimeout(() => {
        // Keep default behavior of restoring scroll position when user:
        // - clicked back button
        // - clicked on a link that programmatically calls `history.goBack()`
        // - manually changed the URL in the address bar (here we might want
        // to scroll to top, but we can't differentiate it from the others)
        if (location.action === 'POP') {
            return;
        }
        // In all other cases, check fragment/scroll to top
        var hash = window.location.hash;
        if (hash) {
            var element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        } else {
            window.scrollTo(0, 0);
        }
    });
});


const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = compose(
    middleware,
    reduxReactRouter({
        routes,
        history
    })
)(createStore);


const store = createStoreWithMiddleware(rootReducer, window.__INITIAL_DATA__);

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
