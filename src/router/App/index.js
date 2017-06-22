import { connect } from 'react-redux';
import App from './App';
import './App.less';

const AppContainer = connect(({ app }) => ({ app }))(App);

export default AppContainer;
