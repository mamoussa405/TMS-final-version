import $SP from 'sharepointplus';

const sp = $SP();

/**
 * Gets a specific field from a sharepoint list that satisfies
 * a specific condition.
 * @param {string} listName  -- The list name
 * @param {string} field  --  the field to get
 * @param {string} orderby -- The order in wich the condition should be
 * @return {Promise<string | number>}
 */
const getLastItemField = (listName: string, field: string, orderby: string):
	Promise<string | number> => {
	return new Promise(async (resolve, reject) => {
		try {
			const fieldData = await sp.list(listName, process.env.REACT_APP_BASE_URL)
				.get({
					fields: field,
					orderby: `${orderby} DESC`,
					rowlimit: 1,
					paging: true,
					page: 1,
				});

			// handle the case when we get nothing
			if (fieldData.length) resolve(fieldData[0].getAttribute(field));
			else resolve(0);
		} catch (e) {
			reject(e);
		}
	});
};

export default getLastItemField;
