import { BasicInformationRecource } from '../types/cummonTypes';
import { LabelPosition } from '../../../@types/customTypes';

/**
 * This object { basicInformationFields } is the holder of
 * the required information in the first step (BasicInformation)
 */
const basicInformationFields = {
	taskOrderCategory: {
		name: 'taskOrderCategory',
		label: 'Task Order Category',
		items: [
			{
				name: 'Project Management',
				value: 'pm',
			},
			{
				name: 'Overhead',
				value: 'overhead',
			},
		],
	},
	isThereWorkOrder: {
		name: 'isThereWorkOrder',
		label: 'Is there a work order?',
		labelPosition: 'end' as LabelPosition,
	},
	isThereExpenses: {
		name: 'isThereExpenses',
		label: 'Is there any expenses?',
		labelPosition: 'end' as LabelPosition,
	},
	projectTitle: {
		name: 'projectTitle',
		label: 'Project Title',
	},
	contractTypeInfo: {
		name: 'toContractType',
		label: 'TO contract type',
		items: [
			{
				value: 'lump sum',
				label: 'Lump Sum',
			},
			{
				value: 'reimbursable',
				label: 'Reimbursable',
			},
		],
	},
	paymentTerms: {
		name: 'paymentTerms',
		label: 'Payment Terms',
		type: 'text',
		inputAdornment: false,
		multiline: true,
		disabled: false,
		required: false,
	},
	officeInfo: {
		name: 'jacobsOffice',
		label: 'Office',
	},
	categoryInfo: {
		name: 'category',
		label: 'Category',
		items: [
			{
				value: 'jacobs',
				label: 'Jacobs Staff',
			},
			{
				value: 'worley',
				label: 'Worley Staff',
			},
		],
	},
	startDateField: {
		name: 'startDate',
		label: 'Start Date',
		type: 'date',
		inputAdornment: false,
		multiline: false,
		disabled: false,
		required: true,
	},
	endDateField: {
		name: 'endDate',
		label: 'End Date',
		type: 'date',
		inputAdornment: false,
		multiline: false,
		disabled: false,
		required: true,
	},
	departureField: {
		name: 'departure',
		label: 'Departure',
		type: '',
		inputAdornment: false,
		multiline: false,
		disabled: false,
		required: true,
	},
	destinationField: {
		name: 'destination',
		label: 'Destination',
		type: '',
		inputAdornment: false,
		multiline: false,
		disabled: false,
		required: true,
	},
	serviceDescription: {
		name: 'serviceDescription',
		placeholder: 'Required*',
		type: '',
		inputAdornment: false,
		multiline: true,
		disabled: false,
		required: true,
	},
	resources: [
		{
			field: 'firstName',
			title: 'First Name',
			editable: 'always',
			type: 'string',
			validate: (rowData: BasicInformationRecource) => ({
				isValid: rowData.firstName,
				helperText: 'Required*',
			}),
			cellStyle: {
				width: 130,
				minWidth: 130,
			},
			headerStyle: {
				width: 130,
				minWidth: 130,
			},
		},
		{
			field: 'lastName',
			title: 'Last Name',
			editable: 'always',
			type: 'string',
			validate: (rowData: BasicInformationRecource) => ({
				isValid: rowData.lastName,
				helperText: 'Required*',
			}),
			cellStyle: {
				width: 130,
				minWidth: 130,
			},
			headerStyle: {
				width: 130,
				minWidth: 130,
			},
		},
		{
			field: 'bwr',
			title: 'BWR',
			editable: 'never',
			type: 'string',
		},
		{
			field: 'function',
			title: 'Function',
			editable: 'always',
			type: 'string',
			validate: (rowData: BasicInformationRecource) => ({
				isValid: rowData.function,
				helperText: 'Required*',
			}),
		},
		{
			field: 'taskCode',
			title: 'Task Code',
			editable: 'never',
			type: 'string',
			cellStyle: {
				width: 130,
				minWidth: 130,
			},
			headerStyle: {
				width: 130,
				minWidth: 130,
			},
		},
	],
};

export default basicInformationFields;
