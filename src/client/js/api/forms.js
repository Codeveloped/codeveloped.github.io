import request from '../lib/request';

let Api = {};


Api.contactForm = function (formData) {
    return request.post(`/api/form/contactForm`, formData);
};

export default Api;
