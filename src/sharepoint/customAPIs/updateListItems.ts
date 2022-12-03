import { toast } from 'react-toastify';

import $SP from 'sharepointplus';

import { DynamicObject } from '../../@types/customTypes';

const sp = $SP();
/**
 * Calls the sharepoint list's update API to update the desired
 * items.
 * @param {string} listName -- the list name to update the items in
 * @param {DynamicObject[]} items -- the items to update
 * @param {string} where  -- The where Query, to update items whith a
 * certain condition.
 * @return {Promise<void>}
 */
const updateListItems = (
	listName: string,
	items: DynamicObject[],
	where: string): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const response = await sp.list(listName, process.env.REACT_APP_BASE_URL)
				.update(items, {
					where: where,
				});

			// Check if one or more items failed to be submitted
			if (response.failed && response.failed.length) reject(Error(''));
			// toast.success('Items Updated Successfully');
			resolve();
		} catch (e) {
			toast.error(
				`Failed to update items, Please try again or check whith the IT team`); /* eslint-disable-line */
			reject(Error(''));
		}
	});
};

export default updateListItems;

