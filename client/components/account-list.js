import React, { Component } from 'react';
import Account from './account';
import { objectForEach } from '../utils';


class AccountList extends Component {

  render() {

    const accounts = [];
    objectForEach(this.props.accounts, (account) => {
      accounts.push(
        <Account 
          name={account.Name}
          amount={account.Amount}
          key={account.Id} />
      );
    });

    return (
      <div>
        {accounts}
      </div>
    );
  }
}

export default AccountList;
