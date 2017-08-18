import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const Team = ({ match }) => (
  <div>
    <h3>selected team: {match.params.teamId}</h3>
  </div>
);

Team.propTypes = {
  match: PropTypes.object.isRequired,
};

class Teams extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }
  render() {
    const match = this.props.match;
    return (
      <div className="content-inner">
        <h1>Component: Teams</h1>
        <ul>
          <li>
            <Link to={`${match.url}/1`}>Team 1</Link>
          </li>
          <li>
            <Link to={`${match.url}/2`}>Team 2</Link>
          </li>
        </ul>
        <Route
          path={`${match.url}/:teamId`}
          component={Team}
        />
        <Route
          exact
          path={match.url}
          render={() => (
            <h3>Please select a team.</h3>
          )}
        />
      </div>
    );
  }
}

export default Teams;
