import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';
import './style';

export default class Login extends Component {
  static propTypes = {
    isLoginPending: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
  }
  render() {
    const { isLoginPending, login } = this.props;

    const formProps = {
      loading: isLoginPending,
      onSubmit: login,
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
