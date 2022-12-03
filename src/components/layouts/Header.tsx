import {
	MDBDropdown, // OK
	MDBDropdownItem, // OK
	MDBDropdownMenu, // OK
	MDBDropdownToggle, // OK
	MDBIcon, // OK
	MDBNavbar, // OK
	MDBNavbarBrand,
	MDBNavbarNav,
} from 'mdbreact';
import React from 'react'; // OK
import { useSelector } from 'react-redux';
// import $SP from 'sharepointplus';
import Avatar from '@material-ui/core/Avatar'; // OK
import { RootState } from '../../redux/root';
import { taskOrderFields } from '../../pages/PSA/sharepointsFields'; // OK
import { BeatLoader } from 'react-spinners'; // OK
import useFetchListItems from '../../hooks/useFetchListItems';
// import useFetchUsers from '../pages/PSA/hooks/useFetchUser';

/**
 * @interface
 * @property {function} toggleSideNav open or close the side nav bar
 * @property {boolean} toggle tells us if the side nav bar is closed or opened
 * @property {string} className the CSS class name
 */
interface Props {
	toggleSideNav: () => void;
	toggle?: boolean;
	className?: string;
}

/**
 * Returns the Header component wich contains a nav bar
 * @param {Props} object with this shape { toggleSideNav, toggle, className}
 * @return {JSX.Element}
 */
const Header: React.FC<Props> = ({
	toggleSideNav,
	toggle,
	className,
}: Props): JSX.Element => {
	// const [user, setUser] = React.useState();
	const { title } = useSelector((state: RootState) => state.page);
	// const [users] = useFetchUsers(window.location.href.toString());
	/* eslint-disable-next-line */
	const [isTaskOrderLoading, taskorders] = useFetchListItems(
		'Dataflow',
		taskOrderFields,
	); // KO
	// const sp = $SP();

	// React.useEffect(() => {
	// todo: add the url of the website from sharepoint
	// const fetchUser = async () => {
	// await sp.getUserInfo(
	// 'i:0#.w|domain\\login',
	// { url: window.location.href },
	// function (info: any) {
	// console.log('user info --- ', info);
	// setUser(info);
	// },
	// );
	// };
	// fetchUser();
	// }, [sp]);

	if (isTaskOrderLoading) return <BeatLoader size={8} color='#00FF' />;

	// console.log('task orders from dataflow in header --- ', taskorders);

	return (
		<MDBNavbar
			className='flexible-MDBNavbar'
			light
			expand='md'
			scrolling
			fixed='top'
			style={{ zIndex: 11 }}>
			<div
				onClick={toggleSideNav}
				key='sideNavToggleA'
				style={{
					lineHeight: '32px',
					marginLeft: '1em',
					verticalAlign: 'middle',
					cursor: 'pointer',
				}}>
				<MDBIcon icon='bars' color='white' size='lg' />
			</div>
			<MDBNavbarBrand
				style={{
					paddingLeft: toggle ? '16px' : '240px',
					transition: 'padding-left .3s',
				}}>
				<strong>{title}</strong>
			</MDBNavbarBrand>
			{/* //!the flexDirection has no effect because we have one element */}
			<MDBNavbarNav expend='sm' right style={{ flexDirection: 'row' }}>
				<MDBDropdown>
					<MDBDropdownToggle nav caret>
						<MDBIcon icon='user' />{' '}
						<span className='d-none d-md-inline'>Profile</span>
					</MDBDropdownToggle>
					<MDBDropdownMenu right style={{ minWidth: '200px' }}>
						<MDBDropdownItem
							style={{ display: 'flex', alignItems: 'center' }}>
							<Avatar
								alt='someone'
								src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
							/>
							{/* TODO: use the user's name here */}
							<span className='ml-2'>My Account</span>
						</MDBDropdownItem>
					</MDBDropdownMenu>
				</MDBDropdown>
			</MDBNavbarNav>
		</MDBNavbar>
	);
};

export default Header;
