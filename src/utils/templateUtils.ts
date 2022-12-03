import checklistTemplate from '../static/checklist';

// for inserting hourly split data into html template for export
export const getMs = (data: any[]) => {
	let template = '';
	data.forEach((item) => {
		delete item.tableData;
		delete item.requestId;
		delete item.framework;

		template += `<tr>`;
		Object.values(item).forEach((val) => {
			template += `<td style="border-color: #696969;">
                    <font size="1">${val || '-'}</font>
                  </td>`;
		});

		template += `</tr>`;
	});

	return template;
};

// for inserting checklist data into html template for export
export const getCheckListTemplate = (data: any) => {
	let template = checklistTemplate.replace(
		`[@#isForPSACheckedYes]`,
		data.is_it_a_to_with_a_jacobs_office ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isForPSACheckedNo]`,
		!data.is_it_a_to_with_a_jacobs_office ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isBillableCheckedYes]`,
		data.is_the_person_billable ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isBillableCheckedNo]`,
		!data.is_the_person_billable ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#mustHaveGmAuthorizationCheckedYes]`,
		data.gm_authorization_must_be_attached ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#mustHaveGmAuthorizationCheckedNo]`,
		!data.gm_authorization_must_be_attached ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isRatesVerifiedCheckedYes]`,
		data.are_rates_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isRatesVerifiedCheckedNo]`,
		!data.are_rates_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isExpensesIncludedCheckedYes]`,
		data.are_expenses_included ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isExpensesIncludedCheckedNo]`,
		!data.are_expenses_included ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isMultipliersVerifiedCheckedYes]`,
		data.have_the_multipliers_been_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isMultipliersVerifiedCheckedNo]`,
		!data.have_the_multipliers_been_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isLocationVerifiedCheckedYes]`,
		data.is_the_office_location_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isLocationVerifiedCheckedNo]`,
		!data.is_the_office_location_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isWbsConfirmedCheckedYes]`,
		!data.is_the_office_location_verified ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isWbsConfirmedCheckedYes]`,
		data.are_the_wbs_codes_confirmed ? '✔️' : '✖️',
	);
	template = template.replace(
		`[@#isWbsConfirmedCheckedNo]`,
		!data.are_the_wbs_codes_confirmed ? '✔️' : '✖️',
	);
	template = template.replace(`@#psaNotes`, data.first_note);
	template = template.replace(`@#otherNotes`, data.last_note);

	return template;
};
