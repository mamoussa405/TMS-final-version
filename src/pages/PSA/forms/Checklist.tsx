/* eslint-disable */
import React from 'react';
import {
	Checkbox,
	FormControlLabel,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { MDBBtn } from 'mdb-react-ui-kit';

interface Props {
	handlePrevious: Function;
	checklistForm: any;
}

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: 600,
		textAlign: 'center',
	},
	flex: {
		borderBottom: '1px solid #ccc',
		marginBottom: '2rem',
		display: 'flex',
		alignItems: 'center',

		'& > div': {
			width: '100%',
			margin: '2rem',
		},
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	btnDiv: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '2rem',
	},
	control: {
		margin: 0,
		padding: 0,
	},
}));

// steps checklist page
const Checklist: React.FC<Props> = ({ handlePrevious, checklistForm }) => {
	const classes = useStyles();

	const {
		handleBlur,
		handleChange,
		handleSubmit,
		values,
		errors,
		setFieldValue,
	} = checklistForm;

	return (
		<div>
			<h3 className={classes.title}>Task Order Checklist</h3>
			<form onSubmit={handleSubmit}>
				<div className={classes.flex}>
					<div>
						<FormControlLabel
							label='Is it a TO with a Jacobs office of PSAs?'
							control={<Checkbox color='primary' />}
							checked={values.is_it_a_to_with_a_jacobs_office}
							onChange={(_, val) =>
								setFieldValue(
									'is_it_a_to_with_a_jacobs_office',
									val,
								)
							}
							className={classes.control}
						/>
						<FormControlLabel
							label='If yes, is the person billable?'
							control={<Checkbox color='primary' />}
							checked={values.isThePersonBillable}
							disabled={!values.is_it_a_to_with_a_jacobs_office}
							onChange={(_, val) =>
								setFieldValue('isThePersonBillable', val)
							}
							className={classes.control}
						/>
						<FormControlLabel
							label='If not, GM authorization must be attached'
							control={<Checkbox color='primary' />}
							checked={values.gmAuthorizationMustBeAttached}
							disabled={!!values.is_it_a_to_with_a_jacobs_office}
							onChange={(_, val) =>
								setFieldValue(
									'gmAuthorizationMustBeAttached',
									val,
								)
							}
							className={classes.control}
						/>
					</div>
					<div>
						<TextField
							name='first_note'
							value={values.first_note}
							multiline
							label='Note'
							fullWidth
							minRows={4}
							maxRows={4}
							error={!!errors.first_note}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<div className={classes.flex}>
					<div>
						<FormControlLabel
							label='Are the rates verified? Explain verification method in the notes' // eslint-disable-line
							control={<Checkbox color='primary' />}
							className={classes.control}
							checked={values.areRatesVerified}
							onChange={(_, val) =>
								setFieldValue('areRatesVerified', val)
							}
						/>
						<FormControlLabel
							label='Are the expenses included? Explain basis for calculation on attached spreadsheet' // eslint-disable-line
							control={<Checkbox color='primary' />}
							className={classes.control}
							checked={values.areExpensesIncluded}
							onChange={(_, val) =>
								setFieldValue('areExpensesIncluded', val)
							}
						/>
						<FormControlLabel
							label='Have the multipliers been verified by country and office?'
							control={<Checkbox color='primary' />}
							className={classes.control}
							checked={values.haveTheMultipliersBeenVerified}
							onChange={(_, val) =>
								setFieldValue(
									'haveTheMultipliersBeenVerified',
									val,
								)
							}
						/>
						<FormControlLabel
							label='Is the office location verified?'
							control={<Checkbox color='primary' />}
							className={classes.control}
							checked={values.isTheOfficeLocationVerified}
							onChange={(_, val) =>
								setFieldValue(
									'isTheOfficeLocationVerified',
									val,
								)
							}
						/>
						<FormControlLabel
							label='Are the WBS codes confirmed and open in accounting?'
							control={<Checkbox color='primary' />}
							className={classes.control}
							checked={values.areTheWbsCodesConfirmed}
							onChange={(_, val) =>
								setFieldValue(
									'areTheWbsCodesConfirmed',
									val,
								)
							}
						/>
					</div>
					<div>
						<TextField
							name='last_note'
							multiline
							label='Note'
							fullWidth
							minRows={7}
							maxRows={7}
							value={values.last_note}
							error={!!errors.last_note}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
			</form>
			<div className={classes.btnDiv}>
				<MDBBtn
					type='submit'
					rounded
					outline
					color='dark'
					onClick={() => handlePrevious()}>
					Previous
				</MDBBtn>
				<MDBBtn
					type='submit'
					rounded
					outline
					color='dark'
					onClick={() => handleSubmit()}>
					Next
				</MDBBtn>
			</div>
		</div>
	);
};

export default Checklist;
