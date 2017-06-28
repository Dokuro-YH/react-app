import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

class LoginForm extends Component {
  static defaultProps = {
    loginPending: false,
  }
  static propTypes = {
    loginPending: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
    }).isRequired,
  }
  handlerSubmit = () => {
    const { onSubmit } = this.props;
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) return;
      onSubmit(values);
    });
  }
  render() {
    const { loginPending } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form
          onSubmit={this.handlerSubmit}
        >
          <FormItem>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [{
                required: true, message: '请输入用户名',
              }],
            })(
              <Input prefix={<Icon type="user" />} type="text" placeholder="请输入用户名/邮箱/手机号" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(
              <Input prefix={<Icon type="user" />} type="password" placeholder="请输入密码" />,
            )}
          </FormItem>
          <FormItem>
            <Button loading={loginPending} type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
