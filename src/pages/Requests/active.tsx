import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MDBDataTableV5 } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { getAllActivePSARequests } from '../../redux/modules/request';
import { getTwoDcpValues } from './commonFunc';
import { taskOrderFields } from '../PSA/sharepointsFields';

/*
 active requests page
*/
/**
 * Active requests page
 * @param {any} props
 * @return {JSX.Element}
 */
function ActiveRequests(props: any) {
	const dispatch = useDispatch();
	// state variable to keep track of all active requests
	const [rows, setRows] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const activeTaskOrders = useSelector(
		(state: any) => state.request_data.activePSA,
	);

	// columns to be rendered
	const columns = [
		{
			label: 'Task Order Category',
			field: 'task_order_category',
		},
		{
			label: 'Project Title',
			field: 'project_title',
		},
		{
			label: 'Revision Number',
			field: 'revision_no',
		},
		{
			label: 'Framework',
			field: 'framework',
		},

		{
			label: 'Created Date',
			field: 'createdAt',
		},
		{
			label: 'Updated Date',
			field: 'updatedAt',
		},
	];

	useEffect(() => {
		dispatch(setPageTitle('Active Requests'));
		dispatch(getAllActivePSARequests());
	}, [dispatch]);

	useEffect(() => {
		// fetch active requests from sharepoint.
		const rows = activeTaskOrders.map((row: any) => {
			const clickEvent = () => {
				props.history.push(`/requests/${row.customID}`);
			};
			// convert created At date to human readable format
			// console.log('row in active request ------- ', row);
			// NB: no createdAt field on row,
			// find a proper way to handle createdAt and updatedAt
			const createdAt = moment(row.Created).format('DD-MM-yyyy');
			const updatedAt = moment(row.Modified).format('DD-MM-yyyy');
			return { ...row, createdAt, updatedAt, clickEvent };
		});
		setRows(getTwoDcpValues(rows, taskOrderFields));
		setLoading(false);
	}, [activeTaskOrders]); /* eslint-disable-line */

	// show loader when data is not ready from sharepoint
	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					height: '80vh',
					width: '100vw',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<BeatLoader color='blue' size={20} />
			</div>
		);
	}

	return (
		<>
			{/* {console.log('rowwws ---- ', rows)} */}
			<Helmet title='Active Requests | TMS Platform' />
			<MDBDataTableV5
				hover
				entries={99999999999}
				data={{ columns, rows }}
			/>
		</>
	);
}

export default ActiveRequests;
