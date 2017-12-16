import React, { Component } from 'react';
import Envelope from './envelope';
import { objectForEach } from '../utils';

class EnvelopeList extends Component {

  constructor(props) {
    super(props);
    this.envelopeClick = this.envelopeClick.bind(this);
    this.createEnvelopeClick = this.createEnvelopeClick.bind(this);
    this.amountEdit = this.amountEdit.bind(this);
    this.createAmountEdit = this.createAmountEdit.bind(this);
    this.saveEditAmount = this.saveEditAmount.bind(this);
    this.createSaveEditAmount = this.createSaveEditAmount.bind(this);
  }

  envelopeClick(envelopeId) {
    this.props.toggleEnvelopeEditability(envelopeId);
  }

  createEnvelopeClick(envelopeId) {
    return () => {
      this.envelopeClick(envelopeId);
    };
  }

  amountEdit(envelopeId, amount) {
    this.props.amountEdit(envelopeId, amount);
  }

  createAmountEdit(envelopeId) {
    return (amount) => {
      this.amountEdit(envelopeId, amount);
    }
  }

  saveEditAmount(envelopeId) {
    this.props.saveEditAmount(envelopeId, {
      ...this.props.envelopes[envelopeId],
      Amount: parseInt(this.props.editAmounts[envelopeId])
    });
  }

  createSaveEditAmount(envelopeId) {
    return () => {
      console.log("this got clicked!");
      this.saveEditAmount(envelopeId);
    }
  }

  render() {

    const envelopes = [];
    objectForEach(this.props.envelopes, (envelope) => {
      envelopes.push(
        <Envelope
          name={envelope.Name}
          amount={envelope.Amount}
          editAmount={this.props.editAmounts[envelope.Id]}
          isEditable={this.props.editableEnvelopes[envelope.Id]}
          envelopeClick={this.createEnvelopeClick(envelope.Id)}
          amountEdit={this.createAmountEdit(envelope.Id)}
          saveEditAmount={this.createSaveEditAmount(envelope.Id)}
          key={envelope.Id} />
      );
    });

    return (
      <div>
        {envelopes}
      </div>
    );
  }

}

export default EnvelopeList;

