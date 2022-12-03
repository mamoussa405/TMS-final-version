import { useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import MyTextField from '../../../../components/forms/MyTextField';
import MySelect from '../../../../components/forms/MySelect';
import gatherInputs from '../../data/gatherInputs';
import { GatherInputsProps, GatherInputsMultipliers } from '../../types/forms';
import HoursSplit from './HoursSplit';
import useFetchFSAListItems from '../../../../hooks/useFetchFSAListItems';
import { gatherInputsMultipliersFields } from '../../data/sharepointFields';
import MyCircularProgress from '../../../../components/ui/MyCircularProgress';

import '../../../../css/initTheRequest.css';

/**
 * Renders the GatherInputs page.
 * @param {GatherInputsProps} -- Object with the following props:
 * @first gatherInputsForm -- The Formik form to manage the Gather Inputs
 * fields states.
 * @second alreadyFilledData -- This will be an object with the already
 * filled data in the expression of the needs phase.
 * @third resources -- These are the already filled resources in the
 * expression of the needs phase and the resources step (init the request phase)
 * @fourth onGatherInputsBackClick -- The function handler for the Back
 * button click event.
 * @fifth submitting -- The boolean to let us know if we are submitting data
 * to sharepoint or not, it will help enable and disable the Next and Back
 * buttons
 * @return {JSX.Element}
 */
const GatherInputs: React.FC<GatherInputsProps> = ({
	gatherInputsForm,
	alreadyFilledData,
	resources,
	onGatherInputsBackClick,
	submitting,
}: GatherInputsProps): JSX.Element => {
	/**
	 * This part is for getting the multipliers from sharepoint,
	 * the QUERY will help us getting the multipliers for the selected
	 * office, and we will filter them depending on the framework later on.
	 */
	const QUERY = 'office = "' + alreadyFilledData.jacobsOffice + '"';
	const [multipliersData, loading] = useFetchFSAListItems(
		'pmt_multipliers',
		false,
		gatherInputsMultipliersFields,
		QUERY,
	);
	const { values, handleSubmit } = gatherInputsForm;

	/**
	 * This effect will fill in the multipliers that we will display for
	 * the user as disabled text fields, it will fill them depending on
	 * the framework they rely to.
	 */
	useEffect(() => {
		for (const row of (multipliersData as GatherInputsMultipliers[])) {
			if (row.type === 'FSA') {
				values.multipliers_MT_COST = +row.MT_COST;
				values.multipliers_ODC = +row.ODC;
				values.multipliers_LDC = +row.LDC;
				values.multipliers_ADC = +row.ADC;
				values.multipliers_EDC = +row.EDC;
			} else if (row.type === 'FSA Agency') {
				values.multipliersFSAAgency_MT_COST = +row.MT_COST;
				values.multipliersFSAAgency_ODC = +row.ODC;
				values.multipliersFSAAgency_LDC = +row.LDC;
				values.multipliersFSAAgency_ADC = +row.ADC;
				values.multipliersFSAAgency_EDC = +row.EDC;
			}
		}
	}, [multipliersData]); /*eslint-disable-line*/

	/**
	 * Render a Circular progress when the data is loading from
	 * sharepoint.
	 */
	if (loading) {
		return <MyCircularProgress color='primary' />;
	}
	return (
		<>
			<Typography
				align='center'
				variant='h5'
				component='h1'
				style={{ marginBottom: '4rem' }}>
				<KeyboardIcon fontSize='inherit' />
				Gather Inputs
			</Typography>
			<form noValidate autoComplete='off'>
				<Grid container rowSpacing={5} >
					{/* The grid container for the 'Project Name', 'Project Number' and 'Revision NO.' */} {/* eslint-disable-line */}
					<Grid container item spacing={6}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Project Name</Typography>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.projectName}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Project Number</Typography>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.projectNumber}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Revision No.</Typography>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.revisionNo}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the grid container ------------- */} {/* eslint-disable-line */}
					{/* The grid container for the 'Office', 'Framework' */}
					<Grid container item spacing={6}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Office</Typography>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.office}
								additionalStyles={{
									'& legend': { display: 'none' },
									'& fieldset': { top: 0 },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Typography variant='h6'>Framework</Typography>
							<MySelect
								basicInformationForm={gatherInputsForm}
								selectInfo={gatherInputs.framework}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the grid container ------------- */}
					{/* The grid container for the 'FSA multipliers' */}
					<Typography variant='h6' style={{ marginTop: '40px' }}>
						Multipliers
					</Typography>
					<Grid container item spacing={3} style={{ paddingTop: '20px' }}>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliers.MT_COST}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliers.ODC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliers.LDC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliers.ADC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliers.EDC}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the grid container ------------- */}
					{/* The grid container for the 'FSA Agency multipliers' */}
					<Typography variant='h6' style={{ marginTop: '40px' }}>
						Multipliers FSA Agency
					</Typography>
					<Grid container item spacing={3} style={{ paddingTop: '20px' }}>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliersFSAAgency.MT_COST}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliersFSAAgency.ODC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliersFSAAgency.LDC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliersFSAAgency.ADC}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.multipliersFSAAgency.EDC}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the grid container ------------- */}
					{/* The grid container for the 'Expenses' */}
					<Typography variant='h6' style={{ marginTop: '40px' }}>
						Expenses
					</Typography>
					<Grid container item spacing={3} style={{ paddingTop: '20px' }}>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.expenses.WBSTaskCode}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2.4}>
							<MyTextField
								basicInformationForm={gatherInputsForm}
								textFieldInfo={gatherInputs.expenses.expenses}
							/>
						</Grid>
					</Grid>
					{/* ---------------------- End of the grid container ------------- */}
				</Grid>
				<HoursSplit resources={resources as any} formikValues={values} />
			</form>
			<div className='navigation-buttons-div'>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					startIcon={<NavigateBeforeIcon />}
					type='submit'
					onClick={() => onGatherInputsBackClick()}>
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

export default GatherInputs;
