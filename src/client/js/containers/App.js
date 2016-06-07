import React, {Component} from 'react';
import {connect} from 'react-redux';
import Look, { StyleSheet } from 'react-look';
import { Presets } from 'react-look/addons';
import DocumentTitle from 'react-document-title';

import Footer from '../components/Footer';

const lookConfig = Presets['react-dom'];


class App extends Component {

    clickHandler(ev) {
        //check if ev.target is an anchor
        if (ev.target.tagName !== 'A') return true;
        //check if ev.target has a "target" attribute
        if (ev.target.target) return true;

        //we have an anchor without (or "") target, we can intercept this and history.pushstate it
        var root = location.protocol + '//' + location.host;
        if (ev.target.href.indexOf(root) == 0) {
            ev.target.href = ev.target.href.slice(root.length);
        }

        ev.stopPropagation();
        ev.preventDefault();
        return false;
    }

    render() {
        return (
            <DocumentTitle title='Codeveloped'>
                <div lookConfig={lookConfig} onClick={::this.clickHandler}>

                    <div look={styles.mainWrapper}>
                        <div look={styles.content} className="content">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </DocumentTitle>
        )
    }
}

const styles = StyleSheet.create(App);


export default connect(state => ({
    authLoggedIn: state.auth.loggedIn
}))(Look(App))
