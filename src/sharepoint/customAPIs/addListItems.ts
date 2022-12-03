import { toast } from 'react-toastify';

import $SP from 'sharepointplus';

import getListItems from './getListItems';

const sp = $SP();

/**
 * Calls the sharepoint list's add API to add new items
 * @param {string} listName -- the list name to add the new items to
 * @param {any[]} data -- an array of objects whith the items to add
 * @param { boolean } successFeedback -- a boolean to decide if we gonna give
 * the feedback that the items submited successfully
 * @param {string} requestID --
 * @return {Promise<void>} new promise that will resolve if the items submitted
 * successfully or reject if an error occured.
 */
const addListItems = (listName: string, data: any[],
	successFeedback: boolean, requestID: string): Promise<void> => {
	return new Promise(async (resolve, reject) => {
		try {
			/**
			 * First lets check if we already have an request with the
			 * same requestID, if so we should remove it and create an
			 * other one ot avoid duplicate in the DB
			 */
			const QUERY = 'requestID = "' + requestID + '"';
			const existedRequest = await getListItems(listName, false, ['ID'], QUERY);

			if ((existedRequest as any[]).length) {
				await sp.list(listName, process.env.REACT_APP_BASE_URL)
					.remove({ ID: (existedRequest as any[])[0].ID });
			}
			const retValue =
				await sp.list(listName, process.env.REACT_APP_BASE_URL).add(data);

			// Check if one or more items failed to be submitted
			if (retValue.failed.length > 0) {
				throw Error('');
			}
			if (successFeedback) {
				toast.success('Submited successfully');
			}
		} catch (e) {
			reject(e);
		}
		resolve();
	});
};

export default addListItems;
