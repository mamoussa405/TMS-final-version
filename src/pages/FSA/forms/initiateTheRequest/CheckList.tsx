import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import MyCheckbox from '../../../../components/forms/MyCheckBox';
import MyTextField from '../../../../components/forms/MyTextField';
import { CheckListProps } from '../../types/forms';
import checkList from '../../data/checkList';
import {
	getTotalHours,
	getTotalCost,
} from '../../utils/initTheRequest';

import '../../../../css/initTheRequest.css';

/**
 * Renders the CheckList page.
 * @param {CheckListProps}  -- Object with the following props:
 * @first checkListForm -- The Formik form to manage the Check List fields
 * states.
 * @second resources -- These are the already filled resources in the expression
 * of needs phase, the resources step and the gather inputs step
 * (init the request phase).
 * @third expenses -- These are the expenses that the user filled in the gather
 * inputs step, we will add it to the total cost after calculating it.
 * @fourth onCheckListBackClick -- The function handler for the Back Button
 * click event.
 * @fifth submitting -- The boolean to let us know if we are submitting data
 * to sharepoint or not, it will help us enable and disable the Next and Back
 * buttons
 * @return {JSX.Element}
 */
const CheckList: React.FC<CheckListProps> = ({
	checkListForm,
	resources,
	expenses,
	onCheckListBackClick,
	submitting,
}: CheckListProps): JSX.Element => {
	/**
	 * The state that will store the total hours after calculating it
	 */
	const [totalHours, setTotalHours] = useState<number>(0);
	/**
	 * The state that will store the total cost after calculating it
	 */
	const [totalCost, setTotalCost] = useState<number>(0);
	const { values, handleSubmit } = checkListForm;
	const remainingSchedule = values.allocatedBudgetInWOSchedule -
		(values.allPreviousTOsSchedule + totalHours);
	const remainingCost = values.allocatedBudgetInWOCost -
		(values.allPreviousTOsCost + totalCost);

	/**
	 * Add the values to the form after calculating them
	 */
	values.actualTOSchedule = totalHours;
	values.actualTOCost = totalCost;
	values.remainingSchedule = remainingSchedule;
	values.remainingCost = remainingCost;
	useEffect(() => {
		setTotalHours(getTotalHours(resources));
		setTotalCost(getTotalCost(resources, expenses));
	}, [resources]); /* eslint-disable-line */

	return (
		<>
			<Typography
				align='center'
				variant='h5'
				component='h1'
				style={{ marginBottom: '4rem' }}>
				<PlaylistAddCheckIcon />
				CheckList
			</Typography>
			<form noValidate autoComplete='off'>
				<Grid container rowSpacing={5}>
					{/* The grid container for the check list part and the 'notes' */}
					<Grid container item>
						<Grid item xs={12} sm={6}>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={checkList.isThereSignedWorkOrder.main}
							/>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={
									checkList.isThereSignedWorkOrder.yesIsThereDeviation}
							/>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={checkList.isThereSignedWorkOrder
									.noIsClientAuthorizationAttached}
							/>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={checkList.isThereSignedWorkOrder
									.noIsGMAuthorizationAttached}
							/>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={checkList.ifThereIsNoWOIsItBDorJAT.main}
							/>
							<MyCheckbox
								basicInformationForm={checkListForm}
								checkBoxInfo={checkList.ifThereIsNoWOIsItBDorJAT
									.noGMAuthorizationMustBeAttached}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='h6'>
								Notes
							</Typography>
							<MyTextField
								basicInformationForm={checkListForm}
								textFieldInfo={checkList.notes}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
					</Grid>
					{/* End of the first grid container */}
				</Grid>
				<Typography variant='h6' style={{
					marginTop: '5rem',
					marginBottom: '1rem',
				}}>
					Planned Values
				</Typography>
				<Grid container spacing={5}>
					{/* The first grid container for the 'planned values' */}
					<Grid container spacing={4} item>
						{/* The first grid sub container for the 'original WO' */}
						<Grid
							container
							spacing={2}
							direction='column'
							item
							xs={12}
							sm={6}
							md={4}>
							<Grid item>
								<Typography variant='subtitle1'
									style={{ marginBottom: '.5rem' }}>
									Original WO
								</Typography>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.originalWO.schedule}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.originalWO.cost}
								/>
							</Grid>
						</Grid>
						{/* End of the first grid sub container */}
						{/* The second grid sub container for 'allocated budget' */}
						<Grid
							container
							spacing={2}
							direction='column'
							item
							xs={12}
							sm={6}
							md={4}>
							<Grid item>
								<Typography variant='subtitle1'
									style={{ marginBottom: '.5rem' }}>
									TO allocated budget in the WO
								</Typography>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.allocatedBudgetInWO.schedule}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.allocatedBudgetInWO.cost}
								/>
							</Grid>
						</Grid>
						{/* End of the second grid sub container */}
						{/* The third grid sub container for 'all previous TOs' */}
						<Grid
							container
							spacing={2}
							direction='column'
							item
							xs={12}
							sm={6}
							md={4}>
							<Grid item>
								<Typography variant='subtitle1'
									style={{ marginBottom: '.5rem' }}>
									All previous TOs
								</Typography>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.allPreviousTOs.schedule}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.allPreviousTOs.cost}
								/>
							</Grid>
						</Grid>
						{/* End of the third grid sub container */}
					</Grid>
					{/* End of the first grid container */}
					{/* The second grid container for the 'Planned values' */}
					<Grid container spacing={4} item>
						{/* The first grid sub container for 'actual TO' */}
						<Grid
							container
							spacing={2}
							direction='column'
							item
							xs={12}
							sm={6}
							md={4}>
							<Grid item>
								<Typography variant='subtitle1'
									style={{ marginBottom: '.5rem' }}>
									Actual TO
								</Typography>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.actualTO.schedule}
									value={totalHours}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.actualTO.cost}
									value={totalCost}
								/>
							</Grid>
						</Grid>
						{/* End of the first grid sub container */}
						{/* The second grid sub container for 'remaining' */}
						<Grid
							container
							spacing={2}
							direction='column'
							item
							xs={12}
							sm={6}
							md={4}>
							<Grid item>
								<Typography variant='subtitle1'
									style={{ marginBottom: '.5rem' }}>
									Remaining
								</Typography>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.remaining.schedule}
									value={remainingSchedule}
								/>
							</Grid>
							<Grid item>
								<MyTextField
									basicInformationForm={checkListForm}
									textFieldInfo={checkList.remaining.cost}
									value={remainingCost}
								/>
							</Grid>
						</Grid>
						{/* End of the second grid sub container */}
					</Grid>
					{/* End of the second grid container */}
					{/* The third grid container for the 'deviation comments' */}
					<Grid container item>
						<Grid item md={12}>
							<Typography variant='subtitle1'
								style={{ marginBottom: '.5rem' }}>
								In case of deviation
							</Typography>
							<MyTextField
								basicInformationForm={checkListForm}
								textFieldInfo={checkList.deviationComments}
							/>
						</Grid>
					</Grid>
					{/* End of the third grid container */}
				</Grid>
			</form>
			<div className='navigation-buttons-div'>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					startIcon={<NavigateBeforeIcon />}
					type='submit'
					onClick={() => onCheckListBackClick()}>
					Back
				</Button>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					endIcon={<KeyboardArrowUpIcon />}
					type='submit'
					onClick={() => handleSubmit()}>
					Submit
				</Button>
			</div>
		</>
	);
};

export default CheckList;
