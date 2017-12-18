import { combineReducers } from 'redux';
import {
  SET_CONFIG,
  SET_ACCOUNTS,
  SET_ENVELOPES,
  TOGGLE_ENVELOPE_EDITABILITY,
  ENVELOPE_AMOUNT_EDIT,
  SAVE_ENVELOPE_IN_PROGRESS,
  SAVE_ENVELOPE_SUCCEEDED
} from './actions';

function config(state = {}, action) {
  switch (action.type) {
  case SET_CONFIG:
    return action.config;
  default:
    return state;
  }
}

function accounts(state = {}, action) {
  switch(action.type) {
  case SET_ACCOUNTS:
    return {
      ...state,
      accounts: action.payload
    };
  default:
    return state;
  }
}

const defaultEnvelopesState = {
  editableEnvelopes: {},
  editAmounts: {}
};

function handleSetEnvelopes(state, action) {
  return {
    ...state,
    envelopes: action.payload
  };
}

function handleToggleEnvelopeEditability(state, action) {
  const envelopeId = action.payload.envelopeId;
  const isEditable = state.editableEnvelopes[envelopeId] ? false : true;
  const newEditableEnvelopes = {
    ...state.editableEnvelopes,
    [envelopeId]: isEditable
  };
  return {
    ...state,
    editableEnvelopes: newEditableEnvelopes
  };
}

function handleEnvelopeAmountEdit(state, action) {
  const envelopeId = action.payload.envelopeId;
  const newEditAmounts = {
    ...state.editAmounts,
    [envelopeId]: action.payload.amount
  }
  return {
    ...state,
    editAmounts: newEditAmounts
  }
}

function handleSaveEnvelopeInProgress(state, action) {
  console.log("in handleSaveEnvelopeInProgress", action);
  return state;
}

function handleSaveEnvelopeSucceeded(state, action) {

  const envelopeId = action.payload.data.Id;

  const newEnvelopes = {
    ...state.envelopes,
    [envelopeId]: action.payload.data 
  };

  const newEditableEnvelopes = {
    ...state.editableEnvelopes,
    [envelopeId]: false
  };

  return {
    ...state,
    envelopes: newEnvelopes,
    editableEnvelopes: newEditableEnvelopes
  };
}

function envelopes(state = defaultEnvelopesState, action) {

  switch(action.type) {
  case SET_ENVELOPES:
    
    return handleSetEnvelopes(state, action);

  case TOGGLE_ENVELOPE_EDITABILITY:

    return handleToggleEnvelopeEditability(state, action);

  case ENVELOPE_AMOUNT_EDIT:

    return handleEnvelopeAmountEdit(state, action);

  case SAVE_ENVELOPE_IN_PROGRESS:

    return handleSaveEnvelopeInProgress(state, action);

  case SAVE_ENVELOPE_SUCCEEDED:

    return handleSaveEnvelopeSucceeded(state, action);
    
  default:
    return state;
  }
}

export default combineReducers({config, accounts, envelopes});
