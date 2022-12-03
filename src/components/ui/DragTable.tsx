import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Add, CloudDownload, Sync } from '@material-ui/icons';
import MaterialTable from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { saveAs } from 'file-saver';
import { useDropzone } from 'react-dropzone';
import { TableProps } from '../types/ui';

// import '../css/table.css';

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

// table for showing data - And documents in case data supports documents
// has drag and drop upload support
const DragTable: React.FC<TableProps> = ({
	title,
	data,
	columns,
	onRowAdd,
	onRowUpdate,
	onRowDelete,
	loading,
	onRowClicked,
	paging,
	search = false,
	exportButton,
	dropzoneAtTop,
	dropzoneText,
	dropzoneSubText,
	downloadSampleExcel,
	supportedFiles,
	onDrop,
	hideDropZone,
	toggleMAction,
	addAttachment,
	editCell,
}): JSX.Element => {
	const { getRootProps, getInputProps } = useDropzone({
		accept: supportedFiles?.join(','),
		onDrop,
		maxFiles: 1,
	});
	const classes = useStyles();

	// checking if download excel button should be present or not
	const actions: any[] = [];
	if (downloadSampleExcel) {
		actions.push({
			icon: () => <CloudDownload />,
			onClick: async () => {
				saveAs('/downloads/FSA-resources.xlsx', 'sample-resource.xlsx');
			},
			isFreeAction: true,
			tooltip: 'Download Sample Excel File',
		});
	}

	// add attachment button
	if (addAttachment) {
		actions.push({
			icon: () => <Add />,
			onClick: addAttachment,
			isFreeAction: true,
			tooltip: 'Add Attachment',
		});
	}

	// for checking if M actions is to be shown or not
	if (toggleMAction) {
		actions.push({
			icon: () => <Sync />,
			onClick: () => toggleMAction(),
			isFreeAction: true,
			tooltip: 'Toggle visibility of M1 actions',
		});
	}

	return (
		<>
			{dropzoneAtTop && !hideDropZone && (
				<div {...getRootProps({ className: classes.dropzone })}>
					<input {...getInputProps()} />
					<strong>
						{dropzoneText ||
							'Drag and drop excel files here to parse into the table'}
					</strong>
					{dropzoneSubText && <p>{dropzoneSubText}</p>}
				</div>
			)}
			<MaterialTable
				title={title}
				isLoading={loading}
				onRowDoubleClick={onRowClicked}
				style={{
					marginTop: '3rem',
					marginBottom: '1rem',
				}}
				options={{
					headerStyle: {
						backgroundColor: '#0A66C2',
						color: 'white',
						fontFamily:
							"'Quicksand', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
					},
					showTitle: !!title,
					search,
					actionsColumnIndex: -1,
					paging,
					toolbarButtonAlignment: 'right',
					exportMenu: (exportButton) ? [
						{
							label: 'Export CSV',
							exportFunc: (cols, data) => {
								ExportCsv(cols, data, 'fsa-resources'); /* eslint-disable-line */
							},
						},
						{
							label: 'Export PDF',
							exportFunc: (cols, data) => {
								ExportPdf(cols, data, 'fsa-resources'); /* eslint-disable-line */
							},
						},
					] : [],
				}}
				actions={actions}
				data={data}
				columns={columns}
				editable={{
					onRowAdd,
					onRowUpdate,
					onRowDelete,
				}}
			/>
			{!dropzoneAtTop && !hideDropZone && (
				<div {...getRootProps({ className: classes.dropzone })}>
					<input {...getInputProps()} />
					<strong>
						{dropzoneText ||
							'Drag and drop excel files here to parse into the table'}
					</strong>
					{dropzoneSubText && <p>{dropzoneSubText}</p>}
				</div>
			)}
		</>
	);
};

export default DragTable;
