import React from 'react';
import Root from './js/containers/Root';
import ReactDOM from 'react-dom';
import { Presets } from 'react-look/addons';

const lookConfig = Presets['react-dom'];


ReactDOM.render(
    <Root lookConfig={lookConfig} />,
    document.getElementById('react')
);
