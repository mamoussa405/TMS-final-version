import { AnyAction } from 'redux';
import { tableActions } from './actions';

const initialState: any = {
	tableData: [],
	error: null,
};

export const toParametersTableReducer = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
	case tableActions.GET_DATA:
		return { ...state, tableData: [...action.payload] };
	case tableActions.ADD_ROW:
		return {
			...state,
			tableData: [...state.tableData, action.payload],
		};
	case tableActions.UPDATE_ROW:
		const itemIndex = state.tableData.findIndex(
			(obj: any) => obj.id === action.payload.id,
		);
		const update = state.tableData.splice(itemIndex, 1, action.payload);
		return { ...state, update };
	case tableActions.DELETE_ROW:
		const newTableData = state.tableData.filter(
			(obj: any) => obj.id !== action.payload,
		);
		return { ...state, newTableData };
	case tableActions.HANDLE_ERR:
		return { ...state, error: action.payload };
	default:
		return state;
	}
};
