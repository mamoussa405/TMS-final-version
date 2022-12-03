import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BeatLoader } from 'react-spinners';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import $SP from 'sharepointplus';
import * as Yup from 'yup';
interface Props {
	open: boolean;
	onClose: () => void;
	psaId: string;
	framework: string;
}

const useStyles = makeStyles((theme) => ({
	buttons: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textSection: {
		display: 'flex',
		flexDirection: 'column',
	},
	textField: {
		margin: '1rem',
	},
}));

// Modal for approving a psa request
const ApprovalModal: React.FC<Props> = ({
	open,
	onClose,
	framework,
	psaId,
	...props
}) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const sp = $SP();

	// for handling form state
	const { handleChange, handleBlur, handleSubmit, errors, values } =
		useFormik<{
			comment: string;
		}>({
			initialValues: {
				comment: '',
			},
			onSubmit: async (values) => {
				try {
					setLoading(true);

					// update task order on sharepoint
					await sp
						.list(`Dataflow`, process.env.REACT_APP_BASE_URL)
						.update(
							{ isApproved: 'Yes', status: 'inactive' },
							{ where: `customID = '${psaId}'` },
						);

					// add approval of task to timeline.
					await sp.list(`Timelines`, process.env.REACT_APP_BASE_URL).add({
						createdAt: new Date().toLocaleString(),
						description: 'Approved Request',
						requestId: psaId,
						framework,
						icon: 'check',
						color: 'success-color',
					});
					toast.success('Accepted request successfully');
					setLoading(false);
					// IMPORTANT: //!history is missing in props validation
					(props as any).history.replace('/psa/my-requests'); // eslint-disable-line 
				} catch (error) {
					toast.error('Approval of request failed, please try again');
					setLoading(false);
				}
			},
			validationSchema: Yup.object({
				comment: Yup.string(),
			}),
		});

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>Accept This PSA Request?</DialogTitle>
			<DialogContent>
				<form className={classes.textSection} onSubmit={handleSubmit}>
					<TextField
						name='comment'
						className={classes.textField}
						multiline
						error={!!errors.comment}
						value={values.comment}
						onChange={handleChange}
						onBlur={handleBlur}
						rows={3}
						label='Comment'
						placeholder='Comments(Optional)'
						disabled={loading}
					/>
					<MDBBtn color='success' disabled={loading} type='submit'>
						{loading ? <BeatLoader color='#4b0082' /> : 'Submit'}
					</MDBBtn>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ApprovalModal;
