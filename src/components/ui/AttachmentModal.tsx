import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	TextField,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { MDBBtn } from 'mdb-react-ui-kit';

interface Props {
	open: boolean;
	onClose: () => void;
	formik: any;
	supportedFiles?: string[];
	onDrop?: (files: File[]) => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
	dropzone: {
		padding: '1rem 2rem',
		border: '1px dashed #000',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		background: '#eee',
	},
}));

// Form for adding attachments to psa
const AttachmentModal: React.FC<Props> = ({
	open,
	onClose,
	formik,
	supportedFiles,
	onDrop,
}) => {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		accept: supportedFiles?.join(','),
		onDrop,
		maxFiles: 1,
	});
	const classes = useStyles();
	const { values, errors, handleChange, handleSubmit, handleBlur } = formik;
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Attach A Document</DialogTitle>
			<DialogContent>
				<div {...getRootProps({ className: classes.dropzone })}>
					<input {...getInputProps()} />
					{acceptedFiles.length ? (
						<strong>{acceptedFiles[0].name}</strong>
					) : (
						<strong>Add attachment here</strong>
					)}
				</div>
				<form>
					<TextField
						name='file_title'
						fullWidth
						value={values.file_title}
						label='Title'
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!errors.file_title}
					/>
					<TextField
						name='version'
						fullWidth
						value={values.version}
						label='Version'
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!errors.version}
					/>
					<TextField
						name='comment'
						fullWidth
						multiline
						minRows={3}
						maxRows={3}
						value={values.comment}
						label='Comment'
						onChange={handleChange}
						onBlur={handleBlur}
						error={!!errors.comment}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<MDBBtn
					rounded
					type='submit'
					color='success'
					onClick={() => {
						handleSubmit();
						onClose();
					}}>
					Submit
				</MDBBtn>
			</DialogActions>
		</Dialog>
	);
};

export default AttachmentModal;
