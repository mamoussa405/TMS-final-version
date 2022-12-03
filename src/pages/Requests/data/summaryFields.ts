/**
 * This file contains two functions that will return an array
 * with the required summary fields.
 */
import {
	SummaryFields,
	SummaryUserInfo,
} from '../types/customTypes';
import { DynamicObject } from '../../../@types/customTypes';

const summaryFields = {
	caseProperties(rowData: DynamicObject): SummaryFields {
		return ([
			{
				title: 'Process',
				value: 'FSA Task Order',
			},
			{
				title: 'Case Title',
				value: `Task Order request JESA-${rowData.projectNumber}`,
			},
			{
				title: 'Case Number',
				value: <string>rowData.case,
			},
			{
				title: 'Case Status',
				value: 'To do',
			},
			{
				title: 'Creator',
				value: <string>rowData.sentBy,
				// todo: change it to creator
			},
			{
				title: 'CreateDate',
				value: <string>rowData.creationDate,
			},
			{
				title: 'Last Update',
				value: <string>rowData.updateDate,
			},
			{
				title: 'Case Description',
				value: `Task Order request JESA-${rowData.projectNumber}`,
				// todo: ask about the value
				// depends on office
			},
		]);
	},
	currentTaskProperties(rowData: DynamicObject, currUserName: SummaryUserInfo)
		: SummaryFields {
		return ([
			{
				title: 'Task',
				value: <string>rowData.phase,
			},
			{
				title: 'Current User',
				value: `${currUserName.FirstName} ${currUserName.LastName}`,
			},
			{
				title: 'Task Delegate Date',
				value: <string>rowData.updateDate,
			},
			{
				title: 'Task init Date',
				value: <string>rowData.creationDate,
			},
			{
				title: 'Task Due Date',
				value: <string>rowData.dueDate,
			},
			{
				title: 'Finish Date',
				value: 'null',
			},
		]);
	},
};

export default summaryFields;
