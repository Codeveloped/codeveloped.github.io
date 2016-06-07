
var _apiURL;

if (process.env.NODE_ENV === 'production') {
    _apiURL = 'https://www.codeveloped.nl';
} else if (process.env.NODE_ENV === 'staging') {
    _apiURL = 'https://www.codeveloped.nl';
} else if (process.env.NODE_ENV === 'development') {
    _apiURL = location.protocol + '//' + location.host;
} else {
    throw new Error('invalid NODE_ENV');
}

export const apiURL = _apiURL;

export const baseMediaURL = apiURL + '/media/';

export const staticURL = apiURL + '/static/';

