import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnvelopesList from '../components/envelope-list';
import {
  toggleEnvelopeEditability,
  envelopeAmountEdit,
  saveEnvelope
} from '../actions';

class EnvelopesListContainer extends Component {

  render() {
    return (
      <EnvelopesList 
        envelopes={this.props.envelopes}
        editableEnvelopes={this.props.editableEnvelopes}
        toggleEnvelopeEditability={this.props.toggleEnvelopeEditability}
        editAmounts={this.props.editAmounts}
        amountEdit={this.props.envelopeAmountEdit}
        saveEditAmount={this.props.saveEnvelope} />
    );
  }

}

const mapDispatchToProps = {
  toggleEnvelopeEditability,
  envelopeAmountEdit,
  saveEnvelope
};

const mapStateToProps = (state) => {  
  return {
    envelopes: state.envelopes.envelopes,
    editableEnvelopes: state.envelopes.editableEnvelopes,
    editAmounts: state.envelopes.editAmounts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnvelopesListContainer);
