import React, {Component} from 'react';
import Look, { StyleSheet } from 'react-look';
import {connect} from 'react-redux';
//import {Link} from 'react-router';
import Link from './Link';
import DocumentTitle from 'react-document-title';

import dotdotdot from '../lib/dotdotdot';
import Actions from '../actions';
import homeCss from '../../css/Home.css';
import Page from './Page.js'
import {getVerticalImage} from '../lib/image';

import {baseMediaURL} from '../constants';


class Home extends Component {

    render() {

        return (
            <div look={styles.contentWrapper}>
                <Page params={{page:'homepage'}}/>

            </div>
        )
    }
}

const styles = StyleSheet.create(Home, homeCss);

export default connect(
    function(state) {
        return {
            top5Activities: state.home.top5Activities,
            top5Companies: state.home.top5Companies,
            lastTop5Activities: state.home.lastTop5Activities,
            loading: state.home.loading,
            error: state.home.error
        }
    }
)(Look(Home));
