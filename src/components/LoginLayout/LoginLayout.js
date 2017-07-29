import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, message } from 'antd';
import './style';

class Login extends Component {
  static propTypes = {
    isLoginPending: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    loginErrmsg: PropTypes.string,
    hideLoginError: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  }

  componentDidUpdate(prevProps) {
    const prevLoginErrmsg = prevProps.loginErrmsg;
    const loginErrmsg = this.props.loginErrmsg;

    if (loginErrmsg && loginErrmsg !== prevLoginErrmsg) {
      message.error(loginErrmsg, 3, this.props.hideLoginError);
    }
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { login } = this.props;
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) return;
      login(values);
    });
  }

  render() {
    const { isLoginPending } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="login-container">
        <div className="login-wrap">
          <div className="login-header">
            <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" alt="LOGO" />
          </div>

          <Form className="login-form" onSubmit={this.handlerSubmit} >
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{
                  required: true, message: '请输入用户名',
                }],
              })(
                <Input prefix={<Icon type="user" />} type="text" placeholder="请输入用户名/邮箱/手机号" />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码',
                }],
              })(
                <Input prefix={<Icon type="user" />} type="password" placeholder="请输入密码" />,
              )}
            </Form.Item>
            <Form.Item>
              <Button loading={isLoginPending} type="primary" htmlType="submit" className="login-btn">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
