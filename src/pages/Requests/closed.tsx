import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { BeatLoader } from 'react-spinners';
import { getAllClosedPSARequests } from '../../redux/modules/request';
import { getTwoDcpValues } from './commonFunc';
import { taskOrderFields } from '../PSA/sharepointsFields';

/**
 * closed requests page
 */
/**
 * Closed requests page
 * @param {any} props
 * @return {JSX.Element}
 */
function ClosedRequests(props: any) {
	const dispatch = useDispatch();
	// state variable to keep track of all closed requests
	const [rows, setRows] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const closedTaskOrders = useSelector(
		(state: any) => state.request_data.closePSA,
	);
	// columns to be displayed
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
		dispatch(setPageTitle('Closed Requests'));
		// fetch closed requests from the sharepoint
		dispatch(getAllClosedPSARequests());
	}, [dispatch]);

	useEffect(() => {
		setLoading(true);
		const rows = closedTaskOrders.map((row: any) => {
			const clickEvent = () => {
				props.history.push(`/requests/${row.customID}`);
			};
			// convert created At date to human readable format
			// NB: no createdAt field on row,
			// find a proper way to handle createdAt and updatedAt
			const createdAt = moment(row.Created).format('DD-MM-yyyy');
			const updatedAt = moment(row.Modified).format('DD-MM-yyyy');
			return { ...row, createdAt, updatedAt, clickEvent };
		});

		console.log('rows: ', rows);
		// get a new array with the number converted to two decimal places
		setRows(getTwoDcpValues(rows, taskOrderFields));
		setLoading(false);
	}, [closedTaskOrders]); /* eslint-disable-line */

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
			<Helmet title='Closed Requests | TMS Platform' />
			<MDBDataTableV5
				hover
				entries={99999999999}
				data={{ columns, rows }}
			/>
		</>
	);
}

export default ClosedRequests;
