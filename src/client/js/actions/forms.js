import * as types from '../constants/ActionTypes';
import Forms from '../api/forms';


export function contactForm(formData) {
    return {
        types: [
            types.FORM_CONTACT_FORM_SEND,
            types.FORM_CONTACT_FORM_SEND_SUCCESS,
            types.FORM_CONTACT_FORM_SEND_FAIL],
        promise: Forms.contactForm(formData)
    };
}
