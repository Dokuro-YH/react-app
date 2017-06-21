import { connect } from 'react-redux';
import App from '../components/App';

const AppContainer = connect(({ app }) => ({ app }))(App);

export default AppContainer;
