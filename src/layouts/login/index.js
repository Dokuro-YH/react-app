import { connect } from 'react-redux';
import Login from './Login';

const mapStateToProps = ({
  app: {
    isLoginPending,
  },
}) => ({ isLoginPending });

export default connect(mapStateToProps)(Login);
