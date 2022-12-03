import { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BasicInformationProps } from '../types/forms';
import MySelect from '../../../components/forms/MySelect';
import MyRadioButtons from '../../../components/forms/MyRadioButtons';
import MyTextField from '../../../components/forms/MyTextField';
import DragTable from '../../../components/ui/DragTable';
import MyCheckBox from '../../../components/forms/MyCheckBox';
import CardModal from '../../../components/ui/CardModal';
import CostControllerVerification from './CostControllerVerification';
import basicInformationFields from '../data/basicInformation';
import MyCircularProgress from '../../../components/ui/MyCircularProgress';
import { editExpenses, editComments } from '../utils/editColumns';
import {
	fillItemsWithFetchedData,
	constructProjectsTitle,
} from '../utils/expressionOfNeedsTools';
import { FSA_PHASE } from '../../../utils/enums';
/**
 * These objects is for each Modal's left and right buttons props and styling
 */
const COST_CONTROLLER_MODAL_LEFT_BUTTON = {
	name: 'Close',
	color: 'error',
	endIcon: <CloseIcon />,
};

const COST_CONTROLLER_MODAL_RIGHT_BUTTON = {
	name: 'Submit',
	color: 'primary',
	endIcon: <KeyboardArrowUpIcon />,
};

/**
 * BasicInformation is the component that renders the first step
 * of our process, it contains the basic information that an FSA contract
 * requires, this component handle all the logic and the styling behind
 * the scenes.
 * @param {BasicInformationProps} -- object with the following properties
 * @first basicInformationForm -- this is the object returned by the Formik
 * hook, and it contains all the required field.
 * @second resource -- this is an array that will holds the information
 * that the user will add to the resources table
 * @third fsaInfo -- this is a map with the already known information fetched
 * from sharepoint
 * @fourth {onRowAdd}, {onRowUpdate}, {onRowDelete} -- these are functions
 * to handle the changes that the use will make for the resource tabel, e.i
 * adding, updating and deleting rows.
 * @fifth {costControllerVerIsOpen} {onCostControllerVerClose} -- this is a
 * boolean state and a function to track if the cost controller verification
 * Modal is open or not.
 * @return {JSX.Element}
 */
const BasicInformation: React.FC<BasicInformationProps> = ({
	basicInformationForm,
	resources,
	fsaInfo,
	loadingData,
	onRowAdd,
	onRowUpdate,
	onRowDelete,
	costControllerVerIsOpen,
	onCostControllerVerClose,
	phase,
}: BasicInformationProps): JSX.Element => {
	const editExpensesColumn = useCallback(editExpenses, [resources]);
	const editCommentsColumn = useCallback(editComments, [resources]);
	const { values, handleSubmit } = basicInformationForm;

	/**
	 * The effect to track the value of Cost Controller, whenever
	 * the prjectTitle is changed we should set the costController
	 * to an empty string in order to satisfy the update condition
	 * in CostController component.
	 */
	useEffect(() => {
		values.costController = '';
	}, [values.projectTitle]); /* eslint-disable-line */
	/**
	 * Render the MyCircularProgress instead of the BasicInformation page
	 * when the data still loading
	 */
	if (loadingData) return <MyCircularProgress color='primary' />;

	return (
		<>
			<Typography
				align='center'
				variant='h5'
				component='h1'
				style={{ marginBottom: '4rem' }}>
				<CreateIcon fontSize='inherit' />
				New Request Form
			</Typography>
			<form noValidate autoComplete='off'>
				<Grid container rowSpacing={5}>
					{/* eslint-disable-next-line */}
					{/* The first grid container for "Task Order Category", "Project Title" and "Category" */}
					<Grid container item spacing={6}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Task Order Category</Typography>
							<MySelect
								basicInformationForm={basicInformationForm}
								selectInfo={basicInformationFields.taskOrderCategory}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Project Title</Typography>
							<MySelect
								basicInformationForm={basicInformationForm}
								selectInfo={{
									...basicInformationFields.projectTitle,
									items: fillItemsWithFetchedData(
										constructProjectsTitle(
											fsaInfo.get('projectNumber') as string[],
											fsaInfo.get('projectName') as string[],
										)),
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<MyRadioButtons
								basicInformationForm={basicInformationForm}
								radioInfo={basicInformationFields.categoryInfo}
							/>
						</Grid>
					</Grid>
					{/* eslint-disable-next-line */}
					{/* --------------------------------- end of the first container ---------------------------- */}
					{/**
					  * The second grid container for "is There a work order? & is there
					  * expenses?", "Office" and "contract Type"
					  * */}
					<Grid container item spacing={6}>
						{/* eslint-disable-next-line */}
						{/* The first sub grid container for "is There a work order?" and "is there expenses?" */}
						<Grid container item xs={12} sm={6} md={4} direction='column'>
							<Grid item>
								<MyCheckBox
									basicInformationForm={basicInformationForm}
									checkBoxInfo={basicInformationFields.isThereWorkOrder}
								/>
							</Grid>
							<Grid item>
								<MyCheckBox
									basicInformationForm={basicInformationForm}
									checkBoxInfo={basicInformationFields.isThereExpenses}
								/>
							</Grid>
						</Grid>
						{/* eslint-disable-next-line */}
						{/*------------------------------- end of the first sub grid container --------------- */}
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Office</Typography>
							<MySelect
								basicInformationForm={basicInformationForm}
								selectInfo={{
									...basicInformationFields.officeInfo,
									items: fillItemsWithFetchedData(['Netherlands', 'Spain']),
								}}
							/>
						</Grid>
						{/**
						 * The second sub grid container for "Contract Type" and
						 * "Are Expenses Billable to the client?" in case we have expenses
						 **/}
						<Grid container item xs={12} sm={6} md={4}>
							<Grid item>
								<MyRadioButtons
									basicInformationForm={basicInformationForm}
									radioInfo={basicInformationFields.contractTypeInfo}
								/>
							</Grid>
						</Grid>
						{/* eslint-disable-next-line */}
						{/*-------------------------- End of the second sub container ---------------------------------- */}
					</Grid>
					{/* eslint-disable-next-line */}
					{/*------------------------------ End of the second container -------------------------------------- */}
					{/**
					 * The Third conditional grid container for "Payment Terms",
					 * the condition to render it's when the contract type is lump sum
					 * */}
					{
						(values.toContractType === 'lump sum') &&
						<Grid container item xs={12} sm={12} md={12}>
							<MyTextField
								basicInformationForm={basicInformationForm}
								textFieldInfo={basicInformationFields.paymentTerms}
							/>
						</Grid>
					}
					{/* eslint-disable-next-line */}
					{/*---------------------------- End of the third conditional container-------------------------------- */}
					{/* eslint-disable-next-line */}
					{/* The third grid container for "Period", "Path" and "Service description" */}
					<Grid container item spacing={6}>
						{/* The first sub container for "Start date" and "End date"*/}
						<Grid
							container
							item
							xs={12}
							sm={6}
							md={4}
							direction='column'
							rowSpacing={2}>
							<Grid item>
								<Typography variant='h6'>Period</Typography>
								<MyTextField
									basicInformationForm={basicInformationForm}
									textFieldInfo={basicInformationFields.startDateField}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={basicInformationForm}
									textFieldInfo={basicInformationFields.endDateField}
								/>
							</Grid>
						</Grid>
						{/* eslint-disable-next-line */}
						{/*------------------- End of the first sub container --------------- */}
						{/* The second sub container for "Departure" and "Destination" */}
						<Grid
							container
							item
							xs={12}
							sm={6}
							md={4}
							direction='column'
							rowSpacing={2}>
							<Grid item>
								<Typography variant='h6'>Path</Typography>
								<MyTextField
									basicInformationForm={basicInformationForm}
									textFieldInfo={basicInformationFields.departureField}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={basicInformationForm}
									textFieldInfo={basicInformationFields.destinationField}
								/>
							</Grid>
						</Grid>
						{/* eslint-disable-next-line */}
						{/*------------------ End of the second sub container ------------------------ */}
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Service description</Typography>
							<MyTextField
								basicInformationForm={basicInformationForm}
								textFieldInfo={basicInformationFields.serviceDescription}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
					</Grid>
					{/* eslint-disable-next-line */}
					{/*------------------------------- End of the third container ---------------------------------- */}
				</Grid>
				<DragTable
					title='Resources'
					data={resources}
					columns={[...basicInformationFields.resources, {
						field: 'expenses',
						title: 'Expenses',
						editable: 'always',
						type: 'boolean',
						initialEditValue: false,
						editComponent: editExpensesColumn,
					},
					{
						field: 'comments',
						title: 'Comments',
						editable: 'always',
						type: 'string',
						cellStyle: {
							width: 300,
							minWidth: 300,
						},
						headerStyle: {
							width: 300,
							minWidth: 300,
						},
						editComponent: editCommentsColumn,
					},
					]}
					onRowAdd={(phase === FSA_PHASE.first) ? onRowAdd : undefined}
					onRowUpdate={(phase === FSA_PHASE.first) ? onRowUpdate : undefined}
					onRowDelete={(phase === FSA_PHASE.first) ? onRowDelete : undefined}
					exportButton
					hideDropZone
				/>
				{/* eslint-disable-next-line */}
				{/* This is the cost controller Modal it will be opened when the user submit the form */}
				<CardModal
					cardModalIsOpen={(phase === FSA_PHASE.first)
						? costControllerVerIsOpen : false}
					onClose={onCostControllerVerClose}
					content={values.costController}
					title='Cost Controller Verification'
					buttonsProps={{
						leftButton: { ...COST_CONTROLLER_MODAL_LEFT_BUTTON },
						rightButton: { ...COST_CONTROLLER_MODAL_RIGHT_BUTTON },
					}}
					checkForContent={false}>
					<CostControllerVerification
						basicInformationForm={basicInformationForm}
						fsaInfo={fsaInfo}
					/>
					<></>
				</CardModal>
			</form>
			<div
				style={{
					float: 'right',
					marginTop: '1rem',
					marginBottom: '5rem',
				}}>
				<Button
					variant='contained'
					color='primary'
					endIcon={<NavigateNextIcon />}
					type='submit'
					onClick={() => handleSubmit()}>
					Next
				</Button>
			</div>
		</>
	);
};

export default BasicInformation;
