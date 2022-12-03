import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Table from '../table';
import useFetchTableData from '../hooks/useFetchTableData';
import { projectTableFields } from '../sharepointTableFields';

// This the projects table component in the TO settings page
export const Projects = () => {
	const [loading, data] = useFetchTableData(
		'Project Table',
		projectTableFields,
	);
	const error: any = useSelector<any>(
		(state) => state?.to_paramters_tableData?.error,
	);

	if (error) toast.error('error');

	return (
		<>
			<Table
				title='Projects'
				columns={[
					{
						field: 'NUMBER',
						title: 'Project Number',
						type: 'numeric',
						align: 'left',
					},
					{ field: 'NAME', title: 'Project Name', align: 'left' },
					{
						field: 'BU_MANAGER',
						title: 'Bussiness Unit Manager',
						align: 'left',
					},
					{
						field: 'BUSSINESS_UNIT',
						title: 'Business Unit',
						align: 'left',
					},
				]}
				data={data}
				loading={loading}
				listname='Project Table'
				sharepointFields={projectTableFields}
			/>
		</>
	);
};
