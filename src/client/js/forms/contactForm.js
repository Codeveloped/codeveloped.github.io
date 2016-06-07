import Actions from '../actions';
import {validator, v} from './validators';
import djangoFormHandler from './django';


export const contactFormSetup  = {
    form: 'contactForm',
    fields: ['name', 'email', 'body', 'qr_code', 'phone_number'],
    onSubmit: function (formData) {
        return djangoFormHandler(Actions.forms.contactForm(formData));
    },
    validate: (values, props) => {
        let validations = {
            name: [v.required, v.maxLength(255)],
            email: [v.required, v.email],
            body: [v.required]
        };
        return validator(validations, props.form);
    }
};

export const nextRoute = '/';
