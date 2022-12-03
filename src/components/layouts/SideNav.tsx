import React from 'react'; // OK
import {
	MDBIcon, // OK
	MDBSideNav, // OK
	MDBSideNavCat, // OK
	MDBSideNavNav, // OK
	MDBSideNavLinkV5, // OK
	MDBBadge, // OK
} from 'mdbreact'; // OK
import logo from '../../assets/JESA-Logo.jpg'; // OK
import bgnav from '../../assets/sidenav4.jpg'; // OK
import { BeatLoader } from 'react-spinners'; // OK
import { taskOrderFields } from '../../pages/PSA/sharepointsFields'; // OK
import { Link } from 'react-router-dom';
import useFetchListItems from '../../hooks/useFetchListItems';

interface Props {
	triggerOpening: boolean;
	onLinkClick: () => void;
	breakWidth?: number;
	style?: React.CSSProperties;
}

// Sidenav component
const SideNav: React.FC<Props> = ({
	triggerOpening,
	onLinkClick,
	breakWidth,
}) => {
	const Nav = MDBSideNav as any; // OK
	const [isTaskOrderLoading, taskorders] = useFetchListItems(
		'Dataflow',
		taskOrderFields,
	); // KO

	/**
	 * Renders links
	 * @param {string} to the link's route
	 * @exemple /dashboard
	 * @param {string} text the text that will be displayed
	 * @example Dashboard
	 * @return {JSX.Element} react Link component
	 */
	const rSNL = (to: string, text: string): JSX.Element => {
		return (
			<Link to={to} onClick={onLinkClick}>
				{text}
			</Link>
		);
	}; // OK

	if (isTaskOrderLoading) return <BeatLoader size={10} color='#00ff' />;

	// console.log('task orders from dataflow in sidenav --- ', taskorders);

	return (
		<div className='white-skin'>
			<Nav
				logo={logo}
				fixed
				triggerOpening={triggerOpening}
				className='white'
				breakWidth={breakWidth}
				bg={bgnav}>
				<MDBSideNavNav>
					<Link to='/dashboard' style={{ padding: 0 }}>
						<MDBSideNavLinkV5 topLevel onClick={onLinkClick}>
							<MDBIcon icon='chart-line mr-2' />
							Dashboard
						</MDBSideNavLinkV5>
					</Link>
					<Link to='/psa/my-requests' style={{ padding: 0 }}>
						<MDBSideNavLinkV5 topLevel onClick={onLinkClick}>
							<MDBIcon icon='inbox mr-2' />
							Inbox
							<MDBBadge color='danger' className='ml-2'>
								{taskorders.length ? taskorders.length : 0}
							</MDBBadge>
						</MDBSideNavLinkV5>
					</Link>
					<MDBSideNavCat
						name='New Request'
						id='dashboard-cat'
						icon='plus mr-2'>
						{rSNL('/psa/new', 'PSA Request')}
						{rSNL('/fsa/new', 'FSA Request')}
					</MDBSideNavCat>
					<MDBSideNavCat
						name='Requests'
						id='dashboard-cat'
						icon='list mr-2'>
						{rSNL('/active-requests', 'Active requests')}
						{rSNL('/closed-requests', 'Closed requests')}
					</MDBSideNavCat>
					<MDBSideNavCat
						name='Settings'
						id='dashboard-cat'
						icon='cogs mr-2'>
						{rSNL('/office-table', 'Office table')}
						{rSNL('/projects', 'Projects')}
						{rSNL('/suffixes', 'Suffixes')}
						{rSNL('/multipliers', 'Multipliers')}
					</MDBSideNavCat>
				</MDBSideNavNav>
			</Nav>
		</div>
	);
};

export default SideNav;
