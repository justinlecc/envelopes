import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {

  render() {
    return <div>
      <Helmet title='Go + React + Redux = rocks!'>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      {this.props.children}
    </div>;
  }

}
