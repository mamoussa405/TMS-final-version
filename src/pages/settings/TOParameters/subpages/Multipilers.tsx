import Table from '../table';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import useFetchTableData from '../hooks/useFetchTableData';
import { multiplierTableFields } from '../sharepointTableFields';

// This the Multiplier table component in the TO settings page
export const Multipliers = () => {
	const [loading, data] = useFetchTableData(
		'Multipliers',
		multiplierTableFields,
	);
	const error: any = useSelector<any>(
		(state) => state?.to_paramters_tableData?.error,
	);

	if (error) toast.error(error);

	return (
		<>
			<Table
				title='Multipliers'
				columns={[
					{ field: 'TYPE', title: 'TYPE', align: 'left' },
					{ field: 'OFFICE', title: 'Jacobs Office', align: 'left' },
					{ field: 'MT_COST', title: 'MT COST', align: 'left' },
					{ field: 'ODC', title: 'ODC', align: 'left' },
					{ field: 'LDC', title: 'LDC', align: 'left' },
					{ field: 'ADC', title: 'ADC', align: 'left' },
					{ field: 'EDC', title: 'EDC', align: 'left' },
					{
						field: 'OFFICE_ID',
						title: 'OFFICE Foreign key',
						align: 'left',
					},
				]}
				data={data}
				loading={loading}
				listname='Multipliers'
				sharepointFields={multiplierTableFields}
			/>
		</>
	);
};
