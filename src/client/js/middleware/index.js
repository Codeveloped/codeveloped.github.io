import thunk from 'redux-thunk';

import logger from './logger';
import crashReporter from './crashReporter';
import promiseMiddleware from './promiseMiddleware';
import {applyMiddleware} from 'redux';

export default applyMiddleware(
    logger,
    crashReporter,
    thunk,
    promiseMiddleware
);
