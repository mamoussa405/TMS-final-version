import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // OK
import { HelmetProvider } from 'react-helmet-async'; // OK
import { ToastContainer } from 'react-toastify'; // OK
import { createTheme, ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from './layouts/MainLayout';

const theme = createTheme({
	typography: {
		fontFamily:
			"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
		h6: {
			fontFamily:
				"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
			color: '#00001a',
			marginBottom: '3px',
			fontWeight: '500 !important',
			fontSize: '1.20rem',
		},
		h5: {
			fontFamily:
				"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
			color: '#00001a',
			marginBottom: '3px',
			fontWeight: 'bolder',
			fontSize: '1.8rem',
		},
		subtitle1: {
			fontFamily:
				"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
			color: '#00001a',
			fontWeight: 'bolder',
			fontSize: '1rem',
		},
	},
	palette: {
		primary: {
			main: '#0A66C2',
		},
		success: {
			main: '#00e676',
		},
		error: {
			main: '#d50000',
		},
	},
});

/**
 * @return {JSX.Element}
 */
function App(): JSX.Element {
	return (
		/**
		 * ?HashRouter:
		 * It appends the '#' to the website link we use it instead
		 * of @BrowserRouter to indicate to the browser that we are loading
		 * the html in one page (single page) therefor it won't make requests
		 * to the server to load the html based on the route path.
		 *
		 * ?HelmetProvider:
		 * Is an async version of @Helmet wich is a tool that
		 * helps us track down our head information and metadata to improve the
		 * app @SEO , the async version of it helps us store the head info in
		 * a new instance whenever a new render happens.
		 *
		 * ?ToastContainer:
		 * Allows us to add notifications to our app with ease.
		 */
		<ThemeProvider theme={theme}>
			<Router>
				{/* <HelmetProvider>{renderRoutes(routes)}</HelmetProvider> */}
				<HelmetProvider>
					<Routes>
						<Route path='/*' element={<MainLayout />} />
					</Routes>
				</HelmetProvider>
				<ToastContainer />
			</Router>
		</ThemeProvider>
	);
}

export default App;
