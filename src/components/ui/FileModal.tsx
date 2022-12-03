import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import { MDBBtn } from 'mdb-react-ui-kit';

interface Props {
	open: boolean;
	onClose: () => void;
	title: string;
	file: any;
	type?: string;
}

// Modal for displaying documents that has been clicked
const FileModal: React.FC<Props> = ({ open, onClose, title, file, type }) => {
	const downloadWord = () => {
		const sourceHTML = document.getElementById('file-document')?.innerHTML;
		const source =
			'data:application/vnd.ms-word;charset=utf-8,' +
			encodeURIComponent(sourceHTML!);
		const fileDownload = document.createElement('a');
		document.body.appendChild(fileDownload);
		fileDownload.href = source;
		fileDownload.download = `${title}.doc`;
		fileDownload.click();
		document.body.removeChild(fileDownload);
	};

	const downloadPDF = async () => {
		const newWindow = window.open('', title);
		newWindow?.document.write(
			document.getElementById('file-document')?.innerHTML!,
		);

		newWindow?.document.close(); // necessary for IE >= 10
		newWindow?.focus(); // necessary for IE >= 10*/

		newWindow?.print();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{type === 'file' ? (
					<Document file={file}>
						<Page pageNumber={1} />
					</Document>
				) : (
					<div
						dangerouslySetInnerHTML={{ __html: file }}
						id='file-document'></div>
				)}
			</DialogContent>
			<DialogActions>
				<MDBBtn rounded onClick={downloadPDF}>
					Download PDF
				</MDBBtn>
				<MDBBtn rounded onClick={downloadWord}>
					Download Word Document
				</MDBBtn>
			</DialogActions>
		</Dialog>
	);
};

export default FileModal;
