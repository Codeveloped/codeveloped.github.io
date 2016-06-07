import React from 'react';
import {Route, Redirect} from 'react-router';

import Home from './components/Home';
import Page from './components/Page';

import ConsumerSignup from './components/ConsumerSignup';
import ParticipantSignup from './components/ParticipantSignup';
import LostCard from './components/LostCard';

import Login from './components/Login';
import Logout from './components/Logout';
import LostPassword from './components/LostPassword';
import ResetPassword from './components/ResetPassword';

import VoucherList from './components/VoucherList';
import VoucherDetail from './components/VoucherDetail';

import ConsumerQRCode from './components/ConsumerQRCode';
import ConsumerFavorite from './components/ConsumerFavorite';
import ConsumerProfile from './components/ConsumerProfile';
import ConsumerProfileChange from './components/ConsumerProfileChange';
import ConsumerActivate from './components/ConsumerActivate';
import ConsumerVoucherHistory from './components/ConsumerVoucherHistory';

import App from './containers/App';
import Consumer from './containers/Consumer';
import {adminURL} from './constants';


export default (
    <Route path="" component={App}>

        <Redirect from="/feedback" to="/pagina/feedback"/>
        <Redirect from="/support" to="/pagina/uitleg"/>

        <Route path="/" component={Home} />

        <Route path="/pagina/:page" component={Page}/>

        <Route path="/aanvragen/stadjerspas" component={ConsumerSignup}/>
        <Route path="/aanvragen/organisatie" component={ParticipantSignup}/>

        <Route path="/auth/login" component={Login} />
        <Route path="/auth/logout" component={Logout} />
        <Route path="/auth/lostPassword" component={LostPassword} />
        <route path="/auth/resetPassword/:uid/:token" component={ResetPassword} />

        <Redirect from="/login" to={adminURL + '/beheer/login/'} />

        <Route path="/activiteiten" component={VoucherList}/>
        <Route path="/activiteit/:voucherSlug" component={VoucherDetail}/>

        <Route path="/activeren" component={ConsumerActivate}/>

        <Route path="/profiel" component={Consumer}>
            <Route path="/profiel/qrcode" component={ConsumerQRCode}/>
            <Route path="/profiel/favorieten" component={ConsumerFavorite}/>
            <Route path="/profiel/gegevens" component={ConsumerProfile}/>
            <Route path="/profiel/gegevens/aanpassen" component={ConsumerProfileChange}/>
            <Route path="/profiel/historie" component={ConsumerVoucherHistory}/>
            <Route path="/aanvragen/nieuwepas" component={LostCard}/>
        </Route>

        <Redirect from="*" to="/" />

    </Route>
);
