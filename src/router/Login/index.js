import { connect } from 'react-redux';
import Login from './Login';
import * as actions from '../../actions/login';
import './Login.less';

const mapStateToProps = ({
  login: {
    loginPending,
  },
}) => ({ loginPending });

const mapDispatchToProps = dispatch => ({
  onLogin: payload => dispatch(actions.login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
