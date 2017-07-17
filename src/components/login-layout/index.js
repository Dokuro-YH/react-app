import { connect } from 'react-redux';
import Login from './LoginLayout';

const mapStateToProps = ({
  app: {
    isLoginPending,
  },
}) => ({ isLoginPending });

export default connect(mapStateToProps)(Login);
