import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Table from '../table';
import useFetchTableData from '../hooks/useFetchTableData';
import { officeTableFields } from '../sharepointTableFields';

// This the Office table component in the TO settings page
export const OfficeTable = () => {
	const [loading, data] = useFetchTableData(
		'Office Table',
		officeTableFields,
	);

	const error: any = useSelector<any>(
		(state) => state?.to_paramters_tableData?.error,
	);

	if (error) toast.error(error);

	return (
		<>
			<Table
				title='Office Table'
				columns={[
					{ field: 'OFFICE', title: 'Office', align: 'left' },
					{ field: 'ENTITY', title: 'Entity', align: 'left' },
					{
						field: 'JorW',
						title: 'JorW',
						lookup: { jacobs: 'Jacobs', worley: 'Worley' },
					}, // select field with jacobs and Worley options
					{ field: 'ADDRESS', title: 'ADDRESS', align: 'left' },
					{ field: 'SUFFIX', title: 'CLASS SUFFIX', align: 'left' },
					{
						field: 'CURRENCY',
						title: 'OFFICE CURRENCY',
						align: 'left',
					},
				]}
				data={data}
				loading={loading}
				listname='Office Table'
				sharepointFields={officeTableFields}
			/>
		</>
	);
};
