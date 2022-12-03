/**
 * This file contains the sharepoint fields that we will need to
 * get or add data to a sharepoint list
 */

/**
 * This is the array of fields that we will request from the resources
 * sharepoint list in the initiate the request phase
 */
export const initTheRequestResourcesFields = [
	'firstName',
	'lastName',
	'bwr',
	'function',
	'taskCode',
	'expenses',
	'comments',
	'ID',
];

/**
 * This is the array of fields that we will request from the multipliers
 * sharepoint list in the Gather inputs step (initiate the request phase)
 */
export const gatherInputsMultipliersFields = [
	'type',
	'office',
	'MT_COST',
	'ODC',
	'LDC',
	'ADC',
	'EDC',
];

/**
 * This is the array of fields that we will update in the fsaResources
 * sharepoint list after the user fills the hours split
 */
export const hoursSplitFields = [
	'bareCost',
	'JESABilledRate',
	'totalCost',
	'totalHours',
	'ma',
	'mb',
	'mc',
	'md',
	'me',
	'mf',
	'mg',
	'mh',
	'mi',
	'mj',
	'mk',
	'ml',
	'framework',
	'ID',
];
