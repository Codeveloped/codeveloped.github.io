import ErrorApi from '../api/error';


function errorHandler(error) {
    var obj = {};

    if (error.message) {
        obj.message = error.message;
    }
    if (error.name) {
        obj.name = error.name;
    }
    if (error.stack) {
        obj.stack = Object.prototype.toString.call(error.stack);
    }

    ErrorApi.reportError(obj);

}

window.onerror = errorHandler;

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Caught an exception!', err);
            throw err
        } else {
            errorHandler(err);
        }
    }
};

export default crashReporter;
