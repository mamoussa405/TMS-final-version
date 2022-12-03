/* eslint-disable */
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
import MaterialTable from '@material-table/core';
import IconButton from '@mui/material/IconButton';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { getAllPSARequests } from '../../redux/modules/request';
import { taskOrderFields } from '../PSA/sharepointsFields';
import { getTwoDcpValues } from './commonFunc';
import useFetchFSAListItems from '../../hooks/useFetchFSAListItems';
import { fsaColumns } from './data/tableColumns';
import { fsaFields } from './data/fsaFields';
import fillRowData from './utils/fillRowData';
import CardModal from '../../components/ui/CardModal';
import Summary from './Summary';
import { SummaryUserInfo } from './types/customTypes';
import { InboxTableColumn } from './types/customTypes';
import { MyRequestsProps } from '../../@types/customTypes';

/**
 * my-requests page: for showing requests
 * that currently need the approval of the user
 * @param {any} props
 * @return {JSX.Element}
 */
const MyRequests: React.FC<MyRequestsProps> = ({
	curUserInfo
}: MyRequestsProps): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [summaryRow, setSummaryRow] = useState({});
	const [openSummary, setOpenSummary] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const error: any = useSelector<any>((state) => state?.request_data?.error);
	const requestData: any = useSelector(
		(state: any) => state.request_data.allPSA,
	);
	/**
	 * Fetch all the fsa requests that are ready to get into the second step
	 * which is Initiate the request
	 */
	const [data, loadingFSA] = useFetchFSAListItems('expressionOfNeedsData',
		false, fsaFields, "phase = 'Initiate the request'"); /* eslint-disable-line */
	const renderSummaryColumn = useCallback((rowData: any): JSX.Element => {
		return (
			<IconButton color='success' onClick={() => {
				setSummaryRow(rowData);
				setOpenSummary(true);
			}}>
				<SummarizeIcon />
			</IconButton>
		);
	}, []);
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
			field: 'Created',
		},
		{
			label: 'Updated Date',
			field: 'Modified',
		},
		{
			label: 'Status',
			field: 'status',
		},
	];
	useEffect(() => {
		dispatch(setPageTitle('My Requests'));
		dispatch(getAllPSARequests());
	}, [dispatch]);

	useEffect(() => {
		setLoading(true);
		// console.log('task orders in redux --- ', requestData);
		const rows = requestData.map((row: any) => {
			// const clickEvent = () => {
			// 	props.history.push(`/psa/my-requests/${row.customID}`);
			// };
			// handle date properly upon creating and updating requests
			const createdAt = moment(
				row.Created ? row.Created : new Date(),
			).format('DD-MM-yyyy');
			const updatedAt = moment(
				row.Created ? row.Created : new Date(),
			).format('DD-MM-yyyy');
			const status = row.status === 'active' ? 'In Progress' : 'Closed';
			// removed click Event from the returned object
			return { ...row, createdAt, updatedAt, status };
		});
		// setRows(getTwoDcpValues(rows, taskOrderFields));
		setLoading(false);
	}, [requestData]); /* eslint-disable-line */

	/**
	 * Handles a double click on a table row, and send the row data as
	 * props the NewFsa component to continue the process
	 * @param {any} event -- unused in this case
	 * @param {any} props -- the row data that we will pass to NewFsa component
	 * @return {Promise<void>} -- a promise that will always resolves successfully
	 */
	const onRowDoubleClicked = (event: any, props: any): Promise<void> => {
		return new Promise((resolve, _) => {
			/**
			 * Here we correct the data to be in the correct boolean format rather
			 * than just a fetched string from sharepoint
			 */
			props.isThereExpenses = (props.isThereExpenses === '1') ? true : false;
			props.isThereWorkOrder = (props.isThereWorkOrder === '1') ? true : false;
			props.curUserPreferredName = curUserInfo?.PreferredName as string;
			navigate(`/fsa/new/${props.id + 1}`, {
				state:
					{ alreadyFilledData: props },
			});
			resolve();
		});
	};

	const onSummaryClose = () => {
		setOpenSummary(false);
	};

	if (loading || loadingFSA) {
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

	if (error) {
		toast.error(error);
	}

	return (
		<>
			<Helmet title='My Requests | TMS Platform' />
			<MaterialTable
				data={fillRowData((data as InboxTableColumn[]).reverse())}
				columns={[{
					field: 'case',
					title: 'Case',
					headerStyle: {
						paddingRight: 0,
						paddingLeft: 5,
					},
				},
				{
					field: 'summary',
					title: 'Summary',
					render: renderSummaryColumn,
				}, ...fsaColumns]}
				onRowDoubleClick={onRowDoubleClicked}
				options={{
					headerStyle: {
						backgroundColor: 'white',
						color: 'dark',
						fontWeight: 'bold',
						fontFamily:
							"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
						paddingRight: 0,
						paddingLeft: 0,
						fontSize: '0.7rem',
					},
					rowStyle: {
						fontFamily:
							"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
						fontSize: '0.7rem',
					},
					showTitle: false,
					pageSize: 9,
					pageSizeOptions: [],
				}}
			/>
			<CardModal
				cardModalIsOpen={openSummary}
				onClose={onSummaryClose}
				content=''
				title='Summary'
				checkForContent={false}
				isSummaryModal
			>
				<Summary
					rowData={summaryRow}
					currUserInfo={curUserInfo as SummaryUserInfo} />
				<></>
			</CardModal>
			{/* <MDBDataTableV5
				responsive
				hover
				entries={99999999999}
				data={{ columns, rows }}
			/> */}
		</>
	);
}

export default MyRequests;
