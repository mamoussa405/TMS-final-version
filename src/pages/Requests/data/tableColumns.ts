
/**
 * These are the columns that we will render in the fsa request table
 */
export const fsaColumns = [
	{
		field: 'taskOrderCategory',
		title: 'Task Order Category',
		headerStyle: {
			width: 136,
			minWidth: 136,
		},
	},
	{
		field: 'projectNumber',
		title: 'Project Number',
		headerStyle: {
			width: 110,
			minWidth: 110,
		},
	},
	{
		field: 'revisionNumber',
		title: 'Revision Number',
		headerStyle: {
			width: 120,
			minWidth: 120,
		},
	},
	{
		field: 'framework',
		title: 'Framework',
	},
	{
		field: 'phase',
		title: 'Task',
		cellStyle: {
			paddingLeft: 0,
		},
		headerStyle: {
			width: 108,
			minWidth: 108,
		},
	},
	{
		field: 'sentBy',
		title: 'Sent By',
		cellStyle: {
			paddingLeft: 0,
			paddingRight: 0,
		},
		headerStyle: {
			width: 70,
			minWidth: 70,
		},
	},
	{
		field: 'dueDate',
		title: 'Due Date',
		headerStyle: {
			width: 90,
			minWidth: 90,
		},
	},
	{
		field: 'creationDate',
		title: 'Creation Date',
		headerStyle: {
			width: 118,
			minWidth: 118,
		},
	},
	{
		field: 'updateDate',
		title: 'Update Date',
		headerStyle: {
			width: 115,
			minWidth: 115,
		},
	},
	{
		field: 'status',
		title: 'Status',
		headerStyle: {
			width: 125,
			minWidth: 125,
		},
	},
];
