import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/login-form';
import './LoginLayout.less';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    isLoginPending: PropTypes.bool.isRequired,
  }
  render() {
    const { onLogin, isLoginPending } = this.props;

    const formProps = {
      onSubmit: onLogin,
      loading: isLoginPending,
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
