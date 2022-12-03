// This file contains common functions between the new.ts and update.ts
/* eslint-disable */
import $SP from 'sharepointplus';

const sp = $SP();

// get base64 format for the three automatically generated document
export const getBase64format = async (pdf: any) => {
	let base64 = '';
	await new Promise((resolve) => {
		pdf.getBase64((data: string) => {
			base64 = data;
			resolve(null);
		});
	});
	return base64;
};

// To get the details for the three auto generated document
export const getAttachmentsObj = (
	filename: string,
	attachment: any,
	basicInformationForm: any,
) => ({
	version: 'v1.00',
	whenCreated: new Date().toDateString(),
	who_created: 'Admin',
	comment: 'No Comment',
	file_title: filename,
	documentURL: attachment,
	// to identify attachments for each request
	requestId: basicInformationForm.values.customID,
	// to determine whether psa of fsa
	framework: basicInformationForm.values.framework,
});

export const getNewAttachments = (attachments: any[]) =>
	attachments.map((attachment: any) => {
		delete attachment.tableData;
		return {
			version: attachment.version,
			whenCreated: attachment.whenCreated,
			who_created: attachment.who_created,
			comment: attachment.comment,
			file_title: attachment.file_title,
			documentURL: attachment.documentURL,
			requestId: attachment.requestId,
			framework: attachment.framework,
		};
	});

// get last id of a list in sharepoint
export const getLastID = async (listname: string) => {
	let lastID = 0;
	await new Promise((resolve) => {
		sp.list(`${listname}`, process.env.REACT_APP_BASE_URL).get(
			{
				fields: 'ID',
				orderby: 'ID DESC',
				rowlimit: 1,
				paging: true,
				page: 1,
			},
			function(data: any) {
				lastID = data[0].getAttribute('ID');
				// console.log(`last ${listname} id---`, lastID);
			},
		);
		resolve(null);
	});

	return lastID;
};

// get a format that is compactible with sharepoint fields
export const getNewResources = (
	resources: any[],
	requestId: string,
	framework: string,
) => {
	const newResources = resources.map((resource, index) => {
		delete resource.tableData;

		const m1 = isNaN(resource.m1) ? 0 : parseFloat(resource.m1);
		const m2 = isNaN(resource.m2) ? 0 : parseFloat(resource.m2);
		const m3 = isNaN(resource.m3) ? 0 : parseFloat(resource.m3);
		const m4 = isNaN(resource.m4) ? 0 : parseFloat(resource.m4);
		const m5 = isNaN(resource.m5) ? 0 : parseFloat(resource.m5);
		const m6 = isNaN(resource.m6) ? 0 : parseFloat(resource.m6);
		const m7 = isNaN(resource.m7) ? 0 : parseFloat(resource.m7);
		const m8 = isNaN(resource.m8) ? 0 : parseFloat(resource.m8);
		const m9 = isNaN(resource.m9) ? 0 : parseFloat(resource.m9);
		const m10 = isNaN(resource.m10) ? 0 : parseFloat(resource.m10);
		const m11 = isNaN(resource.m11) ? 0 : parseFloat(resource.m11);
		const m12 = isNaN(resource.m12) ? 0 : parseFloat(resource.m12);

		const m_total =
			m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8 + m9 + m10 + m11 + m12;
		return {
			bare_cost: resource.bare_cost ? resource.bare_cost : '',
			bwr: resource.bwr ? resource.bwr : '',
			first_name: resource.first_name ? resource.first_name : '',
			framework,
			functionn: resource.function ? resource.function : '',
			jesa_billable: resource.jesa_billable ? resource.jesa_billable : '',
			last_name: resource.last_name,
			_x006d_1: isNaN(resource.m1) ? 0 : parseFloat(resource.m1),
			_x006d_2: isNaN(resource.m2) ? 0 : parseFloat(resource.m2),
			_x006d_3: isNaN(resource.m3) ? 0 : parseFloat(resource.m3),
			_x006d_4: isNaN(resource.m4) ? 0 : parseFloat(resource.m4),
			_x006d_5: isNaN(resource.m5) ? 0 : parseFloat(resource.m5),
			_x006d_6: isNaN(resource.m6) ? 0 : parseFloat(resource.m6),
			_x006d_7: isNaN(resource.m7) ? 0 : parseFloat(resource.m7),
			_x006d_8: isNaN(resource.m8) ? 0 : parseFloat(resource.m8),
			_x006d_9: isNaN(resource.m9) ? 0 : parseFloat(resource.m9),
			_x006d_10: isNaN(resource.m10) ? 0 : parseFloat(resource.m10),
			_x006d_11: isNaN(resource.m11) ? 0 : parseFloat(resource.m11),
			_x006d_12: isNaN(resource.m12) ? 0 : parseFloat(resource.m12),
			m_total: m_total,
			requestId: requestId,
			total_labor_cost: resource.total_labor_cost
				? resource.total_labor_cost
				: '',
			total_labor_hours: resource.total_labor_hours
				? resource.total_labor_hours
				: '',
			wbs: resource.wbs ? resource.wbs : '',
		};
	});

	return newResources;
};

export const getNewResourcesWithMs = (resources: any[]) => {
	const newResourcesWithMs = resources.map((resource: any) => {
		return {
			bare_cost: resource.bare_cost ? resource.bare_cost : '',
			bwr: resource.bwr ? resource.bwr : '',
			first_name: resource.first_name ? resource.first_name : '',
			framework: resource.framework,
			functionn: resource.function ? resource.function : '',
			jesa_billable: resource.jesa_billable ? resource.jesa_billable : '',
			last_name: resource.last_name,
			m1: isNaN(resource._x006d_1) ? 0 : parseFloat(resource._x006d_1),
			m2: isNaN(resource._x006d_2) ? 0 : parseFloat(resource._x006d_2),
			m3: isNaN(resource._x006d_3) ? 0 : parseFloat(resource._x006d_3),
			m4: isNaN(resource._x006d_4) ? 0 : parseFloat(resource._x006d_4),
			m5: isNaN(resource._x006d_5) ? 0 : parseFloat(resource._x006d_5),
			m6: isNaN(resource._x006d_6) ? 0 : parseFloat(resource._x006d_6),
			m7: isNaN(resource._x006d_7) ? 0 : parseFloat(resource._x006d_7),
			m8: isNaN(resource._x006d_8) ? 0 : parseFloat(resource._x006d_8),
			m9: isNaN(resource._x006d_9) ? 0 : parseFloat(resource._x006d_9),
			m10: isNaN(resource._x006d_10) ? 0 : parseFloat(resource._x006d_10),
			m11: isNaN(resource._x006d_11) ? 0 : parseFloat(resource._x006d_11),
			m12: isNaN(resource._x006d_12) ? 0 : parseFloat(resource._x006d_12),
			m_total: resource.m_total,
			requestId: resource.requestId,
			total_labor_cost: resource.total_labor_cost
				? resource.total_labor_cost
				: '',
			total_labor_hours: resource.total_labor_hours
				? resource.total_labor_hours
				: '',
			wbs: resource.wbs ? resource.wbs : '',
		};
	});

	return newResourcesWithMs;
};
