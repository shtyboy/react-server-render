import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './app.less';

import * as appActions from '../../actions/app';

class Index extends Component {
  constructor (props) {
    super (props);
    this.state = {
    };
  }
  componentWillMount() {
    this.props.dispatch(appActions.appInit('The page is '));
  }
  render() {
    return (
      <div className="appIndex">
        <h1 className="title">{this.props.app.title} : appIndex</h1>
      </div>
    );
  }
}

const mapStateToProps = ({
  app
}) => ({
  app
});

export default connect(mapStateToProps)(Index);
