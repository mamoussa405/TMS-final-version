import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import {
	FormsUploadProps,
	MyDropzoneProps,
} from '../../types/forms';
import { MyFile } from '../../types/cummonTypes';

import '../../../../css/initTheRequest.css';

/**
 * Dropzone to handle the attachment upload
 * @param {MyDropzoneProps} -- Object with following props:
 * @first onFileDrop -- Call back to store the file in its appropriate
 * state.
 * @second fileName -- The file name
 * @return {JSX.Element}
 */
const MyDropzone: React.FC<MyDropzoneProps> = ({
	onFileDrop,
	fileName,
}: MyDropzoneProps): JSX.Element => {
	return (
		<Dropzone onDrop={(acceptedFiles) => {
			const reader = new FileReader();
			const ABORT_MESSAGE = 'File reading was aborted, ' +
				'Please try again or check with the IT team';
			const ERROR_MESSAGE = 'File reading has failed, ' +
				'Please try again or check with the IT team';

			reader.onabort = () => toast.error(ABORT_MESSAGE);
			reader.onerror = () => toast.error(ERROR_MESSAGE);
			reader.onload = () => {
				const binaryStr = reader.result;
				const fileObject: MyFile = {
					name: '',
					sharepointName: '',
					type: '',
					content: null };

				fileObject.name = acceptedFiles[0]['name'];
				fileObject.type = acceptedFiles[0]['type'];
				fileObject.content = binaryStr;
				onFileDrop(fileObject);
			};
			reader.readAsArrayBuffer(acceptedFiles[0]);
		}}>
			{({ getRootProps, getInputProps }) => (
				<section className='formupload-dropzone'>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{!fileName
							? <p>Allowed file extensions:.*</p>
							: <p>{fileName}</p>
						}
					</div>
				</section>
			)}
		</Dropzone >
	);
};

/**
 * Renders The FormsUpload page.
 * @param {FormsUploadProps} -- Object with the following props:
 * @first onFormsUploadSubmit -- The function handler for the data submittion
 * to sharepoint list.
 * @second onFormsUploadBackClick -- The function handler for the Back Button
 * click event.
 * @third submitting -- The boolean to let us know if we are submitting data
 * to sharepoint or not, it will help us enable and disable the Next and Back
 * buttons
 * @return {JSX}
 */
const FormsUpload: React.FC<FormsUploadProps> = ({
	onFormsUploadSubmit,
	onFormsUploadBackClick,
	submitting,
}: FormsUploadProps): JSX.Element => {
	/**
	 * State of @type {MyFile} which will store the info about
	 * uploaded files
	 */
	const [signedTravelRequest, setSignedTravelRequest] =
		useState<MyFile>();
	const [remainingBudget, setRemainingBudget] =
		useState<MyFile>();
	const [workOrderCopy, setworkOrderCopy] =
		useState<MyFile>();
	const [otherAttachment, setOtherAttachment] =
		useState<MyFile>();

	/**
	 * Call backs that will be called when a file is droped,e.i, uploaded,
	 * their role will be to form a sharepoint name for the file,
	 * the sharepiont name will be the name of the attachment in sharepoint
	 * list, after that the call back will store the file in its appropriate
	 * state.
	 * @param {MyFile} file -- Object with info about the uploaded file.
	 */
	const onSignedTravelRequestDrop = (file: MyFile) => {
		const sharepointName = 'signedTravelRequest.' +
		/**
		 * This substring will be the file extension
		 */
		file.name.substring(file.name.lastIndexOf('.') + 1);

		file.sharepointName = sharepointName;
		setSignedTravelRequest(file);
	};
	const onRemainingBudgetDrop = (file: MyFile) => {
		const sharepointName = 'remainingBudget.' +
		/**
		 * This substring will be the file extension
		 */
		file.name.substring(file.name.lastIndexOf('.') + 1);

		file.sharepointName = sharepointName;
		setRemainingBudget(file);
	};
	const onWorkOrderCopyDrop = (file: MyFile) => {
		const sharepointName = 'workOrderCopy.' +
		/**
		 * This substring will be the file extension
		 */
		file.name.substring(file.name.lastIndexOf('.') + 1);

		file.sharepointName = sharepointName;
		setworkOrderCopy(file);
	};
	const onOtherAttachmentDrop = (file: MyFile) => {
		const sharepointName = 'otherAttachment.' +
		/**
		 * This substring will be the file extension
		 */
		file.name.substring(file.name.lastIndexOf('.') + 1);

		file.sharepointName = sharepointName;
		setOtherAttachment(file);
	};

	return (
		<>
			<div style={{
				marginLeft: '25%',
				width: '50%',
			}}>
				<Typography
					align='center'
					variant='h5'
					component='h1'
					style={{ marginBottom: '4rem' }}>
					<AttachFileIcon fontSize='inherit' />
					Forms Upload
				</Typography>
				<p style={{ marginBottom: '2rem' }}>
					<strong>
						Please upload all necessary documents
					</strong>
				</p>
				<Grid container spacing={5}>
					{/* The first grid container for 'Signed Travel Request' file */}
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={5}>
							<Typography variant='subtitle1'>
								Signed Travel Request
							</Typography>
						</Grid>
						<Grid item xs={12} sm={7}>
							<MyDropzone
								onFileDrop={onSignedTravelRequestDrop}
								fileName={signedTravelRequest?.name} />
						</Grid>
					</Grid>
					{/* End of the first grid container */}
					{/* The second grid container for 'Remaining Budget' file  */}
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={5}>
							<Typography variant='subtitle1'>
								Remaining Budget*
							</Typography>
						</Grid>
						<Grid item xs={12} sm={7}>
							<MyDropzone
								onFileDrop={onRemainingBudgetDrop}
								fileName={remainingBudget?.name} />
						</Grid>
					</Grid>
					{/* End of the second grid container */}
					{/* The third grid container for 'Work Order Copy' file */}
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={5}>
							<Typography variant='subtitle1'>
								Work Order Copy*
							</Typography>
						</Grid>
						<Grid item xs={12} sm={7}>
							<MyDropzone
								onFileDrop={onWorkOrderCopyDrop}
								fileName={workOrderCopy?.name} />
						</Grid>
					</Grid>
					{/* End of the third grid container */}
					{/* The fourth grid container for 'Other Attachment' */}
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={5}>
							<Typography variant='subtitle1'>
								Other Attachment
							</Typography>
						</Grid>
						<Grid item xs={12} sm={7}>
							<MyDropzone
								onFileDrop={onOtherAttachmentDrop}
								fileName={otherAttachment?.name} />
						</Grid>
					</Grid>
					{/* End of the fourth grid container */}
				</Grid>
			</div>
			<div className='navigation-buttons-div'>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					startIcon={<NavigateBeforeIcon />}
					type='submit'
					onClick={() => onFormsUploadBackClick()}>
					Back
				</Button>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					endIcon={<NavigateNextIcon />}
					type='submit'
					onClick={() => onFormsUploadSubmit([
						signedTravelRequest as MyFile,
						remainingBudget as MyFile,
						workOrderCopy as MyFile,
						otherAttachment as MyFile,
					])}>
					Next
				</Button>
			</div>
		</>
	);
};

export default FormsUpload;
