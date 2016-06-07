import Immutable from 'immutable';

import {
    FORM_CONTACT_FORM_SEND,
    FORM_CONTACT_FORM_SEND_SUCCESS,
    FORM_CONTACT_FORM_SEND_FAIL,
    FORM_CONTACT_FORM_RESET,
    FORM_CONSUMER_SIGNUP_SEND,
    FORM_CONSUMER_SIGNUP_SEND_SUCCESS,
    FORM_CONSUMER_SIGNUP_SEND_FAIL,
    FORM_LOST_CARD_SEND,
    FORM_LOST_CARD_SEND_SUCCESS,
    FORM_LOST_CARD_SEND_FAIL,
    FORM_PARTICIPANT_SIGNUP_SEND,
    FORM_PARTICIPANT_SIGNUP_SEND_SUCCESS,
    FORM_PARTICIPANT_SIGNUP_SEND_FAIL,
    FORM_CONSUMER_ACTIVATE_SEND,
    FORM_CONSUMER_ACTIVATE_SUCCESS,
    FORM_CONSUMER_ACTIVATE_FAIL,
    FORM_CONSUMER_PROFILE_CHANGE,
    FORM_CONSUMER_PROFILE_CHANGE_SUCCESS,
    FORM_CONSUMER_PROFILE_CHANGE_FAIL,
    FORM_RESET_PASSWORD,
    FORM_RESET_PASSWORD_SUCCESS,
    FORM_RESET_PASSWORD_FAIL,
    FORM_LOST_PASSWORD,
    FORM_LOST_PASSWORD_SUCCESS,
    FORM_LOST_PASSWORD_FAIL

} from '../constants/ActionTypes';


const initialContactForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});

const initialConsumerSignupForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialParticipantSignupForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialConsumerActivateForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialConsumerProfileChangeForm= Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialVoucherReservationForm= Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialLostCardForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialLostPasswordForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});
const initialResetPasswordForm = Immutable.Map({
    loading: false,
    success: false,
    error: false
});

const initialState = {
    contactForm: initialContactForm,
    consumerSignupForm: initialConsumerSignupForm,
    lostCardForm: initialLostCardForm,
    participantSignupForm: initialParticipantSignupForm,
    consumerActivateForm: initialConsumerActivateForm,
    consumerProfileChangeForm: initialConsumerProfileChangeForm,
    voucherReservationForm: initialVoucherReservationForm,
    lostPasswordForm: initialLostPasswordForm,
    resetPasswordForm: initialResetPasswordForm
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case FORM_CONTACT_FORM_RESET:
            return {
                ...state,
                contactForm: initialContactForm
            };
        case FORM_CONTACT_FORM_SEND:
            return {
                ...state,
                contactForm: initialContactForm.set('loading', true)
            };
        case FORM_CONTACT_FORM_SEND_SUCCESS:
            return {
                ...state,
                contactForm: initialContactForm.set('success', action.result)
            };
        case FORM_CONTACT_FORM_SEND_FAIL:
            return {
                ...state,
                contactForm: initialContactForm.set('error', action.error)
            };
        case FORM_CONSUMER_SIGNUP_SEND:
            return {
                ...state,
                consumerSignupForm: initialConsumerSignupForm.set('loading', true)
            };
        case FORM_CONSUMER_SIGNUP_SEND_SUCCESS:
            return {
                ...state,
                consumerSignupForm: initialConsumerSignupForm.set('success', action.result)
            };
        case FORM_CONSUMER_SIGNUP_SEND_FAIL:
            return {
                ...state,
                consumerSignupForm: initialConsumerSignupForm.set('error', action.error)
            };
        case FORM_LOST_CARD_SEND:
            return {
                ...state,
                lostCardForm: initialLostCardForm.set('loading', true)
            };
        case FORM_LOST_CARD_SEND_SUCCESS:
            return {
                ...state,
                lostCardForm: initialLostCardForm.set('success', action.result)
            };
        case FORM_LOST_CARD_SEND_FAIL:
            return {
                ...state,
                lostCardForm: initialLostCardForm.set('error', action.error)
            };
        case FORM_PARTICIPANT_SIGNUP_SEND:
            return {
                ...state,
                participantSignupForm: initialParticipantSignupForm.set('loading', true)
            };
        case FORM_PARTICIPANT_SIGNUP_SEND_SUCCESS:
            return {
                ...state,
                participantSignupForm: initialParticipantSignupForm.set('success', action.result)
            };
        case FORM_PARTICIPANT_SIGNUP_SEND_FAIL:
            return {
                ...state,
                participantSignupForm: initialParticipantSignupForm.set('error', action.error)
            };
        case FORM_CONSUMER_ACTIVATE_SEND:
            return {
                ...state,
                consumerActivateForm: initialConsumerActivateForm.set('loading', true)
            };
        case FORM_CONSUMER_ACTIVATE_SUCCESS:
            return {
                ...state,
                consumerActivateForm: initialConsumerActivateForm.set('success', action.result)
            };
        case FORM_CONSUMER_ACTIVATE_FAIL:
            return {
                ...state,
                consumerActivateForm: initialConsumerActivateForm.set('error', action.error)
            };
        case FORM_CONSUMER_PROFILE_CHANGE:
            return {
                ...state,
                consumerProfileChangeForm: initialConsumerProfileChangeForm.set('loading', true)
            };
        case FORM_CONSUMER_PROFILE_CHANGE_SUCCESS:
            return {
                ...state,
                consumerProfileChangeForm: initialConsumerProfileChangeForm.set('success', action.result)
            };
        case FORM_CONSUMER_PROFILE_CHANGE_FAIL:
            return {
                ...state,
                consumerProfileChangeForm: initialConsumerProfileChangeForm.set('error', action.error)
            };
        case FORM_RESET_PASSWORD:
            return {
                ...state,
                resetPasswordForm: initialResetPasswordForm.set('loading', true)
            };
        case FORM_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordForm: initialResetPasswordForm.set('success', action.result)
            };
        case FORM_RESET_PASSWORD_FAIL:
            return {
                ...state,
                resetPasswordForm: initialResetPasswordForm.set('error', action.error)
            };
        case FORM_LOST_PASSWORD:
            return {
                ...state,
                lostPasswordForm: initialLostPasswordForm.set('loading', true)
            };
        case FORM_LOST_PASSWORD_SUCCESS:
            return {
                ...state,
                lostPasswordForm: initialLostPasswordForm.set('success', action.result)
            };
        case FORM_LOST_PASSWORD_FAIL:
            return {
                ...state,
                lostPasswordForm: initialLostPasswordForm.set('error', action.error)
            };
        default:
            return state;
    }
}
