import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../../../redux/modules/toParameter-settings';

// This is use to populate the tables with sharepoint existing
// data if any on the initial render of the tables
const useFetchTableData = (listname: string, tableFields: string[]) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<any>(false);
	const tableData: any[] = useSelector(
		(state: any) => state?.to_paramters_tableData.tableData || [],
	);

	// populate table with data from sharpoint on initial render
	useEffect(() => {
		setLoading(true);
		dispatch(getData(listname, tableFields));
		setLoading(false);
	}, []); /* eslint-disable-line */

	return [loading, tableData];
};

export default useFetchTableData;
