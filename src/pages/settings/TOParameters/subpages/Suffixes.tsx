import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import Table from '../table';
import useFetchTableData from '../hooks/useFetchTableData';
import { suffixTableFields } from '../sharepointTableFields';

// This the suffixes table component in the TO settings page
export const Suffixes = () => {
	const [loading, data] = useFetchTableData('Suffixes', suffixTableFields);
	const error: any = useSelector<any>(
		(state) => state?.to_paramters_tableData?.error,
	);

	if (error) toast.error(error);

	return (
		<>
			<Table
				title='Suffixes'
				columns={[
					{ field: 'CODE', title: 'Code', align: 'center' },
					{ field: 'COUNTRY', title: 'Country', align: 'center' },
					{ field: 'LOCATION', title: 'Location', align: 'center' },
				]}
				data={data}
				loading={loading}
				listname='Suffixes'
				sharepointFields={suffixTableFields}
			/>
		</>
	);
};
