/**
 * action types
 */

export const SET_CONFIG = 'SET_CONFIG';

export const SET_ACCOUNTS = 'SET_ACCOUNTS';

export const SET_ENVELOPES = 'SET_ENVELOPES';

export const TOGGLE_ENVELOPE_EDITABILITY = 'TOGGLE_ENVELOPE_EDITABILITY';

export const ENVELOPE_AMOUNT_EDIT = 'ENVELOPE_AMOUNT_EDIT';

export const SAVE_ENVELOPE_IN_PROGRESS = 'SAVE_ENVELOPE_IN_PROGRESS';

export const SAVE_ENVELOPE_SUCCEEDED = 'SAVE_ENVELOPE_SUCCEEDED';

/**
 * action creators
 */

export function setConfig(config) {
  return { type: SET_CONFIG, config };
}

export function setAccounts(accounts) {
  return { type: SET_ACCOUNTS, payload: accounts };
}

export function setEnvelopes(envelopes) {
  return { type: SET_ENVELOPES, payload: envelopes };
}

export function toggleEnvelopeEditability(envelopeId) {
    return { type: TOGGLE_ENVELOPE_EDITABILITY, payload: {envelopeId} };
}

export function envelopeAmountEdit(envelopeId, amount) {
    return { type: ENVELOPE_AMOUNT_EDIT, payload: {envelopeId, amount} };
}

export function saveEnvelopeInProgress(envelopeId) {
    return { type: SAVE_ENVELOPE_IN_PROGRESS, payload: {envelopeId} };
}

export function saveEnvelopeSucceeded(envelopeId, data) {
    return { type: SAVE_ENVELOPE_SUCCEEDED, payload: {envelopeId, data} };
}

export function saveEnvelope(envelopeId, data) {
    return (dispatch) => {
        dispatch(saveEnvelopeInProgress(envelopeId));
        return fetch('/api/v1/envelope', {
            method: 'PUT',
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }, (error) => {
            // TODO: dispatch an error handling action
            console.log("ERROR: saving the envelope edit amount failed", error);
        }).then((json) => {
            dispatch(saveEnvelopeSucceeded(envelopeId, data));
        });

    };
}