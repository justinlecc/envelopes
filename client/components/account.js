import React, { Component } from 'react';
import { formatDollars } from '../utils';

class Account extends Component {
  render() {
    return <div>
            <span>{this.props.name}</span>
            <span>: </span>
            <span>{formatDollars(this.props.amount)}</span>
          </div>;
  }
}

export default Account;
