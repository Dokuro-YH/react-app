import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class AsyncComponent extends Component {
  static defaultProps = {
    loading: (<div key="loading">Loading...</div>),
  }
  static propTypes = {
    load: PropTypes.func.isRequired,
    loading: PropTypes.element,
  }
  state = { Comp: null }

  componentWillMount() {
    if (!this.state.Comp) {
      this.props.load()
        .then(Comp => this.setState({ Comp: Comp.default || Comp }));
    }
  }

  render() {
    const { Comp } = this.state;

    return (Comp ? <Comp {...this.props} /> : this.props.loading);
  }

}

export default withRouter(AsyncComponent);
