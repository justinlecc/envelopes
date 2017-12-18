import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountList from '../components/account-list';

class AccountListContainer extends Component {

  render() {
    return (
      <AccountList accounts={this.props.accounts} />
    );
  }

}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  
  // let combinedAccountAmounts = 0;
  // objectForEach(state.accounts.accounts, function (account) {
  //   combinedAccountAmounts += account.Amount;
  // });

  // let floatAmount = combinedAccountAmounts;
  // objectForEach(state.envelopes.envelopes, function (envelope) {
  //     floatAmount -= envelope.Amount;
  // });
  
  return {
    accounts: state.accounts.accounts
    // envelopes: state.envelopes.envelopes,
    // floatAmount
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountListContainer);
