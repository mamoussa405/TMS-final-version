import { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import {
	MDBBadge,
	MDBDataTableV5,
	MDBIcon,
	MDBTimeline,
	MDBTimelineStep,
} from 'mdbreact';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { getTimelines } from '../../redux/modules/request';
import DragTable from '../../components/ui/DragTable';
import { getCheckListTemplate, getMs } from '../../utils/templateUtils';
import FileModal from '../../components/ui/FileModal';
import jacobsTemplate from '../../static/jacobs';
import hourlySplitTemplate from '../../static/hourly-split';
import worleyTemplate from '../../static/worley';
import doc from '../../assets/doc.svg';

import './task-order-page.css';
import {
	attachmentsFields,
	resourceTableFields,
	taskOrderFields,
} from '../PSA/sharepointsFields';
import { getTwoDcpValues } from './commonFunc';
import { getNewResourcesWithMs } from '../../utils/commonFuncs';
import useFetchListItems from '../../hooks/useFetchListItems';

// styles
const useStyles = makeStyles((theme) => ({
	loading: {
		height: '80vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	badge: {
		width: '5rem',
	},
	detailsTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: '1rem',
	},
	timelinesTitle: {
		fontWeight: 'bold',
		marginTop: '3.5rem',
	},
	detailsPane: {
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'space-between',
		'marginTop': '1rem',
		'marginBottom': '',

		'& > div': {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		},
	},
	editDiv: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	timelineStep: {
		padding: '.5rem !important',
	},
	doc: {
		'width': '1.2rem',
		'margin': '1rem',
		'cursor': 'pointer',

		'transition': 'all .2s ease-in',
		'&:hover': {
			width: '1.3rem',
			boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.6)',
		},
	},
	gridLeft: {
		boxShadow: ' 0 4px 8px 0 rgba(0,0,0,0.2)',
		marginTop: '2rem',
		marginBottom: '2rem',
		padding: '1rem',
	},
}));

/**
 * Single request page
 * @param {any} props
 * @return {JSX.Element}
 */
function SingleRequest(props: any) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [m1ActionsHidden, setM1ActionsHidden] = useState(true);
	const [activeFile, setActiveFile] = useState<any>();
	const [fileModalOpen, setFileModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	// custom hooks to get resourcedata and attachments
	const [isAttachmentLoading, psaAttachment] = useFetchListItems(
		'Attachments',
		attachmentsFields,
	);
	const [isResourcedata, psaResources] = useFetchListItems(
		'resourcedata',
		resourceTableFields,
	);
	const [isTaskOrderLoading, taskorders] = useFetchListItems(
		'Dataflow',
		taskOrderFields,
	);
	const dispatch = useDispatch();
	// const { id } = props.match.params;
	const { id } = useParams();

	const psaTimelines = useSelector(
		(state: any) => state.request_data.timelines,
	);

	// hook for fetching data from api
	useEffect(() => {
		setLoading(true);
		dispatch(setPageTitle('Task Order Page'));
		// get timelines for this request
		dispatch(getTimelines(id));
		setLoading(false);
	}, [dispatch]); /* eslint-disable-line */

	// for calculating sum of hourly split data (M1 - M12)
	const sum = (data: any) => {
		if (!data) return 0;
		const m1 = isNaN(data._x006d_1) ? 0 : parseFloat(data._x006d_1);
		const m2 = isNaN(data._x006d_2) ? 0 : parseFloat(data._x006d_2);
		const m3 = isNaN(data._x006d_3) ? 0 : parseFloat(data._x006d_3);
		const m4 = isNaN(data._x006d_4) ? 0 : parseFloat(data._x006d_4);
		const m5 = isNaN(data._x006d_5) ? 0 : parseFloat(data._x006d_5);
		const m6 = isNaN(data._x006d_6) ? 0 : parseFloat(data._x006d_6);
		const m7 = isNaN(data._x006d_7) ? 0 : parseFloat(data._x006d_7);
		const m8 = isNaN(data._x006d_8) ? 0 : parseFloat(data._x006d_8);
		const m9 = isNaN(data._x006d_9) ? 0 : parseFloat(data._x006d_9);
		const m10 = isNaN(data._x006d_10) ? 0 : parseFloat(data._x006d_10);
		const m11 = isNaN(data._x006d_11) ? 0 : parseFloat(data._x006d_11);
		const m12 = isNaN(data._x006d_12) ? 0 : parseFloat(data._x006d_12);

		return m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8 + m9 + m10 + m11 + m12;
	};

	// get the single request data
	const psaArr = taskorders.filter((result: any) => result.customID === id);
	const psa = getTwoDcpValues(psaArr, taskOrderFields);

	// filter resourcedata and attachments for only this request
	const resourcesArr: any[] = psaResources.filter(
		(resource: any) =>
			resource.requestId === id && resource.framework === 'psa',
	);
	const resources = getTwoDcpValues(resourcesArr, resourceTableFields);
	const attachments: any[] = psaAttachment.filter(
		(attachment: any) =>
			attachment.requestId === id && attachment.framework === 'psa',
	);

	// for rendering document when clicked
	const renderDocument = (data: any) => {
		setTitle(data.file_title);
		if (data.file_title === 'Hours split') {
			const newResourcesWithMs = getNewResourcesWithMs(resources);
			const ms = getMs(newResourcesWithMs);
			let template = hourlySplitTemplate.replace(`%%Mss%%`, ms);
			template = template.replace(`%%wbs%%`, psa[0]?.wbs_task_code);
			template = template.replace(`%%expenses%%`, psa[0]?.expenses);
			setActiveFile(template);
		}
		if (data.file_title === 'Checklist') {
			// console.log('Single psa in checklist --- ', psa[0]);
			const template = getCheckListTemplate(psa[0]);
			setActiveFile(template);
		}
		if (data.file_title === 'Worley Task Order') {
			let template = worleyTemplate.replace(
				`@#revision_no`,
				psa[0].revision_no,
			);
			template = template.replace(
				`@#jacobslegal_entityAddress`,
				psa[0].legal_entity,
			);
			template = template.replace(`@#legal_entity`, psa[0].legal_entity);
			template = template.replace(`@#departure`, psa[0].departure);
			template = template.replace(`@#destination`, psa[0].destination);
			template = template.replaceAll(`@#startDate`, psa[0].startDate);
			template = template.replace(`@#endDate`, psa[0].endDate);
			template = template.replace(`@#adc`, psa[0].adc);
			template = template.replace(`@#mt_cost`, psa[0].mt_cost);
			template = template.replace(`@#taskCodes`, psa[0].wbs_task_code);
			template = template.replace(`@#expenses `, psa[0].expenses);
			template = template.replace(`@#wbs_task_code`, psa[0].wbs_task_code);
			setActiveFile(template);
		}
		if (data.file_title === 'Jesa Task Order') {
			let template = jacobsTemplate.replace(
				`@#revision_no`,
				psa[0].revision_no,
			);
			template = template.replace(
				`@#jacobslegal_entityAddress`,
				psa[0].legal_entity,
			);
			template = template.replace(`@#legal_entity`, psa[0].legal_entity);
			template = template.replace(`@#departure`, psa[0].departure);
			template = template.replace(`@#destination`, psa[0].destination);
			template = template.replaceAll(`@#startDate`, psa[0].startDate);
			template = template.replace(`@#endDate`, psa[0].endDate);
			template = template.replace(`@#adc`, psa[0].adc);
			template = template.replace(`@#mt_cost`, psa[0].mt_cost);
			template = template.replace(`@#taskCodes`, psa[0].wbs_task_code);
			template = template.replace(`@#expenses `, psa[0].expenses);
			template = template.replace(`@#wbs_task_code`, psa[0].wbs_task_code);
			setActiveFile(template);
		}
		setFileModalOpen(true);
	};

	if (
		loading ||
		isAttachmentLoading ||
		isResourcedata ||
		isTaskOrderLoading
	) {
		return (
			<div className={classes.loading}>
				<BeatLoader color='#001e82' />
			</div>
		);
	}

	// todo : handle errors

	return (
		<div>
			{/* {console.log('single psa ---', psa[0])} */}
			{/* {console.log('All psaAttachment ---', psaAttachment)} */}
			{/* {console.log('All psaResources ---', psaResources)} */}
			{/* {console.log('All psaTimelines ---', psaTimelines)} */}
			{/* {console.log( */}
			{/* `Resourcedata for this request with id ${id} is ${resources}`, */}
			{/* )} */}
			{/* {console.log( */}
			{/* `Attachments for this request with id ${id} is ${attachments}`, */}
			{/* )} */}
			<Helmet title='Task Order' />
			<Grid container spacing={8}>
				<Grid item xs={12} md={7}>
					<div className={classes.detailsPane}>
						<div>
							<strong>Status:</strong>
							{psa[0]?.status === 'active' ? (
								<MDBBadge
									color='success'
									pill
									className={classes.badge}>
									In Progress
								</MDBBadge>
							) : (
								<MDBBadge
									color='danger'
									pill
									className={classes.badge}>
									Closed
								</MDBBadge>
							)}
						</div>
						<div>
							{/* handle createdAt and updatedAt */}
							<strong>Created At</strong>{' '}
							{moment(psa[0]?.Created).format('DD-MM-yyyy')}
						</div>
						<div>
							<strong>Updated At</strong>{' '}
							{moment(psa[0]?.Modified).format('DD-MM-yyyy')}
						</div>
					</div>
					<div className={classes.gridLeft}>
						<h3 className={classes.detailsTitle}>Task Details</h3>
						<div className={classes.detailsPane}>
							<MDBDataTableV5
								id='no-columns'
								responsive
								hover
								data={{
									columns: [
										{
											label: 'Created By',
											field: 'creator',
										},
										{
											label: 'Category',
											field: 'category',
										},
										{
											label: 'Revision No',
											field: 'revision_no',
										},
										{
											label: 'Framework',
											field: 'framework',
										},
									],
									rows: [
										{
											...psa[0],
										},
									],
								}}
								paging={false}
								sortable={false}
								searching={false}
								displayEntries={false}
							/>
						</div>
						<div className={classes.detailsPane}>
							<MDBDataTableV5
								id='no-columns'
								responsive
								hover
								data={{
									columns: [
										{
											label: 'WBS Task Code',
											field: 'wbs_task_code',
										},
										{ label: 'ADC', field: 'adc' },
										{
											label: 'Expenses',
											field: 'expenses',
										},
										{
											label: 'Departure',
											field: 'departure',
										},
									],
									rows: [
										{
											...psa[0],
										},
									],
								}}
								paging={false}
								sortable={false}
								searching={false}
								displayEntries={false}
							/>
						</div>
						<div className={classes.detailsPane}>
							<MDBDataTableV5
								responsive
								id='no-columns'
								hover
								data={{
									columns: [
										{
											label: 'Destination',
											field: 'destination',
										},
										{
											label: 'Business Unit Manager',
											field: 'business_unit_manager',
										},
										{ label: 'Name', field: 'name' },
										{ label: 'Email', field: 'email' },
									],
									rows: [
										{
											...psa[0],
										},
									],
								}}
								paging={false}
								sortable={false}
								searching={false}
								displayEntries={false}
							/>
						</div>
					</div>
				</Grid>
				<Grid item xs={12} md={5}>
					<div className={classes.editDiv}>
						<Link to={`/requests/${psa[0]?.customID}/edit`}>
							Edit Task
						</Link>
					</div>
					<h3 className={classes.timelinesTitle}>Timelines</h3>
					<MDBTimeline>
						{psaTimelines.map((timeline: any, i: number) => (
							<MDBTimelineStep
								icon={i % 2 === 0 ? 'check' : 'credit-card'}
								color={
									i % 2 === 0
										? 'success-color'
										: 'primary-color'
								}
								inverted={i % 2 === 1}
								className={classes.timelineStep}
								key={i}
								hoverable>
								<strong className='font-weight-bold'>
									{timeline.description}
								</strong>
								<p className='text-muted mt-3'>
									<MDBIcon icon='clock' aria-hidden='true' />{' '}
									{moment(timeline.createdAt).fromNow()}
								</p>
							</MDBTimelineStep>
						))}
					</MDBTimeline>
				</Grid>
			</Grid>
			<DragTable
				data={resources}
				columns={[
					{ field: 'first_name', title: 'First Name' },
					{ field: 'last_name', title: 'Last Name' },
					{ field: 'function', title: 'Function' },
					{ field: 'wbs', title: 'WBS' },
					{ field: 'bwr', title: 'BWR' },
					{ field: 'bare_cost', title: 'Bare Cost' },
					{ field: 'jesa_billable', title: 'Jesa Billable' },
					{ field: 'total_labor_hours', title: 'Total Labor Hours' },
					{ field: 'total_labor_cost', title: 'Total Labor Cost' },
					{
						title: 'M(total)',
						render: (data: any) => (
							<span>{isNaN(sum(data)) ? 0 : sum(data)}</span>
						),
						editable: 'never',
						fields: 'm_total',
					},
					{
						field: '_x006d_1',
						title: 'M1',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_2',
						title: 'M2',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_3',
						title: 'M3',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_4',
						title: 'M4',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_5',
						title: 'M5',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_6',
						title: 'M6',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_7',
						title: 'M7',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_8',
						title: 'M8',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_9',
						title: 'M9',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_10',
						title: 'M10',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_11',
						title: 'M11',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
					{
						field: '_x006d_12',
						title: 'M12',
						hidden: m1ActionsHidden,
						type: 'numeric',
					},
				]}
				title='Resources'
				hideDropZone
				toggleMAction={() => setM1ActionsHidden(!m1ActionsHidden)}
			/>
			<DragTable
				title='Attachments'
				data={attachments}
				columns={[
					{ field: 'file_title', title: 'Title' },
					{ field: 'version', title: 'Version' },
					{ field: 'who_created', title: 'Creator' },
					{
						field: 'comment',
						title: 'Comment',
						render: (data: any) =>
							`${
								data.comment === null || 'undefined'
									? 'No Comment'
									: data.comment
							}`,
					},
					{
						field: 'whenCreated',
						title: 'Created Date',
						render: (data: any) =>
							moment(data.whenCreated).format('DD-MM-yyyy'),
					},
					{
						title: 'Document',
						render: (data: any) => {
							return (
								<img
									className={classes.doc}
									src={doc}
									alt='document'
									onClick={() => renderDocument(data)}
								/>
							);
						},
					},
				]}
				hideDropZone
			/>
			<FileModal
				open={fileModalOpen}
				onClose={() => setFileModalOpen(false)}
				title={title}
				file={activeFile}
			/>
		</div>
	);
}

export default SingleRequest;
