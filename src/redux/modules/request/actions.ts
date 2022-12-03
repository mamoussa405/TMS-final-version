import $SP from 'sharepointplus';
import { toast } from 'react-toastify';
import {
	taskOrderFields,
	timelineFields,
} from '../../../pages/PSA/sharepointsFields';

export const sp = $SP();

export const actionTypes = {
	STORE_DATA: 'STORE_DATA',
	GET_PSA_REQUEST: 'GET_PSA_REQUEST',
	HANDLE_ERR: 'HANDLE_ERR',
	GET_SINGLE_PSA: 'GET_SINGLE_PSA',
	GET_RESOURCE_DATA: 'GET_RESOURCE_DATA',
	GET_ATTACHMENTS_DATA: 'GET_ATTACHMENTS_DATA',
	GET_ACTIVE_PSA: 'GET_ACTIVE_PSA',
	GET_CLOSED_PSA: 'GET_CLOSED_PSA',
	GET_TIMELINES: 'GET_TIMELINES',
};

// general fetch function to get data from sharepoint
const fetch = async (listFields: string[], listname: string) => {
	const response = await sp
		.list(`${listname}`, process.env.REACT_APP_BASE_URL)
		.get((data: any) => {
			// for (let i = 0; i < data.length; i++) {
			// console.log(data[i].getAttribute('wbs_task_code'));
			// }
		});

	const results = response.map((pop: any) => {
		const obj: any = {};
		listFields.forEach((field: any) => {
			obj[field] = pop.getAttribute(field);
		});
		return obj;
	});

	return results;
};

// store the form data from creating a new request in sharepoint
export const storeFormData = (formData: any) => async (dispatch: any) => {
	try {
		// console.log(formData);
		dispatch({ type: actionTypes.STORE_DATA, payload: formData });
		await sp.list(`Dataflow`, process.env.REACT_APP_BASE_URL).add({
			adc: formData.adc,
			wbs_task_code: formData.wbs_task_code,
			business_unit_manager: formData.business_unit_manager,
			category: formData.category,
			customID: formData.customID,
			departure: formData.departure,
			destination: formData.destination,
			email: formData.email,
			expenses: formData.expenses,
			first_note: formData.first_note,
			framework: formData.framework,
			last_note: formData.last_note,
			legal_entity: formData.legal_entity,
			mt_cost: formData.mt_cost,
			name: formData.name,
			office: formData.office,
			project_title: formData.project_title,
			revision_no: formData.revision_no,
			status: formData.status,
			task_order_category: formData.task_order_category,
			areExpensesIncluded: formData.areExpensesIncluded ? 'Yes' : 'No',
			areRatesVerified: formData.areRatesVerified ? 'Yes' : 'No',
			areTheWbsCodesConfirmed: formData.areTheWbsCodesConfirmed
				? 'Yes'
				: 'No',
			gmAuthorizationMustBeAttached:
				formData.gmAuthorizationMustBeAttached ? 'Yes' : 'No',
			haveTheMultipliersBeenVerified:
				formData.haveTheMultipliersBeenVerified ? 'Yes' : 'No',
			isApproved: formData.isApproved ? 'Yes' : 'No',
			isItAtoWithAjacobsOffice: formData.is_it_a_to_with_a_jacobs_office
				? 'Yes'
				: 'No',
			isTheOfficeLocationVerified: formData.isTheOfficeLocationVerified
				? 'Yes'
				: 'No',
			isThePersonBillable: formData.isThePersonBillable ? 'Yes' : 'No',
			startDate: formData.startDate,
			endDate: formData.endDate,
		});
		toast.success('New PSA request created successfully');
	} catch (error) {
		dispatch({
			type: actionTypes.HANDLE_ERR,
			payload: 'New PSA request creation failed',
		});
	}
};

// get all the psa request from SP
export const getAllPSARequests = () => async (dispatch: any) => {
	try {
		const allPSA = (await fetch(taskOrderFields, 'Dataflow')).filter(
			(result: any) => result.framework === 'psa',
		);
		dispatch({ type: actionTypes.GET_PSA_REQUEST, payload: allPSA });
	} catch (err) {
		dispatch({
			type: actionTypes.HANDLE_ERR,
			payload: 'All PSA request fetch from sharepoint failed',
		});
	}
};

// get all the active psa request from SP
export const getAllActivePSARequests = () => async (dispatch: any) => {
	try {
		const allactivePSA = (await fetch(taskOrderFields, 'Dataflow')).filter(
			(result: any) =>
				result.framework === 'psa' && result.status === 'active',
		);
		dispatch({ type: actionTypes.GET_ACTIVE_PSA, payload: allactivePSA });
	} catch (err) {
		dispatch({
			type: actionTypes.HANDLE_ERR,
			payload: 'All Active PSA request fetch from sharepoint failed',
		});
	}
};

// get all the closed psa request from SP
export const getAllClosedPSARequests = () => async (dispatch: any) => {
	try {
		const allClosedPSA = (await fetch(taskOrderFields, 'Dataflow')).filter(
			(result: any) =>
				result.framework === 'psa' && result.status === 'inactive',
		);
		dispatch({ type: actionTypes.GET_CLOSED_PSA, payload: allClosedPSA });
	} catch (err) {
		dispatch({
			type: actionTypes.HANDLE_ERR,
			payload: 'All Closed PSA request fetch from sharepoint failed',
		});
	}
};

export const getTimelines =
	(requestId: string | undefined) => async (dispatch: any) => {
		try {
			const timelines = (await fetch(timelineFields, 'Timelines')).filter(
				(result: any) =>
					result.requestId === requestId &&
					result.framework === 'psa',
			);
			dispatch({ type: actionTypes.GET_TIMELINES, payload: timelines });
		} catch (err) {
			dispatch({
				type: actionTypes.HANDLE_ERR,
				payload: 'PSA request timelines fetch from sharepoint failed',
			});
		}
	};
