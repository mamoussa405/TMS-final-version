/**
 * This file contains the required fields for the TravelRequest page
 */
import { LabelPosition } from '../../../@types/customTypes';

const travelRequest = {
	department: {
		name: 'department',
		label: '',
		type: 'string',
		inputAdornment: false,
		multiline: false,
		disabled: true,
		required: false,
	},
	applicantNames: {
		name: 'applicantNames',
		label: '',
		type: 'string',
		inputAdornment: false,
		multiline: true,
		disabled: true,
		required: false,
	},
	projectName: {
		name: 'projectName',
		label: '',
		type: 'string',
		inputAdornment: false,
		multiline: false,
		disabled: true,
		required: false,
	},
	phase: {
		name: 'phase',
		label: 'Phase',
		items: [
			{
				name: 'P1',
				value: 'p1',
			},
			{
				name: 'P2',
				value: 'p2',
			},
			{
				name: 'P3',
				value: 'p3',
			},
			{
				name: 'P4',
				value: 'p4',
			},
			{
				name: 'P5',
				value: 'p5',
			},
			{
				name: 'P6',
				value: 'p6',
			},
			{
				name: 'P7',
				value: 'p7',
			},
			{
				name: 'PN',
				value: 'pn',
			},
		],
	},
	site: {
		name: 'site',
		placeholder: 'Required*',
		type: '',
		inputAdornment: false,
		multiline: false,
		disabled: false,
		required: true,
	},
	subject: {
		name: 'subject',
		placeholder: 'Required*',
		type: '',
		inputAdornment: false,
		multiline: true,
		disabled: false,
		required: true,
	},
	areExpensesBillable: {
		name: 'areExpensesBillable',
		label: 'Are expenses billable to client?',
		items: [
			{
				value: 'billable',
				label: 'Billable',
			},
			{
				value: 'non-billable',
				label: 'Non-billable',
			},
		],
	},
	startDateField: {
		name: 'startDate',
		label: 'Start Date',
		type: 'date',
		inputAdornment: false,
		multiline: false,
		disabled: true,
		required: false,
	},
	endDateField: {
		name: 'endDate',
		label: 'End Date',
		type: 'date',
		inputAdornment: false,
		multiline: false,
		disabled: true,
		required: false,
	},
	expenseEstimation: {
		airfare: {
			name: 'airfare',
			label: 'Airfare',
			labelPosition: 'end' as LabelPosition,
		},
		hotelMeal_DailyAllowances: {
			name: 'hotelMeal_DailyAllowances',
			label: 'Hotel,meal/daily allowances *',
			labelPosition: 'end' as LabelPosition,
		},
		transportation: {
			name: 'transportation',
			label: 'Transportation',
			labelPosition: 'end' as LabelPosition,
		},
		miscellaneous: {
			name: 'miscellaneous',
			label: 'Miscellaneous **',
			labelPosition: 'end' as LabelPosition,
		},
	},
	expensesEstimationAmount: {
		airfare: {
			name: 'airfareAmount',
			placeholder: 'Airfare',
			type: '',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: true,
		},
		hotelMeal_DailyAllowances: {
			name: 'hotelMeal_DailyAllowancesAmount',
			placeholder: 'Hotel,meal/daily allowances',
			type: '',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: true,
		},
		transportation: {
			name: 'transportationAmount',
			placeholder: 'Transportation',
			type: '',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: true,
		},
		miscellaneous: {
			name: 'miscellaneousAmount',
			placeholder: 'Miscellaneous',
			type: '',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: true,
		},
	},
};

export default travelRequest;
