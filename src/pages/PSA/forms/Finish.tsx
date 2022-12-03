import React from 'react';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BeatLoader } from 'react-spinners';

interface Props {
	handlePrevious: Function;
	formik: any;
	loading: boolean;
}

const useStyles = makeStyles((theme) => ({
	btnDiv: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: '2rem',
	},
	title: {
		fontWeight: 600,
		textAlign: 'center',
	},
	para: {
		textAlign: 'center',
		fontWeight: 100,
	},
	form: {
		width: '48%',
		margin: '0 auto',

		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
	},
	field: {
		marginTop: '1rem',
	},
}));

// final step page
const Finish: React.FC<Props> = ({ handlePrevious, formik, loading }) => {
	const {
		handleChange,
		values,
		errors,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = formik;
	const classes = useStyles();

	const setBumChanged = (e: any) => {
		setFieldValue('business_unit_manager', e.target.value);
		setFieldValue('name', 'Vere Pascal');
		setFieldValue('email', 'vere@pascal.com');
	};

	return (
		<div>
			<h3 className={classes.title}>Business Unit Manager Choice</h3>
			<form onSubmit={handleSubmit} className={classes.form}>
				<p className={classes.title}>
					Choose the business unit manager from the list below
				</p>
				<TextField
					name='business_unit_manager'
					select
					label='Business Unit Manager'
					fullWidth
					className={classes.field}
					onChange={setBumChanged}
					onBlur={handleBlur}
					value={values.business_unit_manager}
					error={!!errors.business_unit_manager}>
					<MenuItem value='Vere, Pascal'>Vere, Pascal</MenuItem>
				</TextField>
				<TextField
					name='name'
					label='Name'
					fullWidth
					disabled
					className={classes.field}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.name}
					error={!!errors.name}
				/>
				<TextField
					name='email'
					label='email'
					type='email'
					fullWidth
					disabled
					onChange={handleChange}
					className={classes.field}
					onBlur={handleBlur}
					value={values.email}
					error={!!errors.email}
				/>
			</form>

			<div className={classes.btnDiv}>
				<MDBBtn
					rounded
					outline
					color='dark'
					onClick={() => handlePrevious()}
					disabled={loading}>
					Previous
				</MDBBtn>
				<MDBBtn
					rounded
					outline
					type='submit'
					onClick={() => handleSubmit()}
					color='success'
					disabled={loading}>
					{loading ? <BeatLoader /> : 'Submit'}
				</MDBBtn>
			</div>
		</div>
	);
};

export default Finish;
