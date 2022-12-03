import { useState, useEffect } from 'react'; // OK
import $SP from 'sharepointplus'; // !Still need a clarification about auth

/**
 * Custom hook to fetch data from sharepoint
 * @param {string[]} listFields list of task order fields in sharepoint
 * @see /src/pages/PSA/sharepointsFields.ts
 * @param {string} listname the listname in sharepoint
 * from wich we will  get the data
 * @return {[boolean,  object]}
 * @first describes the loading state
 * @seconde holds the fetched data
 */
const useFetch = (listFields: string[], listname: string) => {
	/**
	 *  this state will allow us to track if we are loading data
	 *  from sharepoiont or not
	 *  !Still need to know if we are informing the user or just to
	 *  !controle a logical proposition
	 */
	const [loading, setLoading] = useState<any>(false);
	const [data, setData] = useState<any[]>([]);
	const [, setError] = useState('');
	const sp = $SP();

	useEffect(() => {
		try {
			setLoading(true);
			const fetch = async () => {
				const response = await sp
					.list(`${listname}`, process.env.REACT_APP_BASE_URL)
					.get((data: any) => {
						for (let i = 0; i < data.length; i++) {
							// console.log(data[i].getAttribute('wbs_task_code'));
						}
					});

				const results = response.map((pop: any) => {
					const obj: any = {};
					listFields.forEach((field: any) => {
						obj[field] = pop.getAttribute(field);
					});
					return obj;
				});
				setData(results);
			};
			fetch();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(`Error occured in fetching data from ${listname}`);
		}
	}, []); /* eslint-disable-line */
	// todo: add error
	return [loading, data];
};

export default useFetch;
