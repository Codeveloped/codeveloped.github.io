const logger = store => next => action => {

    if (process.env.NODE_ENV !== 'production') {
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result
    }

    return next(action);
};

export default logger;