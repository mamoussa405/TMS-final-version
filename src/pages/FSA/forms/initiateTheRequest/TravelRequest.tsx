import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FlightIcon from '@mui/icons-material/Flight';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import MyTextField from '../../../../components/forms/MyTextField';
import MySelect from '../../../../components/forms/MySelect';
import MyRadioButtons from '../../../../components/forms/MyRadioButtons';
import MyCheckBox from '../../../../components/forms/MyCheckBox';
import { TravelRequestProps } from '../../types/forms';
import travelRequest from '../../data/travelRequest';
import { getApplicantNames } from '../../utils/initTheRequest';

import '../../../../css/initTheRequest.css';

/**
 * Renders the TravelRequest page.
 * @param {TravelRequestProps} -- Object with the following props:
 * @first travelRequestForm -- The Formik form to manage the TravelRequest
 * fields states.
 * @second alreadyFilledData -- This will be an object with the already
 * filled data in the expression of the needs phase.
 * @third resources -- These are the already filled resources in the
 * expression of the needs phase.
 * @fourth onTravelRequestBackClick -- The function handler for the Back
 * button click event.
 * @return {JSX.Element}
 */
const TravelRequest: React.FC<TravelRequestProps> = ({
	travelRequestForm,
	alreadyFilledData,
	resources,
	onTravelRequestBackClick,
	submitting,
}: TravelRequestProps): JSX.Element => {
	const { values, handleSubmit } = travelRequestForm;

	return (
		<>
			<Typography
				align='center'
				variant='h5'
				component='h1'
				style={{ marginBottom: '4rem' }}>
				<FlightIcon fontSize='inherit' />
				Travel Request
			</Typography>
			<form noValidate autoComplete='off'>
				<Grid container rowSpacing={5}>
					{/* the Grid container for the 'Department' and 'Applicant Names'  */} {/* eslint-disable-line */}
					<Grid container item spacing={6}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Department</Typography>
							<MyTextField
								basicInformationForm={travelRequestForm}
								textFieldInfo={travelRequest.department}
								value={alreadyFilledData.taskOrderCategory}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={8}>
							<Typography variant='h6'>Applicant Names</Typography>
							<MyTextField
								basicInformationForm={travelRequestForm}
								textFieldInfo={travelRequest.applicantNames}
								value={getApplicantNames(resources)}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the Grid container ------------- */} {/* eslint-disable-line */}
					{/* The Grid container for the 'Project Name', 'Are expenses billable',*/} {/* eslint-disable-line */}
					{/* 'phase', 'site' and 'Period'*/} {/* eslint-disable-line */}
					<Grid container item spacing={6}>
						{/* The Grid sub container for the 'Project Name' and 'Are expenses billable' */} {/* eslint-disable-line */}
						<Grid
							container
							item
							direction='column'
							spacing={2}
							xs={12} sm={6} md={4}>
							<Grid item>
								<Typography variant='h6'>Project Name</Typography>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={travelRequest.projectName}
									value={alreadyFilledData.projectName}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
							<Grid item>
								<MyRadioButtons
									basicInformationForm={travelRequestForm}
									radioInfo={travelRequest.areExpensesBillable}
								/>
							</Grid>
						</Grid>
						{/* ---------------------- End of the Grid sub container ------------- */} {/* eslint-disable-line */}
						{/* The Grid sub container for the 'Phase' and 'Site' */} {/* eslint-disable-line */}
						<Grid
							container
							item
							direction='column'
							spacing={3}
							xs={12} sm={6} md={4}>
							<Grid item>
								<Typography variant='h6'>Phase</Typography>
								<MySelect
									basicInformationForm={travelRequestForm}
									selectInfo={travelRequest.phase}
								/>
							</Grid>
							<Grid item>
								<Typography variant='h6'>Site</Typography>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={travelRequest.site}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
						</Grid>
						{/* ---------------------- End of the Grid sub container ------------- */} {/* eslint-disable-line */}
						{/* The Grid sub container for the 'Period'*/} {/* eslint-disable-line */}
						<Grid
							container
							item
							direction='column'
							spacing={7}
							xs={12} sm={6} md={4}>
							<Grid item>
								<Typography variant='h6'>Period</Typography>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={travelRequest.startDateField}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={travelRequest.endDateField}
								/>
							</Grid>
						</Grid>
						{/* ---------------------- End of the Grid sub container ------------- */} {/* eslint-disable-line */}
					</Grid>
					{/* ---------------------- End of the Grid container ------------- */} {/* eslint-disable-line */}
					{/* The Grid container for the 'Subject'*/} {/* eslint-disable-line */}
					<Grid container item spacing={6}>
						<Grid item xs={12} sm={12} md={12}>
							<Typography variant='h6'>Subject</Typography>
							<MyTextField
								basicInformationForm={travelRequestForm}
								textFieldInfo={travelRequest.subject}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the Grid container ------------- */} {/* eslint-disable-line */}
					{/* The Grid container for the 'Expense Estimation' and 'Expenses Estimation Amount'*/} {/* eslint-disable-line */}
					<Grid container item spacing={6}>
						{/* The Grid sub container for the 'Expense Estimation'*/} {/* eslint-disable-line */}
						<Grid
							container
							item
							direction='column'
							spacing={1}
							xs={12} sm={6} md={6}>
							<Typography variant='h6'>Expense Estimation</Typography>
							<Grid item>
								<MyCheckBox
									basicInformationForm={travelRequestForm}
									checkBoxInfo={travelRequest.expenseEstimation.airfare}
								/>
							</Grid>
							<Grid item>
								<MyCheckBox
									basicInformationForm={travelRequestForm}
									checkBoxInfo={
										travelRequest.expenseEstimation.hotelMeal_DailyAllowances}
								/>
							</Grid>
							<Grid item>
								<MyCheckBox
									basicInformationForm={travelRequestForm}
									checkBoxInfo={travelRequest.expenseEstimation.transportation}
								/>
							</Grid>
							<Grid item>
								<MyCheckBox
									basicInformationForm={travelRequestForm}
									checkBoxInfo={travelRequest.expenseEstimation.miscellaneous}
								/>
							</Grid>
						</Grid>
						{/* ---------------------- End of the Grid sub container ------------- */} {/* eslint-disable-line */}
						{/* The Grid sub container for the 'Expenses Estimation Amount'*/} {/* eslint-disable-line */}
						<Grid
							container
							item
							direction='column'
							spacing={1}
							xs={12} sm={6} md={6}>
							<Typography variant='h6'>Expenses Estimation Amount</Typography>
							<Grid item>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={{
										...travelRequest.expensesEstimationAmount.airfare,
										disabled: !values.airfare,
									}}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={{
										...travelRequest.expensesEstimationAmount
											.hotelMeal_DailyAllowances,
										disabled: !values.hotelMeal_DailyAllowances,
									}}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={{
										...travelRequest.expensesEstimationAmount.transportation,
										disabled: !values.transportation,
									}}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={travelRequestForm}
									textFieldInfo={{
										...travelRequest.expensesEstimationAmount.miscellaneous,
										disabled: !values.miscellaneous,
									}}
									additionalStyles={{
										'& legend': { display: 'none' },
										'& fieldset': { top: 0 },
									}}
								/>
							</Grid>
						</Grid>
						{/* ---------------------- End of the Grid sub container ------------- */} {/* eslint-disable-line */}
					</Grid>
					{/* ---------------------- End of the Grid container ------------- */} {/* eslint-disable-line */}
				</Grid>
				<div style={{ marginTop: '2rem' }}>
					<p>
						N.B.: Please attach the mail of OCP approval to all invoices
						billable to the Client.
					</p>
					<p>
						* Excluding any recreational activities
					</p>
					<p>
						** Costs necessary for mobilization
					</p>
				</div>
			</form>
			<div className='navigation-buttons-div'>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					startIcon={<NavigateBeforeIcon />}
					type='submit'
					onClick={() => onTravelRequestBackClick()}>
					Back
				</Button>
				<Button
					disabled={submitting}
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

export default TravelRequest;
