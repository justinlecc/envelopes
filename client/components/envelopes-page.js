import React, { Component } from 'react';
import AccountListContainer from '../containers/account-list-container';
import EnvelopeListContainer from '../containers/envelope-list-container';
import FloatContainer from '../containers/float-container';

class EnvelopesPage extends Component {


  render() {

    return (
      <div>
        <AccountListContainer />
        <FloatContainer />
        <EnvelopeListContainer />
      </div>
    );
  }

}

export default EnvelopesPage;
