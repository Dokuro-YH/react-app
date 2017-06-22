import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('App render msg', () => {
  const component = shallow(<App app={{ msg: 'hello' }} />);

  expect(component.find('h2').text()).toBe('hello');
});
