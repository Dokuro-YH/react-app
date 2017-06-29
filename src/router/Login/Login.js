import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/login-form';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    loginPending: PropTypes.bool.isRequired,
  }
  render() {
    const { onLogin, loginPending } = this.props;

    const formProps = {
      onSubmit: onLogin,
      loginPending,
    };

    return (
      <div id="login-container">
        <div className="login-header" />
        <div className="login-form">
          <LoginForm {...formProps} />
        </div>
      </div>
    );
  }
}
