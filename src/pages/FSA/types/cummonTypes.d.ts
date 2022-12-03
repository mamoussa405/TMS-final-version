/**
 * This file contains the common custom types that we will use
 * in out FSA page, by common we mean that we will use them in
 * the intire FSA folder.
 */

/**
 * The custom types used to represent the basic informations resources
 * means the resources that the user will fill in the first step "expression
 * of the needs".
 * @see /src/pages/FSA/newFSA.tsx
 * @see /src/pages/FSA/data/basicInformation.ts
 * @see /src/pages/FSA/utils/expressionOfNeedsTools.tsx
 */
export type BasicInformationRecource = {
	firstName: string;
	lastName: string;
	bwr: string;
	function: string;
	taskCode: string;
	expenses: boolean;
	comments: string;
	requestID?: string;
	ID: string;
	id?: number;
	BWRError?: boolean;
	taskCodeError?: boolean;
	tableData?: {
		id: number;
	};
	[key: string]: string | boolean | number;
};

/**
 * This is the custom type that represent the shape of the object
 * that we will send to sharepoint after the user fill the required
 * data, the object contains some optional fields that will be filled
 * when the user hits the submit button.
 * @see /src/pages/FSA/newFSA.tsx
 * @see /src/pages/FSA/utils/expressionOfNeedsTools.tsx
 */
export type BasicInformationDataToSendToSP = {
	taskOrderCategory: string;
	isThereWorkOrder: boolean;
	isThereExpenses: boolean;
	toContractType: string;
	paymentTerms: string;
	jacobsOffice: string;
	category: string;
	startDate: string;
	endDate: string;
	departure: string;
	destination: string;
	serviceDescription: string;
	projectName?: string;
	projectNumber?: string;
	projectTitle?: string;
	costController?: string;
	framework?: string;
	creationDate?: string;
	updateDate?: string;
	sentBy?: string;
	phase?: string;
	requestID?: string;
	case?: number;
};

/**
 * This is the custom type that represent the shape of the object
 * that we will send to sharepoint after the user fill the required
 * data, the object contains some optional fields that will be filled
 * when the user hits the submit button.
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 * @see /src/pages/FSA/utils/initTheRequest.ts
 */
export type TravelRequestDataToSendToSP = {
	phase: string;
	site: string;
	subject: string;
	areExpensesBillable: string;
	airfare: boolean;
	airfareAmount: string;
	hotelMeal_DailyAllowances: boolean; /* eslint-disable-line */
	hotelMeal_DailyAllowancesAmount: string; /* eslint-disable-line */
	transportation: boolean;
	transportationAmount: string;
	miscellaneous: boolean;
	miscellaneousAmount: string;
	startDate?: string;
	endDate?: string;
	requestID?: string;
};

/**
 * This is the custom type that represent the shape of the object
 * that we will send to sharepoint after the user fill the required
 * data, the object contains some optional fields that will be filled
 * when the user hits the submit button.
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 * @see /src/pages/FSA/utils/initTheRequest.ts
 */
export type GatherInputsDataToSendToSP = {
	projectName: string;
	projectNumber: string;
	revisionNo: number;
	office: string;
	framework: string;
	multipliers_MT_COST: number; /*eslint-disable-line */
	multipliers_ODC: number; /*eslint-disable-line */
	multipliers_LDC: number; /*eslint-disable-line */
	multipliers_ADC: number; /*eslint-disable-line */
	multipliers_EDC: number; /*eslint-disable-line */
	multipliersFSAAgency_MT_COST: number; /*eslint-disable-line */
	multipliersFSAAgency_ODC: number; /*eslint-disable-line */
	multipliersFSAAgency_LDC: number; /*eslint-disable-line */
	multipliersFSAAgency_ADC: number; /*eslint-disable-line */
	multipliersFSAAgency_EDC: number; /*eslint-disable-line */
	WBSTaskCode: string;
	expenses: number;
	requestID?: string;
};

/**
 * This is the custom type that represent the shape of the object
 * that we will send to sharepoint after the user fill the required
 * data, the object contains some optional fields that will be filled
 * when the user hits the submit button.
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 * @see /src/pages/FSA/utils/initTheRequest.ts
 */
export type CheckListDataToSendToSP = {
	isThereSignedWorkOrder: boolean;
	isThereDeviation: boolean;
	isClientAuthorizationAttached: boolean;
	isGMAuthorizationAttached: boolean;
	ifThereIsNoWOIsItBDorJAT: boolean;
	GMAuthorizationMustBeAttached: boolean;
	notes: string;
	originalWOSchedule: number;
	originalWOCost: number;
	allocatedBudgetInWOSchedule: number;
	allocatedBudgetInWOCost: number;
	allPreviousTOsSchedule: number;
	allPreviousTOsCost: number;
	actualTOSchedule: number;
	actualTOCost: number;
	remainingSchedule: number;
	remainingCost: number;
	deviationComments: string;
	requestID?: string;
};

/**
 * This is the custom type for the File Object, it will hold the info
 * about the uploaded file.
 * @see /src/pages/FSA/forms/initiateTheRequest/FormsUpload.tsx
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 * @see /src/pages/FSA/utils/initTheRequest.ts
 * @see /src/sharepoint/customAPIs/addListAttachment.ts
 */
export type MyFile = {
	name: string;
	sharepointName: string;
	type: string;
	content: string | ArrayBuffer | null;
};
