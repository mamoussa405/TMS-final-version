import { useState, useEffect } from 'react';
import $SP from 'sharepointplus';
import { toast } from 'react-toastify';

/**
 * Custom hook to fetch data from sharepoint
 * @param {string} listName the listname in sharepoint
 * from wich we will  get the data
 * @param {string[]} listFields list of task order fields in sharepoint
 * @return {[boolean,  object]}
 * @first describes the loading state
 * @seconde holds the fetched data
 */
const useFetchListItems = (listName: string, listFields: string[]) => {
	const [loading, setLoading] = useState<any>(false);
	const [data, setData] = useState<any[]>([]);
	const sp = $SP();

	useEffect(() => {
		setLoading(true);
		const fetchItems = async () => {
			try {
				const response = await sp
					.list(`${listName}`, process.env.REACT_APP_BASE_URL)
					.get();

				const results = response.map((pop: any) => {
					const obj: any = {};
					listFields.forEach((field: any) => {
						obj[field] = pop.getAttribute(field);
					});
					return obj;
				});
				setData(results);
			} catch (error) {
				setLoading(false);
				toast.error(
					`Error occured while fetching data from sharepoint list ${listName}`,
				);
			}
		};
		fetchItems();
		setLoading(false);
	}, []); /* eslint-disable-line */
	// todo: add error
	return [loading, data];
};

export default useFetchListItems;
