import React, { Component } from 'react';
import { formatDollars } from '../utils';

class Float extends Component {
  render() {
    return (
      <div>Left-Overs: {formatDollars(this.props.amount)}</div>
    );
  }
}

export default Float;