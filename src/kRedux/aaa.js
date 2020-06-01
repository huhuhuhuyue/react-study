"use strict";
exports.__esModule = true;
var actionTypes_1 = require("./utils/actionTypes");
var warning_1 = require("./utils/warning");
var isPlainObject_1 = require("./utils/isPlainObject");
function getUndefinedStateErrorMessage(key, action) {
    var actionType = action && action.type;
    var actionDescription = (actionType && "action \"" + String(actionType) + "\"") || 'an action';
    return ("Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " +
        "To ignore an action, you must explicitly return the previous state. " +
        "If you want this reducer to hold no value, you can return null instead of undefined.");
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    var reducerKeys = Object.keys(reducers);
    var argumentName = action && action.type === actionTypes_1["default"].INIT
        ? 'preloadedState argument passed to createStore'
        : 'previous state received by the reducer';
    if (reducerKeys.length === 0) {
        return ('Store does not have a valid reducer. Make sure the argument passed ' +
            'to combineReducers is an object whose values are reducers.');
    }
    if (!isPlainObject_1["default"](inputState)) {
        var match = Object.prototype.toString
            .call(inputState)
            .match(/\s([a-z|A-Z]+)/);
        var matchType = match ? match[1] : '';
        return ("The " + argumentName + " has unexpected type of \"" +
            matchType +
            "\". Expected argument to be an object with the following " +
            ("keys: \"" + reducerKeys.join('", "') + "\""));
    }
    var unexpectedKeys = Object.keys(inputState).filter(function (key) { return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]; });
    unexpectedKeys.forEach(function (key) {
        unexpectedKeyCache[key] = true;
    });
    if (action && action.type === actionTypes_1["default"].REPLACE)
        return;
    if (unexpectedKeys.length > 0) {
        return ("Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " +
            ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") +
            "Expected to find one of the known reducer keys instead: " +
            ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored."));
    }
}
function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function (key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, { type: actionTypes_1["default"].INIT });
        if (typeof initialState === 'undefined') {
            throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " +
                "If the state passed to the reducer is undefined, you must " +
                "explicitly return the initial state. The initial state may " +
                "not be undefined. If you don't want to set a value for this reducer, " +
                "you can use null instead of undefined.");
        }
        if (typeof reducer(undefined, {
            type: actionTypes_1["default"].PROBE_UNKNOWN_ACTION()
        }) === 'undefined') {
            throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " +
                ("Don't try to handle " + actionTypes_1["default"].INIT + " or other actions in \"redux/*\" ") +
                "namespace. They are considered private. Instead, you must return the " +
                "current state for any unknown actions, unless it is undefined, " +
                "in which case you must return the initial state, regardless of the " +
                "action type. The initial state may not be undefined, but can be null.");
        }
    });
}
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (process.env.NODE_ENV !== 'production') {
            if (typeof reducers[key] === 'undefined') {
                warning_1["default"]("No reducer provided for key \"" + key + "\"");
            }
        }
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    // This is used to make sure we don't warn about the same
    // keys multiple times.
    var unexpectedKeyCache;
    if (process.env.NODE_ENV !== 'production') {
        unexpectedKeyCache = {};
    }
    var shapeAssertionError;
    try {
        assertReducerShape(finalReducers);
    }
    catch (e) {
        shapeAssertionError = e;
    }
    return function combination(state, action) {
        if (state === void 0) { state = {}; }
        if (shapeAssertionError) {
            throw shapeAssertionError;
        }
        if (process.env.NODE_ENV !== 'production') {
            var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
            if (warningMessage) {
                warning_1["default"](warningMessage);
            }
        }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i];
            var reducer = finalReducers[key];
            var previousStateForKey = state[key];
            var nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === 'undefined') {
                var errorMessage = getUndefinedStateErrorMessage(key, action);
                throw new Error(errorMessage);
            }
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        hasChanged =
            hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}
exports["default"] = combineReducers;
