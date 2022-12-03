import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import getListItems from '../sharepoint/customAPIs/getListItems';

/**
 * Custom hook to fetch data from sharepoint
 * @param {string} listName -- the listname in sharepoint
 * from wich we will  get the data
 * @param {boolean} getDataByColumns -- the condition to choose if we gonna
 * return the data by columns or by rows
 * @param {string[]} listFields -- list of task order fields in sharepoint
 * @param {string} where -- the condition to fetch the current row  if it's true
 * @return {[object, boolean]}
 * @first -- this object might be a map if the user requested the data
 * @second -- describes the loading state
 * to be got by columns or an array otherwise.
 */
const useFetchFSAListItems = (
	listName: string,
	getDataByColumns: boolean,
	listFields: string[],
	where?: string,
): [Map<string, any[] | undefined>, boolean] | [any[], boolean] => {
	const [loading, setLoading] = useState(false);

	/**
	 * We will store the fetched data as a map when the user asks to
	 * get the data by columns, the data will be stored as {key, value}
	 * where the key the column name and the value is an array of all the
	 * values in that column
	 */
	const [mapData, setMapData] = useState<
		Map<string, any[] | undefined>
	>(new Map<string, any[] | undefined>());

	/**
	 * If the user chooses to get the data by rows then we will store
	 * it as an array in the normal order
	 */
	const [arrayData, setArrayData] = useState<any[]>([]);

	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			try {
				const data = await getListItems(listName, getDataByColumns
					, listFields, where);

				/**
				 * If the user requests to get the data by columns we should set
				 * the Map data state otherwise set the array data state
				 */
				if (getDataByColumns) {
					setMapData(data as Map<string, any[] | undefined>);
				} else setArrayData(data as any[]);
			} catch (error) {
				toast.error(
					`Error occured while fetching data from sharepoint`, /* eslint-disable-line */
				);
			}
			setLoading(false);
		};
		fetchItems();
	}, [getDataByColumns, listName, where]); /* eslint-disable-line */

	return (getDataByColumns) ? [mapData, loading] : [arrayData, loading];
};

export default useFetchFSAListItems;
