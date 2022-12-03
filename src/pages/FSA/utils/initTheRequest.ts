/**
 * This file contains all the necessary tools for the Initiate the request
 * phase
 */
import { toast } from 'react-toastify';

import {
	InitTheRequestResource,
	HoursSplitResources,
} from '../types/forms';
import {
	TravelRequestDataToSendToSP,
	GatherInputsDataToSendToSP,
	CheckListDataToSendToSP,
	MyFile,
} from '../types/cummonTypes';
import { DynamicObject } from '../../../@types/customTypes';
import updateListItems from '../../../sharepoint/customAPIs/updateListItems';
import addListItems from '../../../sharepoint/customAPIs/addListItems';
import addListAttachment
	from '../../../sharepoint/customAPIs/addListAttachment';

/**
 * Updates the resources sharepoint list with the new filled data
 * @param {string} listName -- The list name to update the data in
 * @param {InitTheRequestResource[]} resources -- The resources table
 * to get the items to Update from
 * @param {string[]} fields -- Array with the required item fields to update
 * @param {string} where -- The where Query, it's used to identify which item
 * to update
 * @return {Promise<void>}
 */
export const updateResourcesInSP = (
	listName: string,
	resources: any[],
	fields: string[],
	where: string): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			/**
			 * First we should get the desired items from the resources table
			 */
			const itemsToUpdate: any = resources.map((resource: any) => {
				const tmpObject: DynamicObject = {};
				fields.forEach((field: string) => {
					tmpObject[field] = resource[field];
				});
				return tmpObject;
			});
			// Await for the item to be updated in the desired sharepoint list
			await updateListItems(listName, itemsToUpdate, where);
			resolve();
		} catch (e) {
			reject(Error(''));
		}
	});
};

/**
 * Constructs a string with the applicant names, the first and the last name
 * will be separated by a ',', and the applicant names will be separated by ';'.
 * @param {InitTheRequestResource[]} resources -- The resources table to get the
 * applicant names from.
 * @return {string}
 */
export const getApplicantNames = (
	resources: InitTheRequestResource[]): string => {
	let applicantNames: string = '';

	resources.forEach((resource: InitTheRequestResource, index: number) => {
		applicantNames += resource.firstName + ',' + resource.lastName;
		// append the ';' to each applicant name except the last one
		if (index !== resources.length - 1) applicantNames += ';';
	});

	return applicantNames;
};

/**
 * The second tool is a function that will constructs a substring
 * from the fsa project title passed as argument. This substring
 * will be constructed from the first occurrence of '-' till the end.
 * @param {string} projectTitle  -- the string to construct the
 * substring from.
 * @return {string}
 */
export const getProjectName = (projectTitle: string): string => {
	return projectTitle.substring(
		projectTitle.indexOf('-') + 1,
		projectTitle.length,
	);
};

/**
 * The second tool is a function that will constructs a substring
 * from the fsa project title passed as argument. This substring
 * will be constructed from the start till the first occurrence of '-'.
 * @param {string} projectTitle  -- the string to construct the
 * substring from.
 * @return {string}
 */
export const getProjectNumber = (projectTitle: string): string => {
	return projectTitle.substring(0, projectTitle.indexOf('-'));
};

/**
 * Submits the data to 'travelRequestData' sharepoint list
 * @param {TravelRequestDataToSendToSP} data -- Object with the data to send
 * @param {string} requestID -- the requestID to identify for which request
 * this travel request is.
 * @return {Promise<void>}
 */
export const submitDataToSP =
	(data: TravelRequestDataToSendToSP, requestID: string): Promise<void> => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				/**
				 * First lets remove the unneeded data, in this case the startDate
				 * and the endDate.
				 */
				delete data['startDate'];
				delete data['endDate'];
				// Second lets add the requestID
				data.requestID = requestID;
				await addListItems('travelRequestData', [data], false, requestID);
			} catch (e) {
				toast.error(
					'Failed to submit data, Please try again or check with the IT team');
				reject(Error(''));
			}
			resolve();
		});
	};
/**
 * Submits the data to 'gatherInputsData' sharepoint list
 * @param {any} data -- Data to send to sharepoint, the type is not any
 * we will pick some common info with @type {GatherInputsDataToSendToSP}.
 * @param {string} requestID -- Current Request ID
 * @return {Promise<void>}
 */
export const submitGatherInputsToSP =
	(data: Pick<GatherInputsDataToSendToSP,
		'revisionNo' | 'framework' | 'WBSTaskCode' | 'expenses' | 'requestID'>,
	requestID: string): Promise<void> => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				// Lets add the request ID
				data.requestID = requestID;
				await addListItems('gatherInputsData', [data], false, requestID);
			} catch (e) {
				toast.error(
					'Failed to submit data, Please try again or check with the IT team');
				reject(Error(''));
			}
			resolve();
		});
	};

/**
 * Submits the uploaded attachment to 'fsaAttachments' sharepoint list.
 * @param {MyFile[]} attachments -- Array with the file to send to sharepoint
 * @param {string} requestID -- Current request ID
 * @return {Promise<void>}
 */
export const submitFormsToSP = (
	attachments: MyFile[],
	requestID: string): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			/**
			 * Fill and array with the attachments name in sharepoint
			 */
			const attachmentsName: string[] = [
				'Signed Travel Request',
				'Remaining Budget',
				'Work Order Copy',
				'Other Attachment',
			];
			let signedTravelRequestPromise;
			let remainingBudgetPromise;
			let workOrderCopyPromise;
			let otherAttachmentPromise;

			for (let i = 0; i < attachments.length; ++i) {
				if (i === 0) {
					signedTravelRequestPromise = addListAttachment(
						'fsaAttachements',
						attachments[i],
						attachmentsName[i],
						false,
						requestID);
				} else if (i === 1) {
					remainingBudgetPromise = addListAttachment(
						'fsaAttachements',
						attachments[i],
						attachmentsName[i],
						false,
						requestID);
				} else if (i === 2) {
					workOrderCopyPromise = addListAttachment(
						'fsaAttachements',
						attachments[i],
						attachmentsName[i],
						false,
						requestID);
				} else {
					otherAttachmentPromise = addListAttachment(
						'fsaAttachements',
						attachments[i],
						attachmentsName[i],
						false,
						requestID);
				}
			}
			await Promise.all([
				signedTravelRequestPromise,
				remainingBudgetPromise,
				workOrderCopyPromise,
				otherAttachmentPromise]);
			// toast.success('Attachments added successfully');
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

/**
 * Gets the total hours, it iterate over all elements in
 * @type {HoursSplitResources[]} and sum app all totalHours
 * in each row.
 * @param {HoursSplitResources[]} resources -- Array of user filled
 * resources.
 * @return {number} -- Total Hours.
 */
export const getTotalHours = (resources: HoursSplitResources[]): number => {
	let totalHours: number = 0;

	resources.forEach((resource: HoursSplitResources) => {
		totalHours += resource.totalHours;
	});

	return totalHours;
};

/**
 * Gets the total cost, it iterate over all elements in
 * @type {HoursSplitResources[]} and sum app all totalCost
 * in each row.
 * @param {HoursSplitResources[]} resources -- Array of user filled
 * resources.
 * @param {number} expenses -- User defined Expenses to add to the total cost.
 * @return {number} -- Total Cost.
 */
export const getTotalCost = (
	resources: HoursSplitResources[],
	expenses: number): number => {
	let totalCost: number = 0;

	resources.forEach((resource: HoursSplitResources) => {
		totalCost += resource.totalCost;
	});

	return totalCost + expenses;
};

/**
 * Submits data to 'fsaCheckList' sharepoint list
 * @param {CheckListDataToSendToSP} data -- Data to send
 * to sharepoint.
 * @param {string} requestID -- The current request ID
 * @return {Promise<void>}
 */
export const submitCheckListDataToSP =
	(data: CheckListDataToSendToSP, requestID: string): Promise<void> => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				// Second lets add the requestID
				data.requestID = requestID;
				await addListItems('fsaCheckList', [data], true, requestID);
			} catch (e) {
				toast.error(
					'Failed to submit data, Please try again or check with the IT team');
				reject(Error(''));
			}
			resolve();
		});
	};
