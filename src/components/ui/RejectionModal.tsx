import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { MDBBtn } from 'mdbreact';
import { BeatLoader } from 'react-spinners';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import $SP from 'sharepointplus';

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

// Modal to reject a request
const RejectionModal: React.FC<Props> = ({
	open,
	onClose,
	framework,
	psaId,
	...props
}) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const sp = $SP();

	const { handleChange, handleBlur, handleSubmit, errors, values } =
		useFormik<{
			rejectionReason: string;
			comment: string;
		}>({
			initialValues: {
				rejectionReason: '',
				comment: '',
			},
			onSubmit: async (values) => {
				try {
					setLoading(true);

					// update task order on sharepoint
					await sp
						.list(`Dataflow`, process.env.REACT_APP_BASE_URL)
						.update(
							{ isApproved: 'No', status: 'inactive' },
							{ where: `customID = '${psaId}'` },
						);

					await sp.list(`Timelines`, process.env.REACT_APP_BASE_URL).add({
						createdAt: new Date().toLocaleString(),
						description: 'Rejected Request',
						requestId: psaId,
						framework,
						color: 'danger-color',
						icon: 'times',
					});
					toast.success('Rejected request successfully');
					setLoading(false);
					// IMPORTANT: //!history is missing in props validation
					(props as any).history.replace('/psa/my-requests'); // eslint-disable-line 
				} catch (error) {
					setLoading(false);
					toast.error('Rejection of request failed,try again later');
				}
			},
			validationSchema: Yup.object({
				comment: Yup.string(),
				rejectionReason: Yup.string().required(),
			}),
		});

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>Reject This PSA Request?</DialogTitle>
			<DialogContent>
				<form className={classes.textSection} onSubmit={handleSubmit}>
					<TextField
						name='rejectionReason'
						className={classes.textField}
						multiline
						error={!!errors.rejectionReason}
						value={values.rejectionReason}
						onChange={handleChange}
						onBlur={handleBlur}
						rows={3}
						label='Rejection Reason'
						placeholder='Reasons for rejecting this request'
						disabled={loading}
					/>
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
					<MDBBtn color='danger' disabled={loading} type='submit'>
						{loading ? <BeatLoader color='#002e82' /> : 'Submit'}
					</MDBBtn>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default RejectionModal;
