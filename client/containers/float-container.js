import React, { Component } from 'react';
import { connect } from 'react-redux';
import Float from '../components/float';
import { objectForEach } from '../utils';

class FloatContainer extends Component {

  render() {
    return (
      <Float amount={this.props.amount}/>
    );
  }

}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  
  let combinedAccountAmounts = 0;
  objectForEach(state.accounts.accounts, function (account) {
    combinedAccountAmounts += account.Amount;
  });

  let amount = combinedAccountAmounts;
  objectForEach(state.envelopes.envelopes, function (envelope) {
    amount -= envelope.Amount;
  });
  
  return {
    amount
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FloatContainer);

