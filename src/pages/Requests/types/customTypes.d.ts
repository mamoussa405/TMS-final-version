/**
 * This file contains the common custom types that we will use in
 * Requests pages.
 */

/**
 * This is the custom type for the Summary Modal fields.
 * @see /src/pages/Requests/Summary.tsx
 */
export type SummaryField = {
	title: string;
	value: string;
};

export type SummaryFields = SummaryField[];

/**
 * This is the custom type for the user info needed in
 * the summary Modal.
 * @see /src/pages/Requests/my-requests.tsx
 * @see /src/pages/Requests/Summary.tsx
 */
export type SummaryUserInfo = {
	FirstName: string;
	LastName: string;
};

/**
 * This is the custom type for the Summary Props object,
 * is contains all the necessary info to render the Summary
 * component.
 * @see /src/pages/Requests/Summary.tsx
 */
export type SummaryProps = {
	rowData: DynamicObject;
	currUserInfo: SummaryUserInfo;
};

/**
 * This is the custom type for the inbox table columns,
 * it contains the required fields to fill the table row
 * data.
 * @see /src/pages/Requests/utils/fillRowData.ts
 * @see /src/pages/Requests/my-requests.tsx
 */
export type InboxTableColumn = {
	taskOrderCatergroy: string;
	projectNumber: string;
	revisionNumber: string;
	framework: string;
	phase: string;
	sentby: string;
	dueDate: string;
	creationDate: string;
	updateDate: string;
	status: string;
};
