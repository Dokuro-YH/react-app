import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';

const AsyncRoute = ({ load, ...others }) => (
  <Route {...others} render={props => <AsyncComponent load={load} {...props} />} />
);

AsyncRoute.propTypes = {
  load: PropTypes.func.isRequired,
};

export default AsyncRoute;
