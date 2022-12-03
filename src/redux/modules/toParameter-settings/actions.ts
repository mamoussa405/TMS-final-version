import $SP from 'sharepointplus';

export const tableActions = {
	GET_DATA: 'GET_DATA',
	ADD_ROW: 'ADD_ROW',
	UPDATE_ROW: 'UPDATE_ROW',
	DELETE_ROW: 'DELETE_ROW',
	HANDLE_ERR: 'HANDLE_ERR',
};

// NB: This file contains actions for various ops.
// with redux and sharepoint integration.

export const sp = $SP();

// to get data from sharepoint
export const getData =
	(listname: string, tableFields: string[]) => async (dispatch: any) => {
		// check the structure of the response and use it accordingly
		sp.list(`${listname}`, process.env.REACT_APP_BASE_URL)
			.get({
				fields: `${tableFields.join(',')}`,
			})
			.then(
				function(data: any) {
					const tableData = data.map((d: any) => {
						const obj: any = {};
						tableFields.forEach((field: any) => {
							obj[field] = d.getAttribute(field);
						});
						return obj;
					});
					dispatch({
						type: tableActions.GET_DATA,
						payload: tableData,
					});
				},
				function(err: any) {
					dispatch({
						type: tableActions.HANDLE_ERR,
						payload:
							"Error occured in getting TO parameter's table-data from sharepoint" /* eslint-disable-line */,
					});
				},
			);
	};

// when new row is being added.
export const addRow =
	(rowData: any, listname: string) => async (dispatch: any) => {
		try {
			await sp
				.list(`${listname}`, process.env.REACT_APP_BASE_URL)
				.add(rowData);
			dispatch({ type: tableActions.ADD_ROW, payload: rowData });
		} catch (error) {
			dispatch({
				type: tableActions.HANDLE_ERR,
				payload: 'Error occured in adding row',
			});
		}
	};

// when editing a row
export const updateRow =
	(id: any, newData: any, listname: string) => async (dispatch: any) => {
		try {
			await sp
				.list(`${listname}`, process.env.REACT_APP_BASE_URL)
				.update({ ID: id });
			dispatch({ type: tableActions.UPDATE_ROW, payload: newData });
		} catch (error) {
			dispatch({
				type: tableActions.HANDLE_ERR,
				payload: 'Error occured in updating row',
			});
		}
	};

// when deleting a row in the table
export const deleteRow =
	(id: any, listname: string) => async (dispatch: any) => {
		try {
			await sp
				.list(`${listname}`, process.env.REACT_APP_BASE_URL)
				.remove({ ID: id });
			dispatch({ type: tableActions.DELETE_ROW, payload: id });
		} catch (error) {
			dispatch({
				type: tableActions.HANDLE_ERR,
				payload: 'Error occured in deleting row',
			});
		}
	};
