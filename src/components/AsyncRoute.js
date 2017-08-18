import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AsyncComponent from './AsyncComponent';

const AsyncRoute = ({ load, loading, ...others }) => (
  <Route
    {...others}
    render={props => (<AsyncComponent
      load={load}
      loading={loading}
      {...props}
    />)}
  />
);

AsyncRoute.propTypes = {
  loading: PropTypes.func,
  load: PropTypes.func.isRequired,
};

export default AsyncRoute;
