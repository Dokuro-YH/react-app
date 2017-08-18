import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon } from 'antd';

import TriangleCanvas from '../components/TriangleCanvas';
import { appActions } from '../actions/app';

class LoginLayout extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLoginPending: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
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
    const { isLoggedIn, loading, isLoginPending } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (loading) {
      return <div>加载中...</div>;
    }

    if (isLoggedIn) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <TriangleCanvas />
        <div className="login-wrapper">
          <Form className="login-form" onSubmit={this.handlerSubmit} >
            <div className="login-head">
              <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" alt="LOGO" />
            </div>
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: '',
                rules: [{
                  required: true, message: '请输入用户名',
                }],
              })(
                <Input autoFocus prefix={<Icon type="user" />} type="text" placeholder="请输入用户名/邮箱/手机号" />,
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
              <Button className="full-width" loading={isLoginPending} type="primary" htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.app;

const mapDispatchToProps = dispatch => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginLayout));
