import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import SideNav from '../components/layouts/SideNav';
import Home from '../pages/Home';
import NewPSA from '../pages/PSA/new';
import ActiveRequests from '../pages/Requests/active';
import ClosedRequests from '../pages/Requests/closed';
import SingleRequest from '../pages/Requests/single';
import UpdatePSA from '../pages/PSA/update';
import MyRequests from '../pages/Requests/my-requests';
import MySingleRequest from '../pages/Requests/my-single-request';
import { TOParameters } from '../pages/settings';
import NewFSA from '../pages/FSA/newFSA';
import useFetchUser from '../hooks/useFetchUser';
import MyCircularProgress from '../components/ui/MyCircularProgress';

// Main wrapping layout component for application
const MainLayout = (): JSX.Element => {
	// this is the window width (in px) in which the sideNav will be hidden.
	const BREAK_WIDTH = 1300;
	/**
	 * This boolean state is for tracking whether sideNav is open or not
	 * after the window width is less than or equal the breakWidth (1300 px).
	 */
	const [sideNavToggled, setSideNavToggled] = useState(false);
	/**
	 * A state variable to track the application's
	 * inner width (the current window width).
	 */
	const [windowWidth, setWindowWidth] = useState(0);

	/**
	 * Here we fetch the user info that we will use in the intire app,
	 * the info can be expended, we will pass it as a props to all
	 * component where we need the user info.
	 */
	const [curUserInfo, userLoading] = useFetchUser([
		'PreferredName',
		'FirstName',
		'LastName',
	]);

	/**
	 * Tracks and updates the current window width
	 */
	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	/**
	 * This use effect hook will run when the current component {MainLayout}
	 * is mounted, it runs width a 'resize' event listner to update
	 * the current window width.
	 */
	useEffect(() => {
		/**
		 * this call to handleResize is to update the windowWidth
		 * on first component mounte to let the dynamicLeftPadding
		 * work properly
		 */
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	/**
	 * Toggles the sideNav depending on the current window width if it's lesser
	 * or equal then the breakWidth (1300) it switches the sideNavToggled to true
	 * means the sideNav is closed.
	 */
	const toggleSideNav = () => {
		if (windowWidth < BREAK_WIDTH) {
			setSideNavToggled(!sideNavToggled);
		}
	};

	/**
	 * Applies a 240px left padding to the main body if the sideNav is open
	 */
	const dynamicLeftPadding = {
		paddingLeft: windowWidth > BREAK_WIDTH ? '240px' : '0',
	};
	if (userLoading) {
		return <MyCircularProgress color='primary'/>;
	}
	return (
		<div className='app'>
			<SideNav
				breakWidth={BREAK_WIDTH}
				style={{ transition: 'all .3s' }}
				triggerOpening={sideNavToggled}
				onLinkClick={toggleSideNav}
			/>
			<div className='flexible-content white-skin'>
				<Header
					toggle={windowWidth < BREAK_WIDTH}
					className='white-skin'
					toggleSideNav={toggleSideNav}
				/>
				<main style={{ ...dynamicLeftPadding, margin: '6rem 3% 6rem' }}>
					<Routes>
						<Route
							path='/'
							element={<Navigate to='/dashboard' replace />}
						/>
						<Route path='/dashboard' element={<Home />} />
						<Route path='/psa/new' element={<NewPSA />} />
						<Route path='/fsa/new' element={
							<NewFSA curUserInfo={curUserInfo} key={1}/>
						} />
						<Route path='/fsa/new/:id' element={
							<NewFSA curUserInfo={curUserInfo} key={2} />
						} />
						<Route
							path='/active-requests'
							element={<ActiveRequests />}
						/>
						<Route
							path='/closed-requests'
							element={<ClosedRequests />}
						/>
						<Route
							path='/requests/:id'
							element={<SingleRequest />}
						/>
						<Route
							path='/requests/:id/edit'
							element={<UpdatePSA />}
						/>
						<Route
							path='/psa/my-requests'
							element={<MyRequests curUserInfo={curUserInfo}/>}
						/>
						<Route
							path='/psa/my-requests/:id'
							element={<MySingleRequest />}
						/>
						<Route
							path='/settings/to-parameters/:type'
							element={<TOParameters />}
						/>
					</Routes>
				</main>
				<Footer
					style={{
						...dynamicLeftPadding,
						position: 'fixed',
						width: '100%',
					}}
					className='d-lg-block indigo darken-2'
				/>
			</div>
		</div>
	);
};

export default MainLayout;
