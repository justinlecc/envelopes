import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { setAccounts, setEnvelopes } from '../actions';
import { objectForEach } from '../utils';
import EnvelopesPage from '../components/envelopes-page';


class EnvelopesPageContainer extends Component {

  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {

    let accountsDone = false;
    let envelopesDone = false;

    fetch('/api/v1/accounts').then((r) => {
      return r.json();
    }).then((accounts) => {
      store.dispatch(setAccounts(accounts));
      accountsDone = true;
      console.log('Faked connection latency! Please, take a look ---> `server/api.go:22`');
      if (accountsDone && envelopesDone) callback();
    });

    fetch('/api/v1/envelopes').then((r) => {
      return r.json();
    }).then((envelopes) => {
      store.dispatch(setEnvelopes(envelopes));
      console.log('Faked connection latency! Please, take a look ---> `server/api.go:22`');
      envelopesDone = true;
      if (accountsDone && envelopesDone) callback();
    });

    function responseToJson(r) {
      return r.json();
    }

  }
  /*eslint-enable */

  render() {
    return (
      <div>
        <Helmet title='Envelopes Page' />
        <EnvelopesPage />
      </div>
    );
  }

}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
  
  let combinedAccountAmounts = 0;
  objectForEach(state.accounts.accounts, function (account) {
    combinedAccountAmounts += account.Amount;
  });

  let floatAmount = combinedAccountAmounts;
  objectForEach(state.envelopes.envelopes, function (envelope) {
    floatAmount -= envelope.Amount;
  });
  
  return {
    accounts: state.accounts.accounts,
    envelopes: state.envelopes.envelopes,
    floatAmount
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnvelopesPageContainer);
