import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Resources from './Resources';
import TravelRequest from './TravelRequest';
import GatherInputs from './GatherInputs';
import {
	InitTheRequestProps,
	InitTheRequestResource,
} from '../../types/forms';
import {
	TravelRequestDataToSendToSP,
	GatherInputsDataToSendToSP,
	CheckListDataToSendToSP,
	MyFile } from '../../types/cummonTypes';
import {
	updateResourcesInSP,
	submitDataToSP,
	submitGatherInputsToSP,
	submitCheckListDataToSP,
	submitFormsToSP } from '../../utils/initTheRequest';
import { hoursSplitFields } from '../../data/sharepointFields';
import FormsUpload from './FormsUpload';
import CheckList from './CheckList';

/**
 * This is the index page for the initiate the request phase,
 * it will render all the required pages and manage their: submit,
 * return back and the forms for each field.
 * @param {InitTheRequestProps} -- Object with the following props:
 * @first resources -- These are the already filled resources in the
 * expression of the needs phase.
 * @second onBackClick -- This will handle the Back button click event
 * @third alreadyFilledData -- This will be an object with the already
 * filled data in the expression of the needs phase.
 * @return {JSX.Element}
 */
const InitiateTheRequest: React.FC<InitTheRequestProps> = ({
	resources,
	onBackClick,
	alreadyFilledData }: InitTheRequestProps): JSX.Element => {
	/**
	 * The first state is for managing the submition process, it will
	 * let us disable the Back and the Next buttons when the data is
	 * submitting.
	 */
	const [submitting, setSubmitting] = useState<boolean>(false);
	/**
	 * The second state is for managing the current step to render
	 */
	const [activeStep, setActiveStep] = useState<number>(
		(alreadyFilledData.toContractType === 'reimbursable') ? 0 : 2);
	const navigate = useNavigate();
	/**
	 * Formik hook to build the form for the travel request page
	 */
	const travelRequestForm = useFormik<TravelRequestDataToSendToSP>({
		initialValues: {
			phase: '',
			site: '',
			subject: '',
			areExpensesBillable: '',
			startDate: moment(alreadyFilledData.startDate).format('YYYY-MM-DD'),
			endDate: moment(alreadyFilledData.endDate).format('YYYY-MM-DD'),
			airfare: false,
			airfareAmount: '',
			hotelMeal_DailyAllowances: false,
			hotelMeal_DailyAllowancesAmount: '',
			transportation: false,
			transportationAmount: '',
			miscellaneous: false,
			miscellaneousAmount: '',
		},
		onSubmit: async (values) => {
			/**
			 * When the user fill all the required data and hits the Next button
			 * this function will be fired, it will set the submitting state to true
			 * in order to disable the Next and the Back buttons, after that it will
			 * await for the submitDataToSP to submit data to sharepoint and to
			 * resolves successfully. Finally it will set the active step state to
			 * the next one.
			 */
			try {
				setSubmitting(true);
				await submitDataToSP({ ...values },
					alreadyFilledData.requestID as string);
				setActiveStep(activeStep + 1);
			} catch (e) {
			}
			setSubmitting(false);
		},
		validationSchema: Yup.object({
			phase: Yup.string().required(),
			site: Yup.string().required(),
			subject: Yup.string().required(),
			areExpensesBillable: Yup.string().required(),
		}),
	});
	/**
	 * Formik hook to build the form for the gather inputs page
	 */
	const gatherInputsForm = useFormik<GatherInputsDataToSendToSP>({
		initialValues: {
			projectName: alreadyFilledData.projectName as string,
			projectNumber: alreadyFilledData.projectNumber as string,
			revisionNo: 0,
			office: alreadyFilledData.jacobsOffice,
			framework: 'FSA',
			multipliers_MT_COST: 0,
			multipliers_ODC: 0,
			multipliers_LDC: 0,
			multipliers_ADC: 0,
			multipliers_EDC: 0,
			multipliersFSAAgency_MT_COST: 0,
			multipliersFSAAgency_ODC: 0,
			multipliersFSAAgency_LDC: 0,
			multipliersFSAAgency_ADC: 0,
			multipliersFSAAgency_EDC: 0,
			WBSTaskCode: '',
			expenses: 0,
		},
		onSubmit: async (values: GatherInputsDataToSendToSP) => {
			/**
			 * When the user fills all the required data and hits the Next button
			 * this function will be fired, it will set the submitting state to true
			 * in order to disable the Next and the Back buttons, after that it will
			 * await for the submitGatherInputsToSP to submit data to sharepoint and
			 * to resolves successfully, after that it will await for the Hours Split
			 * to be updated in the resources sharepoint list. Finally it will set the
			 * active step state to the next one.
			 */
			try {
				const QUERY = 'requestID = "' + alreadyFilledData.requestID + '"';

				setSubmitting(true);
				await submitGatherInputsToSP({
					revisionNo: values.revisionNo,
					framework: values.framework,
					WBSTaskCode: values.WBSTaskCode,
					expenses: values.expenses,
				}, alreadyFilledData.requestID as string);
				await updateResourcesInSP('fsaResources',
					resources, hoursSplitFields, QUERY);
				setActiveStep(activeStep + 1);
			} catch (e) {
			}
			setSubmitting(false);
		},
		validationSchema: Yup.object({
			revisionNo: Yup.number().required(),
			framework: Yup.string().required(),
		}),
	});

	/**
	 * Formik hook to build the form for check list page
	 */
	const checkListForm = useFormik<CheckListDataToSendToSP>({
		initialValues: {
			isThereSignedWorkOrder: false,
			isThereDeviation: false,
			isClientAuthorizationAttached: false,
			isGMAuthorizationAttached: false,
			ifThereIsNoWOIsItBDorJAT: false,
			GMAuthorizationMustBeAttached: false,
			notes: '',
			originalWOSchedule: 0,
			originalWOCost: 0,
			allocatedBudgetInWOSchedule: 0,
			allocatedBudgetInWOCost: 0,
			allPreviousTOsSchedule: 0,
			allPreviousTOsCost: 0,
			actualTOSchedule: 0,
			actualTOCost: 0,
			remainingSchedule: 0,
			remainingCost: 0,
			deviationComments: '',
		},
		onSubmit: async (values: CheckListDataToSendToSP) => {
			/**
			 * When the user fills all the required data and hits the Next button
			 * this function will be fired, it will set the submitting state to true
			 * in order to disable the Next and the Back buttons, after that it will
			 * await for the submitCheckListDataToSP to submit data to sharepoint and
			 * to resolves successfully, after that it will redirect the user to the
			 * inbox page.
			 **/
			try {
				setSubmitting(true);
				await submitCheckListDataToSP({ ...values },
					alreadyFilledData.requestID as string);
				/**
				 * todo: before navigating to /my-requests we should update some
				 * todo: info about the current request in expressionOfNeeds list
				 * todo: in sharepoint like: updateDate, sendBy, task.
				 * todo: the /psa/my-requests path name should be generalized
				 * todo: for exemple use /my-requests or /inbox instead of
				 * todo: /psa/my-requests
				 */
				navigate('/psa/my-requests');
			} catch (e) {
			}
			setSubmitting(false);
		},
		validationSchema: Yup.object({
			originalWOSchedule: Yup.number().required().min(1),
			originalWOCost: Yup.number().required().min(1),
			allocatedBudgetInWOSchedule: Yup.number().required().min(1),
			allocatedBudgetInWOCost: Yup.number().required().min(1),
			allPreviousTOsSchedule: Yup.number().required().min(1),
			allPreviousTOsCost: Yup.number().required().min(1),
		}),
	});
	/**
	 * The function handler for the resources update process, it will
	 * handle the error check first and the update next, for the error
	 * check it will check if the required info are entred in the correct
	 * format if not it will toast an error and returns back, after that
	 * it will update the data in sharepoint and set the activeStep to
	 * the next one depends on if we had expenses or not, if so it will
	 * move to the travel request step otherwise it will skip it to the next one.
	 * @param {InitTheRequestResource[]} resourcesData -- Array with the
	 * filled resources.
	 */
	const onResourcesSubmit = async (resourcesData: InitTheRequestResource[]) => {
		let errorFound: boolean = false;
		const QUERY = 'requestID = "' + alreadyFilledData.requestID + '"';

		// The error check part
		for (const resource of resourcesData) {
			if (resource.BWRError || resource.taskCodeError) {
				errorFound = true;
				break;
			}
		}
		if (errorFound) {
			toast.info('Please fill all required info in the correct format');
			return;
		}
		// The update process part
		try {
			setSubmitting(true);
			await updateResourcesInSP('fsaResources',
				resourcesData, ['ID', 'bwr', 'taskCode'], QUERY);

			if (alreadyFilledData.isThereExpenses) setActiveStep(activeStep + 1);
			else setActiveStep(activeStep + 2);
		} catch (e) {
		}
		setSubmitting(false);
	};
	/**
	 * The function handler for the TravelRequest Back button click event
	 */
	const onTravelRequestBackClick = () => {
		setActiveStep(activeStep - 1);
	};
	/**
	 * The function handler for the GatherInputs Back button click event
	 */
	const onGatherInputsBackClick = () => {
		if (alreadyFilledData.isThereExpenses) setActiveStep(activeStep - 1);
		else setActiveStep(activeStep - 2);
	};
	/**
	 * The function handler for Forms Upload submittion process, it will first
	 * check for the mandatory attachment to be uploaded, after it will set the
	 * submitting state to true to let us disable the Next and Back buttons and
	 * it will await for submitFormsToSP to be resolved successfully, and finally
	 * it will navigate to next page.
	 * @param {MyFile[]} attachments -- Array with the files to submit.
	 */
	const onFormsUploadSubmit = async (attachments: MyFile[]) => {
		/**
		 * First lets check for the mandatory files if they were uploaded
		 * or not.
		 */
		if (!attachments[1] || !attachments[2]) {
			if (!attachments[1] && !attachments[2]) {
				toast.info(
					'The Remaining Budget and the Work Order Copy are required, ' +
					'please add attachments');
			} else if (!attachments[1]) {
				toast.info('The Remaining Budget is required, please add attachment');
			} else {
				toast.info('The Work Order Copy is required, please add attachment');
			}
			return;
		}
		try {
			setSubmitting(true);
			await submitFormsToSP(
				attachments,
				alreadyFilledData.requestID as string);
			setActiveStep(activeStep + 1);
		} catch (e) {}
		setSubmitting(false);
	};
	/**
	 * The function handler for the FormsUpload Back button click event
	 */
	const onFormsUploadBackClick = () => {
		setActiveStep(activeStep - 1);
	};

	/**
	 * The function handler for the CheckList Back button click event
	 */
	const onCheckListBackClick = () => {
		setActiveStep(activeStep - 1);
	};
	/**
	 * The function responsable for managin the render logic for each page
	 * depends on the current activeStep.
	 * @return {JSX.Element}
	 */
	const renderComponent = (): JSX.Element => {
		switch (activeStep) {
		case 0:
			return (
				<Resources
					resources={resources}
					onResourcesSubmit={onResourcesSubmit}
					onBackClick={onBackClick}
					submitting={submitting}
				/>
			);
		case 1:
			return (
				<TravelRequest
					travelRequestForm={travelRequestForm}
					alreadyFilledData={alreadyFilledData}
					resources={resources}
					onTravelRequestBackClick={onTravelRequestBackClick}
					submitting={submitting}/>
			);
		case 2:
			return (
				<GatherInputs
					gatherInputsForm={gatherInputsForm}
					alreadyFilledData={alreadyFilledData}
					resources={resources}
					onGatherInputsBackClick={onGatherInputsBackClick}
					submitting={submitting} />
			);
		case -1:
			return (
				<FormsUpload
					onFormsUploadSubmit={onFormsUploadSubmit}
					onFormsUploadBackClick={onFormsUploadBackClick}
					submitting={submitting}/>
			);
		case 3:
			return (
				<CheckList
					checkListForm={checkListForm}
					resources={resources as any}
					expenses={gatherInputsForm.values.expenses}
					onCheckListBackClick={onCheckListBackClick}
					submitting={submitting}/>
			);
		default:
			return <></>;
		}
	};
	return (
		<>
			{renderComponent()}
		</>
	);
};

export default InitiateTheRequest;
