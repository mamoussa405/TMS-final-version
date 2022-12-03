/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import $SP from 'sharepointplus';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

import BasicInformation from './forms/BasicInformation';
import Checklist from './forms/Checklist';
import GenerateDocument from './forms/GenerateDocument';
import Finish from './forms/Finish';
import parseXLSX from '../../utils/parseXLSX';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { storeFormData } from '../../redux/modules/request';
import FileModal from '../../components/ui/FileModal';
import checklistTemplate from '../../static/checklist';
import jesaTemplate from '../../static/jacobs';
import worleyTemplate from '../../static/worley';
import hourlyRateTemplate from '../../static/hourly-split';
import { makeId } from '../../utils/makeId';
import { fileToBase64String } from '../../utils/convert_attachmnets';
import MyStepper from '../../components/ui/MyStepper';
import {
	getBase64format,
	getAttachmentsObj,
	getLastID,
	getNewResources,
	getNewAttachments,
} from '../../utils/commonFuncs';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// *the start of NewPSA component
// new psa page - for creating a new psa
const NewPSA: React.FC = (props: any) => {
	const [activeStep, setActiveStep] = useState(0);
	const [resources, setResources] = useState<any[]>([]);
	const [attachments, setAttachments] = useState<any[]>([]);
	const [activeAttachment, setActiveAttachment] = useState<any>();
	const [loading, setLoading] = useState(false);
	const [fileOpen, setFileOpen] = useState(false);
	const [activeFile, setActiveFile] = useState<any>();
	const [title, setTitle] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sp = $SP();

	// hook for setting page title
	useEffect(() => {
		dispatch(setPageTitle('New PSA Request'));
	}, [dispatch]);

	// for moving to the next step
	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	// go to the previous step
	const handlePrevious = () => {
		setActiveStep(activeStep - 1);
	};

	// To add attachments to the task orders list on sharepoint
	const addingAttachment = async (
		filename: string,
		base64: any,
		fileID: number,
		tempAttachments: any[],
		pdf?: any,
	) => {
		tempAttachments.push(
			getAttachmentsObj(filename, base64, basicInformationForm),
		);
	};

	// basic information form
	const basicInformationForm = useFormik<{
		customID: string;
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
		status: string;
		isApproved: boolean;
	}>({
		initialValues: {
			customID: makeId(10),
			task_order_category: '',
			project_title: '',
			revision_no: 0,
			category: '',
			office: '',
			legal_entity: '',
			framework: 'psa',
			mt_cost: 0,
			adc: 0,
			wbs_task_code: '',
			expenses: 0,
			startDate: '',
			endDate: '',
			departure: '',
			destination: '',
			status: 'active',
			isApproved: false,
		},
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
			mt_cost: Yup.number().min(0).required(),
			adc: Yup.number().min(0).required(),
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

	// checklist form
	const checklistForm = useFormik<{
		is_it_a_to_with_a_jacobs_office: boolean; // eslint-disable-line
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
			is_it_a_to_with_a_jacobs_office: false,
			isThePersonBillable: false,
			gmAuthorizationMustBeAttached: false,
			first_note: '',
			areRatesVerified: false,
			areExpensesIncluded: false,
			haveTheMultipliersBeenVerified: false,
			isTheOfficeLocationVerified: false,
			areTheWbsCodesConfirmed: false,
			last_note: '',
		},
		onSubmit: async (values) => {
			// handle attachments state temporarily
			const tempAttachments: any[] = [];
			// convert worleyTemplate or jesaTemplate to base64 format
			const jesaOrWorleypdf =
				basicInformationForm.values.category === 'worley'
					? pdfMake.createPdf(htmlToPdfmake(worleyTemplate))
					: pdfMake.createPdf(htmlToPdfmake(jesaTemplate));
			const jesaOrWorleyTaskOrderBase64 = await getBase64format(
				jesaOrWorleypdf,
			);

			// convert hourlyRateTemplate to base64 format
			const hoursSplitpdf = pdfMake.createPdf(
				htmlToPdfmake(hourlyRateTemplate),
			);
			const hoursSplitBase64 = await getBase64format(hoursSplitpdf);

			// convert checklistTemplate to base64 format
			const checkListpdf = pdfMake.createPdf(
				htmlToPdfmake(checklistTemplate),
			);
			const checkListBase64 = await getBase64format(checkListpdf);

			// add the base64 formats to sharepoint
			addingAttachment(
				basicInformationForm.values.category === 'worley'
					? 'Worley Task Order'
					: 'Jesa Task Order',
				jesaOrWorleyTaskOrderBase64,
				1,
				tempAttachments,
				jesaOrWorleypdf,
			);
			addingAttachment(
				'Hours split',
				hoursSplitBase64,
				2,
				tempAttachments,
				hoursSplitpdf,
			);
			addingAttachment(
				'Checklist',
				checkListBase64,
				3,
				tempAttachments,
				checkListpdf,
			);

			setAttachments(tempAttachments);

			handleNext();
		},
		validationSchema: Yup.object({
			first_note: Yup.string().optional(),
			last_note: Yup.string().optional(),
		}),
	});

	// when a new excel is added to resources table
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

	// when a new row is added to resources table
	const onAddRow = async (rowData: any) => {
		// add request id and framework to each row
		// for identification of this resources on sharepoint.
		rowData['requestId'] = basicInformationForm.values.customID;
		rowData['framework'] = basicInformationForm.values.framework;
		setResources([...resources, rowData]);
	};

	// when a row is deleted from resources table
	const onDeleteRow = async ({ tableData }: any) => {
		const newResources = resources.filter((_, id) => id !== tableData.id);
		setResources(newResources);

		// get last id of the attachments
		const lastID = getLastID('resourcedata');

		// delete resource with this ID
		await sp.list(`resourcedata`, process.env.REACT_APP_BASE_URL).remove({ ID: lastID });
	};

	// when an attachment is deleted
	const onDeleteAttachment = async ({ tableData }: any) => {
		const newAttachments = attachments.filter(
			(_, id) => id !== tableData.id,
		);
		setAttachments(newAttachments);

		// get last id of the attachments
		const lastID = getLastID('Attachments');

		// delete attachment with this ID
		await sp.list(`Attachments`, process.env.REACT_APP_BASE_URL).remove({ ID: lastID });
	};

	// for managing attach document form's state
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
					requestId: basicInformationForm.values.customID,
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

	// business unit form
	const buForm = useFormik<{
		business_unit_manager: string;
		name: string;
		email: string;
	}>({
		initialValues: {
			business_unit_manager: '',
			name: '',
			email: '',
		},
		onSubmit: async (values) => {
			// temporal
			try {
				setLoading(true);
				// save to redux.
				dispatch(
					storeFormData({
						...basicInformationForm.values,
						...checklistForm.values,
						...buForm.values,
						creator: 'Admin', // use values.name to
					}),
				);

				// add resources to sharepoint
				await sp
					.list(`resourcedata`, process.env.REACT_APP_BASE_URL)
					.add(
						getNewResources(
							resources,
							basicInformationForm.values.customID,
							basicInformationForm.values.framework,
						),
					);

				// save all attachments to sharepoint
				// console.log(
				// 	'Adding all attachments to sharepoint Attachment List ---- ',
				// 	attachments,
				// );
				await sp
					.list(`Attachments`, process.env.REACT_APP_BASE_URL)
					.add(getNewAttachments(attachments));

				// add the new task order to timeline.
				await sp.list(`Timelines`, process.env.REACT_APP_BASE_URL).add({
					createdAt: new Date().toLocaleString(),
					description: 'Created Request',
					requestId: basicInformationForm.values.customID,
					framework: basicInformationForm.values.framework,
					icon: 'plus',
					color: 'primary-color',
				});

				setLoading(false);
				// redirect the user to the new created psa request.
				// props.history.push(
				// 	`/requests/${basicInformationForm.values.customID}`,
				// );
				navigate(`/requests/${basicInformationForm.values.customID}`)
			} catch (error) {
				toast.error('Failed to create new psa request, try again');
				setLoading(false);
			}
		},
		validationSchema: Yup.object({
			business_unit_manager: Yup.string().required(),
			name: Yup.string().required(),
			email: Yup.string().email().required(),
		}),
	});

	// for rendering the current active step's component
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
					resources={resources}
					basicInformationFormData={basicInformationForm}
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

	return (
		<>
			<Helmet title='New PSA | TMS Platform' />
			<MyStepper activeStep={activeStep} />
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

export default NewPSA;
