
export const v = {
    required: ['required'],
    maxLength: function (max) {return ['maxLength', max]},
    postalCodeNL: ['postalCodeNL'],
    date: function (format){ return ['date', format]},
    email: ['email'],
    isFile: ['isFile'],
    integer: ['isInteger'],
    url: ['isUrl']
};

var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

export const validator = function (validationRules, values) {
    var errors = {};

    Object.keys(validationRules).forEach(function (field) {
        var rules = validationRules[field];
        var value = (values[field] || {}).value;

        rules.forEach(function (rule) {
            switch (rule[0]) {
                case 'required':
                    if (!value) {
                        errors[field] = 'Dit veld is verplicht.'
                    }
                    break;
                case 'maxLength':
                    if (String(value).length > rule[1]) {
                        errors[field] = 'Maximale lengte is ' + rule[1] + '.';
                    }
                    break;
                case 'postalCodeNL':
                    if (! /[0-9]{4}[ -]?[a-zA-Z]{2}/.test(String(value))) {
                        errors[field] = 'Ongeldige postcode.';
                    }
                    break;
                case 'date':
                    if (! +new Date(value)) {
                        errors[field] = 'Ongeldige datum';
                    }
                    break;
                case 'email':
                    if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(String(value))) {
                        errors[field] = 'Ongeldig emailadres.'
                    }
                    break;
                case 'isFile':
                    if (Object.prototype.toString.call(value) !== '[object FileList]') {
                        errors[field] = 'Geen geldig bestand gekozen.'
                    }
                    break;
                case 'isInteger':
                    if (parseInt(value, 10) != value) {
                        errors[field] = 'Ongeldig nummer.'
                    }
                    break;
                case 'isUrl':
                    if (!urlPattern.test(value)) {
                        errors[field] = 'Ongeldige url.'
                    }
                    break;
                default:
                    throw 'Unsupported validation';
            }
        });
    });

    return errors;

};

