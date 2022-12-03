import { LabelPosition } from '../../../@types/customTypes';

/**
 * This object { chekList } is the holder of
 * the required information that we will need in the Check List
 * step
 */
const checkList = {
	isThereSignedWorkOrder: {
		main: {
			name: 'isThereSignedWorkOrder',
			label: '1) Is there a signed Work Order?',
			labelPosition: 'end' as LabelPosition,
		},
		yesIsThereDeviation: {
			name: 'isThereDeviation',
			label: 'If Yes is there a deviation? ' +
				'If so explain in the notes or an attachment.',
			labelPosition: 'end' as LabelPosition,
		},
		noIsClientAuthorizationAttached: {
			name: 'isClientAuthorizationAttached',
			label: 'If No, is client authorization attached?',
			labelPosition: 'end' as LabelPosition,
		},
		noIsGMAuthorizationAttached: {
			name: 'isGMAuthorizationAttached',
			label: 'If No, is GM authorization attached?',
			labelPosition: 'end' as LabelPosition,
		},
	},
	ifThereIsNoWOIsItBDorJAT: {
		main: {
			name: 'ifThereIsNoWOIsItBDorJAT',
			label: '2) If there is no W.O is it Business Development ' +
				'or Jacobs Academy Training?',
			labelPosition: 'end' as LabelPosition,
		},
		noGMAuthorizationMustBeAttached: {
			name: 'GMAuthorizationMustBeAttached',
			label: 'If not - GM authorization must be attached',
			labelPosition: 'end' as LabelPosition,
		},
	},
	notes: {
		name: 'notes',
		placeholder: 'Enter your notes here',
		type: '',
		inputAdornment: false,
		multiline: true,
		disabled: false,
		required: true,
		rows: 10,
	},
	originalWO: {
		schedule: {
			name: 'originalWOSchedule',
			label: 'Schedule (Hours)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
		cost: {
			name: 'originalWOCost',
			label: 'Cost (Office Currency)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
	},
	allocatedBudgetInWO: {
		schedule: {
			name: 'allocatedBudgetInWOSchedule',
			label: 'Schedule (Hours)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
		cost: {
			name: 'allocatedBudgetInWOCost',
			label: 'Cost (Office Currency)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
	},
	allPreviousTOs: {
		schedule: {
			name: 'allPreviousTOsSchedule',
			label: 'Schedule (Hours)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
		cost: {
			name: 'allPreviousTOsCost',
			label: 'Cost (Office Currency)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: false,
			required: true,
		},
	},
	actualTO: {
		schedule: {
			name: 'actualTOSchedule',
			label: 'Schedule (Hours)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: false,
		},
		cost: {
			name: 'actualTOCost',
			label: 'Cost (Office Currency)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: false,
		},
	},
	remaining: {
		schedule: {
			name: 'remainingSchedule',
			label: 'Schedule (Hours)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: false,
		},
		cost: {
			name: 'remainingCost',
			label: 'Cost (Office Currency)',
			type: 'number',
			inputAdornment: false,
			multiline: false,
			disabled: true,
			required: false,
		},
	},
	deviationComments: {
		name: 'deviationComments',
		label: 'Comments',
		type: '',
		inputAdornment: false,
		multiline: true,
		disabled: false,
		required: false,
		rows: 5,
	},
};

export default checkList;
