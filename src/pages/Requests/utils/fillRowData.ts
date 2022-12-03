import { InboxTableColumn } from '../types/customTypes';

/**
 * Fills the table rows with the fetched data from sharepoint, and
 * some hard coded data,
 * @param {DynamicObject[]} fetchedData -- Array with fetched data
 * from shrepoint.
 * @return {DynamicObject}
 */
const fillRowData = (fetchedData: InboxTableColumn[]): InboxTableColumn[] => {
	for (const row of fetchedData) {
		row['status'] = 'In progress...';
		row['sentby'] = row['sentby'];
	}
	return fetchedData;
};

export default fillRowData;
