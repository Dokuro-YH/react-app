import { connect } from 'react-redux';
import App from './App';
import './App.less';

export default connect(({ app }) => ({ app }))(App);
