import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { MDBBtn } from 'mdb-react-ui-kit';
import DragTable from '../../../components/ui/DragTable';
import AttachmentModal from '../../../components/ui/AttachmentModal';
import doc from '../../../assets/doc.svg';
import hourlySplitTemplate from '../../../static/hourly-split';
import { getMs, getCheckListTemplate } from '../../../utils/templateUtils';
import jacobsTemplate from '../../../static/jacobs';
import worleyTemplate from '../../../static/worley';

interface Props {
	handleNext: Function;
	handlePrevious: Function;
	attachDocumentForm: any;
	documents: any[];
	onDrop: (files: File[]) => Promise<void>;
	onRowDelete: (row: any) => Promise<void>;
	setTitle: (title: string) => void;
	setActiveFile: (file: any) => void;
	setFileModalOpen: (open: boolean) => void;
	checklistData: any;
	resources: any[];
	locationPathname: any;
	basicInformationFormData: any;
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
	doc: {
		width: '1.2rem', // eslint-disable-line
		margin: '1rem', // eslint-disable-line
		cursor: 'pointer', // eslint-disable-line

		transition: 'all .2s ease-in', // eslint-disable-line
		'&:hover': {
			width: '1.3rem',
			boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.6)',
		},
	},
}));

// Generate document step page
const GenerateDocument: React.FC<Props> = ({
	handleNext,
	handlePrevious,
	attachDocumentForm,
	documents,
	onDrop,
	onRowDelete,
	setTitle,
	setActiveFile,
	setFileModalOpen,
	checklistData,
	resources,
	basicInformationFormData,
	locationPathname,
}) => {
	const classes = useStyles();
	const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);

	// for rendering the documents that has been clicked
	const renderDocument = (data: any) => {
		setTitle(data.file_title);
		if (data.file_title === 'Hours split') {
			const ms = getMs(resources);
			let template = hourlySplitTemplate.replace(`%%Mss%%`, ms);
			template = template.replace(
				`%%wbs%%`,
				basicInformationFormData.values.wbs_task_code,
			);
			template = template.replace(
				`%%expenses%%`,
				basicInformationFormData.values.expenses,
			);
			setActiveFile(template);
		}
		if (data.file_title === 'Checklist') {
			const template = getCheckListTemplate(checklistData);
			setActiveFile(template);
		}
		if (data.file_title === 'Worley Task Order') {
			let template = worleyTemplate.replace(
				`@#revision_no`,
				basicInformationFormData.values.revision_no,
			);
			template = template.replace(
				`@#jacobslegal_entityAddress`,
				basicInformationFormData.values.legal_entity,
			);
			template = template.replace(
				`@#legal_entity`,
				basicInformationFormData.values.legal_entity,
			);
			template = template.replace(
				`@#departure`,
				basicInformationFormData.values.departure,
			);
			template = template.replace(
				`@#destination`,
				basicInformationFormData.values.destination,
			);
			template = template.replaceAll(
				`@#startDate`,
				locationPathname.split('/#').includes('/psa/new')
					? basicInformationFormData.values.startDate
					: basicInformationFormData.values.startDate,
			);
			template = template.replace(
				`@#endDate`,
				locationPathname.split('/#').includes('/psa/new')
					? basicInformationFormData.values.endDate
					: basicInformationFormData.values.endDate,
			);
			template = template.replace(
				`@#adc`,
				basicInformationFormData.values.adc,
			);
			template = template.replace(
				`@#mt_cost`,
				basicInformationFormData.values.mt_cost,
			);
			template = template.replace(
				`@#taskCodes`,
				basicInformationFormData.values.wbs_task_code,
			);
			template = template.replace(
				`@#expenses `,
				basicInformationFormData.values.expenses,
			);
			template = template.replace(
				`@#wbs_task_code`,
				basicInformationFormData.values.wbs_task_code,
			);
			setActiveFile(template);
		}
		if (data.file_title === 'Jesa Task Order') {
			let template = jacobsTemplate.replace(
				`@#revision_no`,
				basicInformationFormData.values.revision_no,
			);
			template = template.replace(
				`@#jacobslegal_entityAddress`,
				basicInformationFormData.values.legal_entity,
			);
			template = template.replace(
				`@#legal_entity`,
				basicInformationFormData.values.legal_entity,
			);
			template = template.replace(
				`@#departure`,
				basicInformationFormData.values.departure,
			);
			template = template.replace(
				`@#destination`,
				basicInformationFormData.values.destination,
			);
			template = template.replaceAll(
				`@#startDate`,
				locationPathname.split('/#').includes('/psa/new')
					? basicInformationFormData.values.startDate
					: basicInformationFormData.values.startDate,
			);
			template = template.replace(
				`@#endDate`,
				locationPathname.split('/#').includes('/psa/new')
					? basicInformationFormData.values.endDate
					: basicInformationFormData.values.endDate,
			);
			template = template.replace(
				`@#adc`,
				basicInformationFormData.values.adc,
			);
			template = template.replace(
				`@#mt_cost`,
				basicInformationFormData.values.mt_cost,
			);
			template = template.replace(
				`@#taskCodes`,
				basicInformationFormData.values.wbs_task_code,
			);
			template = template.replace(
				`@#expenses `,
				basicInformationFormData.values.expenses,
			);
			template = template.replace(
				`@#wbs_task_code`,
				basicInformationFormData.values.wbs_task_code,
			);
			setActiveFile(template);
		}
		setFileModalOpen(true);
	};

	return (
		<div>
			<h3 className={classes.title}>Extra Attachments</h3>
			<DragTable
				title='Attachments'
				data={documents}
				columns={[
					{ field: 'file_title', title: 'Title' },
					{ field: 'version', title: 'Version' },
					{ field: 'who_created', title: 'Creator' },
					{ field: 'comment', title: 'Comment' },
					{ field: 'whenCreated', title: 'Created Date' },
					{
						title: 'Document',
						render: (data: any) => (
							<img
								className={classes.doc}
								src={doc}
								alt='document'
								onClick={() => renderDocument(data)}
							/>
						),
					},
				]}
				addAttachment={() => setAttachmentModalOpen(true)}
				hideDropZone
				onRowDelete={onRowDelete}
			/>
			<div className={classes.btnDiv}>
				<MDBBtn
					rounded
					outline
					color='dark'
					onClick={() => handlePrevious()}>
					Previous
				</MDBBtn>
				<MDBBtn
					rounded
					outline
					color='dark'
					onClick={() => handleNext()}>
					Next
				</MDBBtn>
			</div>
			<AttachmentModal
				open={attachmentModalOpen}
				onClose={() => setAttachmentModalOpen(false)}
				formik={attachDocumentForm}
				onDrop={onDrop}
			/>
		</div>
	);
};

export default GenerateDocument;
