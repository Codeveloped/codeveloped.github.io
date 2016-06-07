import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import store from '../store';
import Look, { StyleSheet } from 'react-look';

import '../../css/global.css';


class Root extends Component {
    componentDidMount() {
        window.BOOTSTRAP_OK = true;
    }
    render() {
        return (
            <div className="root">
                <Provider store={store}>
                    <ReduxRouter />
                </Provider>
            </div>
        );
    }
}

export default Look(Root, {lookRoot: true});
