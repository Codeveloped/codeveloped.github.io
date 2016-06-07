import store from '../store';

import * as auth from './auth';
import * as forms from './forms';


const Actions = {
    auth,
    forms
};

const BoundActions = {};


Object.keys(Actions).forEach(function (actionGroup) {
    BoundActions[actionGroup] = {};

    Object.keys(Actions[actionGroup]).forEach(function (actionName) {
        BoundActions[actionGroup][actionName] = function () {
            var args = Array.prototype.slice.call(arguments);
            var action = Actions[actionGroup][actionName].apply(null, args);
            store.dispatch(action);
            if (action.promise) return action.promise;
        }

    });

});

export default BoundActions;
