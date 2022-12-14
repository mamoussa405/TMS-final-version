import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

// css files
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import App from './App';
import store from './redux';


ReactDOM.render(
	// redux store configuration
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>,
	document.getElementById('root'),
);
