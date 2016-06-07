import request from '../lib/request';

let Api = {};


Api.signOut = function () {
    return request.post(`/api/auth/signOutConsumer`);
};

Api.signIn = function (email, password) {
    return request.post(`/api/auth/signInConsumer`, {username: email, password: password});
};

Api.checkQrCode = function () {
    return request.post(`/api/auth/checkQrCode`);
};


export default Api;
