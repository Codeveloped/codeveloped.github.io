import React, {Component} from 'react';
//import {Link} from 'react-router';
import Link from './Link';
import Look, { StyleSheet } from 'react-look';

import footerCss from '../../css/Footer.css';
import {adminURL} from '../constants';


class Footer extends Component {

    render() {
        return (
            <div>

            </div>
        )
    }
}

const styles = StyleSheet.create(Footer, footerCss);

export default Look(Footer);
