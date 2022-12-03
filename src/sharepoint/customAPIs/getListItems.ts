import $SP from 'sharepointplus';

const sp = $SP();

/**
 * Custom get API to get the items from sharepoint list
 * @param {string} listName -- the listname in sharepoint
 * from wich we will  get the data
 * @param {boolean} getDataByColumns -- the condition to choose if we gonna
 * return the data by columns or by rows
 * @param {string[]} listFields -- list of task order fields in sharepoint
 * @param {string} where -- the condition to fetch the current row  if it's true
 * @return {Promise<Map<string, any[] | undefined> | any[]>}
 * -- a promise that will resolves with the data if no error occures or rejects
 * with the error otherwise
 */
const getListItems = (listName: string, getDataByColumns: boolean
	, listFields: string[], where?: string):
	Promise<Map<string, any[] | undefined> | any[]> => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await sp
				.list(listName, process.env.REACT_APP_BASE_URL)
				.get({ where });

			let data: any;
			if (getDataByColumns) {
				data = new Map<string, any[] | undefined>();
				/**
				 * Iterate through the response array, and get the desired fields from
				 * each item e.i the row in the sharepoint list. We store each field
				 * from all rows in an array and we set it as a value in a map with
				 * the desired field as a key
				 */
				response.forEach((pop: any) => {
					listFields.forEach((field: string) => {
						let value = pop.getAttribute(field);

						/**
						 * Handle the edge case where we get the request case number,
						 * the problem is that sharepoint returns the number with a
						 * floating point, so we should round it down
						 */
						if (field === 'case') value = Math.round(value);

						/**
						 * Here and because we are iterating by rows we should have
						 * a field got from the previous rows, so we should get its
						 * value and append the other values to it, otherwise we will
						 * overwrite it
						 */
						let currValue = data.get(field);
						if (!currValue) currValue = [value];
						else currValue.push(value);
						data.set(field, currValue);
					});
				});
			} else {
				/**
				 * If we are in this case then the user choosed to get the data by
				 * rows, hence we should iterate and store it in an array in the same
				 * order, we add an 'id' for future uses.
				 */
				let id = 0;
				data = [];

				response.forEach((pop: any) => {
					const tmpObject: any = {};
					listFields.forEach((field: string) => {
						const value = pop.getAttribute(field);
						/**
						 * Handle the edge case where we get the request case number,
						 * the problem is that sharepoint returns the number with a
						 * floating point, so we should round it down
						 */
						if (field === 'case') tmpObject[field] = Math.round(value);
						else tmpObject[field] = value;
					});
					tmpObject['id'] = id++;
					data.push(tmpObject);
				});
			}
			resolve(data);
		} catch (e) {
			reject(e);
		}
	});
};

export default getListItems;
