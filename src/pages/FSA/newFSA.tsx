import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { setPageTitle } from '../../redux/modules/page-title.reducer';
import MyStepper from '../../components/ui/MyStepper';
import BasicInformation from './forms/BasicInformation';
import useFetchFSAListItems from '../../hooks/useFetchFSAListItems';
import MyCircularProgress from '../../components/ui/MyCircularProgress';
import { submitDataToSP } from './utils/expressionOfNeedsTools';
import { initTheRequestResourcesFields } from './data/sharepointFields';
import getListItems from '../../sharepoint/customAPIs/getListItems';
import {
	BasicInformationRecource,
	BasicInformationDataToSendToSP,
} from './types/cummonTypes';
import { DataTypeFromSP,
	NewFSAProps } from '../../@types/customTypes';
import { FSA_PHASE } from '../../utils/enums';
import InitiateTheRequest from './forms/initiateTheRequest/InitTheRequest';


/**
 * @return {JSX.Element}
 */
const NewFSA: React.FC<NewFSAProps> = ({
	curUserInfo,
}: NewFSAProps): JSX.Element => {
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = useState(0); /* eslint-disable-line */
	const [resources, setResources] = useState<BasicInformationRecource[]>([]);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [costControllerVerIsOpen, setCostControllerVerIsOpen] =
		useState<boolean>(false);
	const { state } = useLocation();
	/**
	 * If we are at the second step e.i Initiate the request then this component
	 * will be called as a redirection from the MyRequests component aka inbox,
	 * and it will pass the expression of the needs step data already filled in,
	 * hence we should just get them and display them
	 */
	const alreadyFilledData = (state as any)?.alreadyFilledData;
	let QUERY: string;

	if (alreadyFilledData) {
		QUERY = 'projectManager = "' +
		alreadyFilledData.curUserPreferredName + '"';
	} else {
		QUERY = 'projectManager = "' +
		curUserInfo?.PreferredName as string + '"';
	}
	const [fsaInfo, loading] = useFetchFSAListItems('pmt_projects', true, [
		'projectNumber',
		'projectName',
		'projectCostController',
	], QUERY);
	const navigate = useNavigate();

	/**
	 * Get the resources if we are at the initiate the request phase and
	 * the fsaInfo request is done, we will get the resources where the
	 * requestID matches the current requestID
	 */
	useEffect(() => {
		const fetchResources = async () => {
			try {
				const QUERY = 'requestID = "' + alreadyFilledData.requestID + '"';
				/**
				 * Construct the where query to fetch the resources with the current
				 * requestID if we are at the initiate the request phase
				 */
				const WHERE: string = (alreadyFilledData) ? QUERY : '';
				const resources = await getListItems('fsaResources',
					false, initTheRequestResourcesFields, WHERE);
				/**
				 * Here we correct the data to be in the correct boolean format rather
				 * than just a fetched string from sharepoint
				 */
				for (const resource of resources as any[]) {
					resource.expenses = (resource.expenses === '1') ? true : false;
				}
				setResources(resources as BasicInformationRecource[]);
			} catch (e) {
				toast.error(
					`Error occured while fetching resources from sharepoint`, /* eslint-disable-line */
				);
			}
		};
		if ((fsaInfo as Map<string, DataTypeFromSP[] | undefined>).size !== 0 &&
			alreadyFilledData?.phase === 'Initiate the request') fetchResources();
	}, [loading]); /* eslint-disable-line */

	useEffect(() => {
		dispatch(setPageTitle('New FSA request'));
	}, [dispatch]);

	// basic information form
	const basicInformationForm = useFormik<BasicInformationDataToSendToSP>({
		initialValues: {
			taskOrderCategory: (alreadyFilledData)
				? alreadyFilledData.taskOrderCategory : '',
			isThereWorkOrder: (alreadyFilledData)
				? alreadyFilledData.isThereWorkOrder : false,
			isThereExpenses: (alreadyFilledData)
				? alreadyFilledData.isThereExpenses : false,
			projectTitle: (alreadyFilledData)
				? `${alreadyFilledData.projectNumber}-${alreadyFilledData.projectName}`
				: '',
			toContractType: (alreadyFilledData)
				? alreadyFilledData.toContractType : '',
			category: (alreadyFilledData)
				? alreadyFilledData.category : '',
			paymentTerms: (alreadyFilledData)
				? alreadyFilledData.paymentTerms : '',
			jacobsOffice: (alreadyFilledData)
				? alreadyFilledData.jacobsOffice : '',
			startDate: (alreadyFilledData)
				? (moment(alreadyFilledData.startDate)).format('YYYY-MM-DD') : '',
			endDate: (alreadyFilledData)
				? (moment(alreadyFilledData.endDate)).format('YYYY-MM-DD') : '',
			departure: (alreadyFilledData)
				? alreadyFilledData.departure : '',
			destination: (alreadyFilledData)
				? alreadyFilledData.destination : '',
			serviceDescription: (alreadyFilledData)
				? alreadyFilledData.serviceDescription : '',
			costController: '',
		},
		onSubmit: async (values) => {
			if (alreadyFilledData?.phase === FSA_PHASE.second) onNextClick();
			/**
			 * This condition to check if the contract type is 'lump sum'
			 * and there is no staffing
			 */
			if (values.toContractType === 'reimbursable' && resources.length === 0) {
				toast.info('Please fill the resources');
				return;
			}
			setCostControllerVerIsOpen(true);
		},
		validationSchema: Yup.object({
			taskOrderCategory: Yup.string().required(),
			projectTitle: Yup.string().required(),
			toContractType: Yup.string().required(),
			category: Yup.string().required(),
			jacobsOffice: Yup.string().required(),
			startDate: Yup.date().required(),
			endDate: Yup.date().required(),
			departure: Yup.string().required(),
			destination: Yup.string().required(),
			serviceDescription: Yup.string().required(),
		}),
	});
	/**
	 * Function handler for the Next button click event, it
	 * sets the activeStep to next one.
	 */
	const onNextClick = () => {
		setActiveStep(activeStep + 1);
	};

	/**
	 * Function handler for the Back button click event, it
	 * sets the activeStep to previous one.
	 */
	const onBackClick = () => {
		setActiveStep(activeStep - 1);
	};
	/**
	 * This callback will close the cost controller modal and submits
	 *  the data to sharepoint if the submit condion is true, and it
	 * will set a submitting state to render a circular progress
	 * @param {boolean} submit -- a condition to dicide if we gonna
	 * submit the data whene the cost controller closes or not, because
	 * this function handle the close action from the close and the sumbit
	 * buttons.
	 */
	const onCostControllerVerClose = async (submit: boolean) => {
		setCostControllerVerIsOpen(false);
		if (submit) {
			setSubmitting(true);
			await submitDataToSP({ ...basicInformationForm.values }, resources,
				navigate, curUserInfo?.PreferredName as string);
			setSubmitting(false);
		}
	};

	/**
	 * The function handler for the RowAdd event, it adds a new row
	 * for the table resources
	 * @param {BasicInformationRecource} rowData -- new rowData to add
	 * @return {Promise<void>}
	 */
	const onRowAdd = (rowData: BasicInformationRecource): Promise<void> => {
		return new Promise<void>((resolve) => {
			setResources([...resources, rowData]);
			resolve();
		});
	};

	/**
	 * The function handler for the RowUpdate event, it updates the row
	 * with new data
	 * @param {BasicInformationRecource} newData -- new data to add
	 * @param {BasicInformationRecource} oldData -- old data to update
	 * @return {Promise<void>}
	 */
	const onRowUpdate =
		(newData: BasicInformationRecource, oldData: BasicInformationRecource):
			Promise<void> => {
			return new Promise<void>((resolve) => {
				const dataUpdate = [...resources];
				const index: number = (oldData?.tableData?.id) as number;
				dataUpdate[index] = newData;
				setResources([...dataUpdate]);
				resolve();
			});
		};

	/**
	 * The function handler fro the RowDelete event, it deletes a specific
	 * row from the table resources
	 * @return {Promise<void>}
	 */
	const onRowDelete =
		async ({ tableData }: BasicInformationRecource): Promise<void> => {
			return new Promise<void>((resolve) => {
				const newResources = resources.filter((_, id) => id !== tableData?.id);
				setResources(newResources);
				resolve();
			});
		};

	/**
	 * Render a Circular progress when the data is submitting to
	 * sharepoint or if the desired data is not yet set, that's
	 * because in the useFetchListItems hook we use useEffect as
	 * an inner hook and it's async, so in the first component
	 * mount the loading state will be false even the data is not
	 * fetched yet.
	 */
	if (submitting || !(fsaInfo as Map<string, string[] | undefined>).size) {
		return <MyCircularProgress color='primary' />;
	}

	const renderComponent = (): JSX.Element => {
		switch (activeStep) {
		case 0:
			return (
				<BasicInformation
					basicInformationForm={basicInformationForm}
					resources={resources}
					onRowAdd={onRowAdd}
					onRowUpdate={onRowUpdate}
					onRowDelete={onRowDelete}
					fsaInfo={fsaInfo as Map<string, string[] | undefined>}
					loadingData={loading}
					costControllerVerIsOpen={costControllerVerIsOpen}
					onCostControllerVerClose={onCostControllerVerClose}
					phase={(alreadyFilledData)
						? alreadyFilledData.phase : FSA_PHASE.first}
				/>
			);
		case 1:
			return (
				<InitiateTheRequest
					resources={resources}
					onBackClick={onBackClick}
					alreadyFilledData={alreadyFilledData} />
			);
		default:
			return <></>;
		}
	};
	return (
		<>
			<Helmet title='New FSA | TMS Platform' />
			<MyStepper activeStep={activeStep} framework='FSA' />
			{renderComponent()}
		</>
	);
};

export default NewFSA;
