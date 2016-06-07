import Promise from 'bluebird';
import superagent from 'superagent';
import csrf from 'superagent-csrf';

import {apiURL} from '../constants';


csrf(superagent);

let request = {};
let tokenPromise;


if (window._csrf) {
    tokenPromise = new Promise((resolve) => {resolve(window._csrf);});
} else {
    tokenPromise = (new Promise((resolve, reject) => {
        superagent.get(apiURL + '/api/csrf/getToken?_nocache=' + (+new Date()) + (++increment)).end((err, res) => {
            window.tokenStatus = [err, res];
            if (err) {
                reject(createError(res, err))
            } else {
                resolve(res.body)
            }
        });
    }));
}

let increment = 0;

function toQuery(obj) {
    var query = [];

    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (Object.prototype.toString.call(value) === '[object Object]')
            value = JSON.stringify(value);

        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });

    query.push('_nocache=' + (+new Date()) + (++increment));

    return query.join('&');
}

function createError(res, err) {
    if (res && res.body && res.body.error) return res.body.error;
    return {
        name: 'Error',
        status: res && res.status || 500,
        message: res && res.statusText || err.message,
        statusCode: res && res.statusCode || 500
    }
}

request.get = function(path, queryArgs) {
    if (path.indexOf('http') === -1) path = apiURL + path;
    var queryString = toQuery(queryArgs || {});
    var glue = '?';
    if (path.indexOf('?') !== -1)
        glue = '&';

    path = path + glue + queryString;

    return tokenPromise.then(function (token) {
        return new Promise((resolve, reject) => {
            superagent.get(path).end((err, res) => {
                if (err) {
                    reject(createError(res, err))
                } else {
                    resolve(res.body)
                }
            })
        })
    });
};

request.post = function(path, body, multipart=false) {
    if (path.indexOf('http') === -1) path = apiURL + path;

    return tokenPromise.then(function (token) {
        return new Promise((resolve, reject) => {
            let req = superagent.post(path).csrf(token);

            if (multipart === false) {
                req = req.send(body);
            } else {
                //TODO recurse deep

                Object.keys(body).forEach(function (key) {
                    var value = body[key];

                    if (Object.prototype.toString.call(value) === '[object FileList]') {

                        if (value.length === 1) {
                            req = req.attach(key, value.item(0), value.item(0).name);
                        }
                        if (value.length > 1) {
                            for (var i = 0, l = value.length; i < l; ++i) {
                                req = req.attach(key + '[]', value.item(i), value.item(i).name);
                            }
                        }

                    } else {
                        req = req.field(key, value);
                    }

                });

            }

            req.end((err, res) => {
                if (err) {
                    reject(createError(res, err))
                } else {
                    resolve(res.body)
                }
            });

        })
    });
};



export default request;