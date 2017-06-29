import React from 'react';
import { mount } from 'enzyme';
import LoginForm from './login-form';

describe('LoginForm', () => {
  it('should submit success', () => {
    let callOnce = false;
    const onSubmit = (user) => {
      callOnce = true;
      expect(user).toEqual({ username: 'user', password: 'pwd' });
    };

    const component = mount(<LoginForm loginPending onSubmit={onSubmit} />);

    expect(component.props().loginPending).toBe(true);

    expect(component.find('input[type="text"]').length).toBe(1);
    component.find('input[type="text"]').simulate('change', { target: { value: 'user' } });

    expect(component.find('input[type="password"]').length).toBe(1);
    component.find('input[type="password"]').simulate('change', { target: { value: 'pwd' } });

    expect(component.find('form').length).toBe(1);
    component.find('form').simulate('submit');

    expect(callOnce).toEqual(true);
  });


  it('should username/password required', () => {
    let callOnce = false;
    const onSubmit = (user) => {
      callOnce = true;
      expect(user).toEqual({ username: 'user', password: 'pwd' });
    };
    const component = mount(<LoginForm loginPending onSubmit={onSubmit} />);

    const form = component.find('form');

    form.simulate('submit');

    const errorControls = form.find('.ant-form-item-control.has-error');
    expect(errorControls.length).toEqual(2);

    expect(errorControls.at(0).find('.ant-form-explain').text()).toEqual('请输入用户名');
    expect(errorControls.at(1).find('.ant-form-explain').text()).toEqual('请输入密码');

    expect(callOnce).toEqual(false);
  });
});
