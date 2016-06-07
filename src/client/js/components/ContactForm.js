import React, {Component} from 'react';
import Look, { StyleSheet } from 'react-look';
import {reduxForm} from 'redux-form';
import DocumentTitle from 'react-document-title';

import Actions from '../actions';
import contactForm from '../../css/ContactForm.css';
import {contactFormSetup, nextRoute} from '../forms/contactForm';


class ContactForm extends Component {

    createField(type, fieldName, fieldData, name) {
        return (
            <div key={fieldName} look={styles.formField}>
                <label look={styles.formLabel} htmlFor={fieldName}>{name}</label>
                <input look={styles.formInput} id={fieldName} type={type} placeholder={name} {...fieldData} />
                {fieldData.touched && fieldData.error && <div look={styles.errorField}>{fieldData.error}</div>}
                <br/>
            </div>
        )
    }

    render() {
        const {
            fields: {
                name, email, body, phone_number, qr_code
                },
            handleSubmit,
            loading,
            error,
            apiError,
            success
            } = this.props;

        return (
            <div look={styles.formContainer}>
                {!success &&
                    [
                        this.createField('text', 'name', name, 'Naam'),
                        this.createField('text', 'email', email, 'E-mailadres'),
                        this.createField('text', 'qr_code', qr_code, 'Stadjerspasnummer'),
                        this.createField('text', 'phone_number', phone_number, 'Telefoonnummer'),
                        this.createField('text', 'body', body, 'Bericht')
                    ]
                }

                {error && <p look={styles.errorField}>{error}</p>}
                {apiError && <p look={styles.errorField}>{apiError}</p>}
                {!success && !loading && <button key={'contact1'} look={styles.submitBtn} onClick={handleSubmit}> Versturen </button>}
                {success && <p look={styles.successMessage}><i look={styles.iconPass} className="fa fa-check"></i> Bedankt voor het invullen van het contactformulier. Er wordt zo spoedig mogelijk contact met u opgenomen.</p>}
            </div>
        );
    }
}

const styles = StyleSheet.create(ContactForm, contactForm);


export default reduxForm(
    contactFormSetup,
    function (state) {
        return {
            initialValues: {
                email: (state.auth.user || {}).email,
                qr_code: (state.auth.user || {}).qrCode
            },
            success: state.forms.contactForm.get('success'),
            loading: state.forms.contactForm.get('loading'),
            apiError: state.forms.contactForm.get('error')
        }
    }
)(Look(ContactForm));

