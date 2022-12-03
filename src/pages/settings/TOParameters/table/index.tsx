import React from 'react';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
// import { saveAs } from 'file-saver';
import { CloudDownloadOutlined } from '@material-ui/icons';

import {
	addRow,
	deleteRow,
	getData,
	updateRow,
} from '../../../../redux/modules/toParameter-settings';
import { exportToCSV } from '../../../../utils/exportCSV';

interface Props {
	title?: string;
	loading?: boolean;
	data: any[];
	columns: any[];
	listname: string;
	sharepointFields: string[];
}

// This is a general reusable table to be used in the TO settings page.
const Table: React.FC<Props> = ({
	title,
	data,
	columns,
	loading,
	listname,
	sharepointFields,
}) => {
	const [crudActionLoading, setCrudActionLoading] =
		React.useState<boolean>(false);
	const dispatch = useDispatch();

	const actions: any[] = [
		{
			icon: () => <CloudDownloadOutlined />,
			onClick: async () => {
				exportToCSV(data, listname);
			},
			tooltip: 'Download Sample Excel File',
			isFreeAction: true,
		},
	];

	// when a new row is added to table
	const onRowAdd = async (rowData: any) => {
		// console.log('rowData === ', rowData);
		setCrudActionLoading(true);
		dispatch(addRow(rowData, listname));
		dispatch(getData(listname, sharepointFields));
		setCrudActionLoading(false);
	};

	// when a row is update in the table
	const onRowUpdate = async (newData: any, oldData: any) => {
		// console.log(newData, 'oldData==', oldData);
		setCrudActionLoading(true);
		dispatch(updateRow(oldData.tableData.id, newData, listname));
		dispatch(getData(listname, sharepointFields));
		setCrudActionLoading(false);
	};

	// when a row is deleted from table
	const onRowDelete = async (rowData: any) => {
		// console.log(rowData);
		setCrudActionLoading(true);
		dispatch(deleteRow(rowData.tableData.id, listname));
		dispatch(getData(listname, sharepointFields));
		setCrudActionLoading(false);
	};

	return (
		<>
			<h4 style={{ fontWeight: 'bold' }}>{title}</h4>
			<MaterialTable
				title=''
				actions={actions}
				isLoading={loading || crudActionLoading}
				data={data}
				columns={columns}
				options={{
					search: false,
					toolbarButtonAlignment: 'right',
					actionsColumnIndex: -1,
					paging: false,
					showTitle: false,
					headerStyle: {
						textAlign: 'center',
					},
					rowStyle: {
						textAlign: 'center',
					},
				}}
				editable={{
					onRowAdd,
					onRowDelete,
					onRowUpdate,
				}}
			/>
		</>
	);
};

export default Table;
