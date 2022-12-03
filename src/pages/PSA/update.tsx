/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
	makeStyles,
	Step,
	StepConnector,
	StepIconProps,
	StepLabel,
	Stepper,
	withStyles,
} from '@material-ui/core';
import $SP from 'sharepointplus';
import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import { Check, Create, InsertDriveFile, List } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import BasicInformation from './forms/BasicInformation';
import Checklist from './forms/Checklist';
import GenerateDocument from './forms/GenerateDocument';
import Finish from './forms/Finish';
import parseXLSX from '../../utils/parseXLSX';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { BeatLoader } from 'react-spinners';
import FileModal from '../../components/ui/FileModal';
import { fileToBase64String } from '../../utils/convert_attachmnets';
import { getLastID, getNewResources, getNewAttachments } from '../../utils/commonFuncs';
import {
	attachmentsFields,
	resourceTableFields,
	taskOrderFields,
} from './sharepointsFields';
import { getTwoDcpValues } from '../Requests/commonFunc';
import useFetchListItems from '../../hooks/useFetchListItems';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// styles
const useStyles = makeStyles({
	loading: {
		height: '80vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

// styles for the stepper component
const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
	},
});

/**
 * Stepper icons
 * @param {StepIconProps} props
 * @return {JSX.Element}
 */
function ColorlibStepIcon(props: StepIconProps) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <Create />,
		2: <List />,
		3: <InsertDriveFile />,
		4: <Check />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}>
			{icons[String(props.icon)]}
		</div>
	);
}

// update psa function
const UpdatePSA: React.FC = (props: any) => {
	const [activeStep, setActiveStep] = useState(0);
	const [resources, setResources] = useState<any[]>([]);
	const [attachments, setAttachments] = useState<any[]>([]);
	const [activeAttachment, setActiveAttachment] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [fileOpen, setFileOpen] = useState(false);
	const [activeFile, setActiveFile] = useState<any>();
	const [title, setTitle] = useState('');
	const [psa, setPSA] = useState<any>();
	// custom hooks to get resourcedata and attachments
	const [isPsaAttachmentLoading, psaAttachment] = useFetchListItems(
		'Attachments',
		attachmentsFields,
	);
	const [isPsaResourcesLoading, psaResources] = useFetchListItems(
		'resourcedata',
		resourceTableFields,
	);
	const [isTaskOrdersLoading, taskorders] = useFetchListItems(
		'Dataflow',
		taskOrderFields,
	);
	const dispatch = useDispatch();
	const classes = useStyles();
	const sp = $SP();
	const { id } = props.match.params;

	// hook for fetching product details to populate for updating
	useEffect(() => {
		dispatch(setPageTitle('Update PSA Request'));
	}, [dispatch, id]);

	// hook to set attachments and resource table data for this request.
	useEffect(() => {
		// get the single request data
		// console.log('taskorders in update ---- ', taskorders);
		const psaArr = taskorders.filter(
			(result: any) => result.customID === id,
		);
		const psa = getTwoDcpValues(psaArr, taskOrderFields);
		const resources: any[] = psaResources.filter(
			(resource: any) =>
				resource.requestId === id && resource.framework === 'psa',
		);
		// console.log('resources in update ---- ', resources);
		const attachments: any[] = psaAttachment.filter(
			(attachment: any) =>
				attachment.requestId === id && attachment.framework === 'psa',
		);
		// console.log('attachments in update ---- ', attachments);
		setPSA(psa[0]);
		setResources(resources);
		setAttachments(attachments);
	}, [psaResources, psaAttachment, taskorders, id]);

	// go to next step
	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	// go to previous step
	const handlePrevious = () => {
		setActiveStep(activeStep - 1);
	};

	// for handling first step page form (basic information)
	const basicInformationForm = useFormik<{
		task_order_category: string;
		project_title: string;
		revision_no: number;
		category: string;
		office: string;
		legal_entity: string;
		framework: string;
		mt_cost: number;
		adc: number;
		wbs_task_code: string;
		expenses: number;
		startDate: string;
		endDate: string;
		departure: string;
		destination: string;
	}>({
		initialValues: {
			...psa,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			handleNext();
		},
		validationSchema: Yup.object({
			task_order_category: Yup.string().required(),
			project_title: Yup.string().required(),
			revision_no: Yup.number().required(),
			category: Yup.string().required(),
			office: Yup.string().required(),
			legal_entity: Yup.string().required(),
			framework: Yup.string().oneOf(['psa', 'fsa']).required(),
			mt_cost: Yup.number().required(),
			adc: Yup.number().required(),
			wbs_task_code: Yup.string()
				.matches(/[^.]\.[^.]{2}\.[^.]*/, {
					message: 'Must be of the format X.XX.XXXX',
				})
				.required('WBS Task code is required'),
			expenses: Yup.number().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date().required(),
			departure: Yup.string().required(),
			destination: Yup.string().required(),
		}),
	});

	// for handling second step page form (checklist)
	const checklistForm = useFormik<{
		isItAtoWithAjacobsOffice: boolean;
		isThePersonBillable: boolean;
		gmAuthorizationMustBeAttached: boolean;
		first_note: string;
		areRatesVerified: boolean;
		areExpensesIncluded: boolean;
		haveTheMultipliersBeenVerified: boolean;
		isTheOfficeLocationVerified: boolean;
		areTheWbsCodesConfirmed: boolean;
		last_note: string;
	}>({
		initialValues: {
			...psa,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			handleNext();
		},
		validationSchema: Yup.object({
			first_note: Yup.string().optional(),
			last_note: Yup.string().optional(),
		}),
	});

	// when an excel sheet is attached to the resources table
	const onAddResourceExcel = async (files: File[]) => {
		try {
			const data = await parseXLSX(files[0]);
			if (data) setResources([...resources, ...data]);
		} catch (error) {
			toast.error(
				'Something went wrong parsing the xlsx file, ' +
					'please make sure file is in correct format and try again',
			);
		}
	};

	// when a new row is added to the resource table
	const onAddRow = async (rowData: any) => {
		// add request id and framework to each row
		// for identification of this resources on sharepoint.
		rowData['requestId'] = id;
		rowData['framework'] = basicInformationForm.values.framework;
		setResources([...resources, rowData]);
	};
	// when a row is deleted from excel
	const onDeleteRow = async ({ tableData }: any) => {
		const newResources = resources.filter((_, id) => id !== tableData.id);
		setResources(newResources);

		// get last id of the attachments
		const lastID = getLastID('resourcedata');

		// delete attachment with this ID
		await sp.list('resourcedata', process.env.REACT_APP_BASE_URL).remove({ ID: lastID });
	};

	// when a document is attached
	const onDeleteAttachment = async ({ tableData }: any) => {
		const newAttachments = attachments.filter(
			(_, id) => id !== tableData.id,
		);
		setAttachments(newAttachments);

		// get last id of the attachments
		const lastID = getLastID('Attachments');

		// delete attachment with this ID
		await sp.list('Attachments', process.env.REACT_APP_BASE_URL).remove({ ID: lastID });
	};

	// for attach documents form (step page 3)
	const attachDocumentForm = useFormik<{
		file_title: string;
		version: string;
		comment: string;
	}>({
		initialValues: {
			file_title: '',
			version: '',
			comment: '',
		},
		enableReinitialize: true,
		onSubmit: async (values: any) => {
			if (!activeAttachment) {
				// console.log('Pleae attach a file');
				toast.error('Please attach a file');
				return;
			}

			// convert file to base64 to be able to save file in sharepoint.
			const fileInBase64 = await fileToBase64String(activeAttachment);

			setAttachments([
				...attachments,
				{
					version: values.version,
					whenCreated: new Date().toDateString(),
					who_created: 'Admin', // todo: get the name of the user.
					comment: values.comment,
					file_title: values.file_title,
					documentURL: fileInBase64,
					// to identify attachments for each request
					requestId: id,
					// to determine whether psa or fsa
					framework: basicInformationForm.values.framework,
				},
			]);
		},
		validationSchema: Yup.object({
			file_title: Yup.string().required(),
			version: Yup.string().required(),
			comment: Yup.string().optional(),
		}),
	});

	// when an attachment is added
	const onAddAttachment = async (files: File[]) => {
		setActiveAttachment(files[0]);
	};

	// for handling business unit form (step form page 4)
	const buForm = useFormik<{
		business_unit_manager: string;
		name: string;
		email: string;
	}>({
		initialValues: {
			...psa,
		},
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				// update task order data on sharepoint NB:Might not work.
				await sp.list(`Dataflow`, process.env.REACT_APP_BASE_URL).update(
					{
						...basicInformationForm.values,
						...checklistForm.values,
						...buForm.values,
						creator: 'Admin', // who is the creator?
					},
					{ where: `customID = '${id}' AND framework = 'psa'` },
				);

				// update timeline for this request. NB:Might not work.
				await sp.list('Timelines', process.env.REACT_APP_BASE_URL).add({
					createdAt: new Date().toLocaleString(),
					description: 'Updated Request',
					requestId: id,
					framework: basicInformationForm.values.framework,
					icon: 'edit',
					color: 'secondary-color',
				});

				// update resource list on sharepoint
				await sp
					.list(`resourcedata`, process.env.REACT_APP_BASE_URL)
					.update(
						getNewResources(
							resources,
							id,
							basicInformationForm.values.framework,
						),
						{
							where: `requestId = '${id}'`,
						},
					);

				// todo:upate attachments for this request on sharepoint
				await sp
					.list(`Attachments`, process.env.REACT_APP_BASE_URL)
					.update(getNewAttachments(attachments), {
						where: `requestId = '${id}'`,
					});

				toast.success('PSA request updated successfully');
				setLoading(false);
				props.history.push(`/requests/${id}`);
			} catch (error) {
				toast.error('Updating psa request failed');
				setLoading(false);
			}
		},
		validationSchema: Yup.object({
			business_unit_manager: Yup.string().required(),
			name: Yup.string().required(),
			email: Yup.string().email().required(),
		}),
	});

	// stepper connector
	const ColorlibConnector = withStyles({
		alternativeLabel: {
			top: 22,
		},
		active: {
			'& $line': {
				backgroundImage:
					'linear-gradient( 95deg,rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
			},
		},
		completed: {
			'& $line': {
				backgroundImage:
					'linear-gradient( 95deg,rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
			},
		},
		line: {
			height: 3,
			border: 0,
			backgroundColor: '#eaeaf0',
			borderRadius: 1,
		},
	})(StepConnector);

	const steps = [
		'Basic Information',
		'Checklist',
		'Generate Document',
		'Finish',
	];

	// for determining which component to render depending on the step page
	const renderFormComponent = () => {
		switch (activeStep) {
		case 0:
			return (
				<BasicInformation
					basicInformationForm={basicInformationForm}
					resources={resources}
					onAddResourceExcel={onAddResourceExcel}
					addRow={onAddRow}
					deleteRow={onDeleteRow}
				/>
			);
		case 1:
			return (
				<Checklist
					handlePrevious={handlePrevious}
					checklistForm={checklistForm}
				/>
			);
		case 2:
			return (
				<GenerateDocument
					handleNext={handleNext}
					handlePrevious={handlePrevious}
					attachDocumentForm={attachDocumentForm}
					documents={attachments}
					onDrop={onAddAttachment}
					onRowDelete={onDeleteAttachment}
					setTitle={setTitle}
					setActiveFile={setActiveFile}
					setFileModalOpen={setFileOpen}
					checklistData={checklistForm.values}
					basicInformationFormData={basicInformationForm}
					resources={resources}
					locationPathname={window.location.href}
				/>
			);
		case 3:
			return (
				<Finish
					handlePrevious={handlePrevious}
					formik={buForm}
					loading={loading}
				/>
			);
		}
	};

	// show loader whiles the backend data is being fetched
	if (
		loading ||
		isPsaAttachmentLoading ||
		isPsaResourcesLoading ||
		isTaskOrdersLoading
	) {
		return (
			<div className={classes.loading}>
				<BeatLoader color='#4b0082' />
			</div>
		);
	}

	// todo : handle errors

	return (
		<>
			<Helmet title='New PSA | TMS Platform' />
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				connector={<ColorlibConnector />}>
				{steps.map((step) => (
					<Step key={step}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>
							{step}
						</StepLabel>
					</Step>
				))}
			</Stepper>
			{renderFormComponent()}
			<FileModal
				open={fileOpen}
				onClose={() => setFileOpen(false)}
				title={title}
				file={activeFile}
			/>
		</>
	);
};

export default UpdatePSA;
