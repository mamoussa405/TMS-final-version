/**
 * This file contains all the tools needed in the FSA work flow
 */
import { NavigateFunction } from 'react-router';

import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { toast } from 'react-toastify';

import {
	BasicInformationDataToSendToSP,
	BasicInformationRecource,
} from '../types/cummonTypes';
import { ItemToRender } from '../../../@types/customTypes';
import addListItems from '../../../sharepoint/customAPIs/addListItems';
import getLastItemField from '../../../sharepoint/customAPIs/getLastItemField';

/**
 * This tool is a function that constructs a new object
 * with the required info fetched from sharepoint, this object
 * will be passed as an item to one of the defined components
 * to be render in the page
 * @param {string[]} fetchedData -- an array of data fetched from sharepoint
 * @return {void}
 */
export const fillItemsWithFetchedData = (
	fetchedData: string[] | undefined,
): ItemToRender[] => {
	const res: ItemToRender[] = [];

	fetchedData?.forEach((info: string) => {
		res.push({ name: info, value: info });
	});

	return res;
};

/**
 * This tool is a function that will constructs a substring
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
 * This tool is a function that will constructs a substring
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
 * This tool is a function that will constructs the projects title
 * for the projects name and projects number.
 * @param {string[]} projectsNumber -- Array of projectsNumber fetched
 * from sharepoint.
 * @param {string[]} projectsName -- Array of projectsName fetched from
 * sharepoint.
 * @return {string[]} -- Array with the constructed projects title.
 */
export const constructProjectsTitle = (
	projectsNumber: string[], projectsName: string[]): string[] => {
	const projectsTitle: string[] = [];

	for (let i = 0; i < projectsNumber.length; ++i) {
		projectsTitle.push(projectsNumber[i] + '-' + projectsName[i]);
	}

	return projectsTitle;
};

/**
 * This tool is a function that will return the current cost controller
 * for the current project. It will iterate over all projects Number and
 * projects Name and concatenate them and compare them with the
 * current project title if it's a match then it will return the project
 * cost controller in the current index.
 * @param {string[]} projectCostControllers -- Array with cost controllers
 * fetched from sharepoint.
 * @param {string[]} projectsNumber -- Array with projects Number fetched
 * from sharepoint.
 * @param {string[]} projectsName -- Array with projects Name fetched from
 * sharepoint.
 * @param {string} projectTitle -- The user selected project title
 * @return {string} -- The current cost controller.
 */
export const getCurCostController = (
	projectCostControllers: string[],
	projectsNumber: string[],
	projectsName: string[],
	projectTitle: string,
): string => {
	for (let i = 0; i < projectsNumber.length; ++i) {
		if (projectsNumber[i] + '-' + projectsName[i] === projectTitle) {
			return projectCostControllers[i];
		}
	}

	return 'Not Found';
};

/**
 * This tool is a function that will remove duplicats from an array
 * of data.
 * @param {string[]} data -- Array of data
 * @return {string[]} -- New Array with distinct elements.
 */
export const removeDuplicats = (data: string[]): string[] => {
	if (!data) return [];
	const res: string[] = [];
	data.sort();
	let prevElement = data[0];

	for (let i = 1; i < data.length; ++i) {
		if (data[i] !== prevElement) {
			res.push(prevElement);
			prevElement = data[i];
		}
	}
	res.push(prevElement);

	return res;
};
/**
 * Adds a 'request ID' field to all the object in the resources array
 * @param {BasicInformationRecource[]} resources -- an array of objects
 * to add the request id to
 * @param {string} requestID -- the requestID to add, it's recommended to
 * generate it with uuid
 * @link https://www.npmjs.com/package/uuid
 */
const addRequestIdToResources =
	(resources: BasicInformationRecource[], requestID: string): void => {
		for (const resource of resources) {
			resource.requestID = requestID;
		}
	};

/**
 * Submits the data to sharepoint, it takes the data and the resources to send
 * and calls the addListItems on them respectively, it's custumized to use with
 * the expression of the needs only.
 * @param {BasicInformationDataToSendToSP} data -- the basic information
 * collectedin this step
 * @param {BasicInformationRecource[]} resources -- the resources filled in this
 * step
 * @param {NavigateFunction} navigate -- a navigate function to redirect the
 * @param {string} userName -- the current userName
 * user to '/dashboard' when the submitted successfully
 * @return {Promise<void>} -- a new promise that always resolves successfully
 */
export const submitDataToSP =
	(data: BasicInformationDataToSendToSP, resources: BasicInformationRecource[],
		navigate: NavigateFunction, userName: string): Promise<void> => {
		return new Promise(async (resolve, _) => {
			try {
				/**
				 * First we should handle some edge cases before submitting data
				 * one of them is when the contract type is reimbursable and we
				 * have the payment terms, we should clear them.
				 */
				if (data.toContractType === 'reimbursable') data.paymentTerms = '';

				/**
				 * Second let's get the last case number sumbitted
				 */
				let lastCaseNumber = await getLastItemField('expressionOfNeedsData', 'case', 'case'); /* eslint-disable-line */
				// Generate a new id to identify this request for future uses
				const requestID = uuidv4();

				data['framework'] = 'FSA';
				data['creationDate'] = moment(new Date())
					.format('YYYY-MM-DD HH:mm:ss');
				data['updateDate'] = moment(new Date())
					.format('YYYY-MM-DD HH:mm:ss');
				data['sentBy'] = userName;
				data['phase'] = 'Initiate the request';
				data['requestID'] = requestID;
				data['case'] = ++(lastCaseNumber as number);
				data['projectName'] = getProjectName(data.projectTitle as string);
				data['projectNumber'] = getProjectNumber(data.projectTitle as string);
				delete data['projectTitle'];

				await addListItems('expressionOfNeedsData', [data], false, requestID);

				// Add the request id to all resources columns for future uses
				addRequestIdToResources(resources, requestID);
				await addListItems('fsaResources', resources, true, requestID);

				// Redirect the user to dashboard when the data submited successfully
				navigate('/dashboard');
			} catch (e) {
				toast.error('Failed to submit data');
			}
			resolve();
		});
	};
