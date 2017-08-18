import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dissoc } from 'ramda';

class AsyncComponent extends Component {
  static defaultProps = {
    loading: () => <div key="loading">Loading...</div>,
  }
  static propTypes = {
    load: PropTypes.func.isRequired,
    loading: PropTypes.func,
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
    const Loading = this.props.loading;
    const rest = dissoc(['load', 'loading'])(this.props);

    return (Comp ? <Comp {...rest} /> : <Loading />);
  }

}

export default AsyncComponent;
