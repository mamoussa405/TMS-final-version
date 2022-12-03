import { actionTypes } from './actions';
import { AnyAction } from 'redux';

const initialState: any = {
	allTaskOrders: [],
	allPSA: [],
	activePSA: [],
	closePSA: [],
	error: null,
	timelines: [],
};

export const taskOrderReducers = (state = initialState, action: AnyAction) => {
	switch (action.type) {
	case actionTypes.STORE_DATA:
		return { ...state, allTaskOrders: action.payload };
	case actionTypes.GET_PSA_REQUEST:
		return { ...state, allPSA: action.payload };
	case actionTypes.GET_ACTIVE_PSA:
		return { ...state, activePSA: action.payload };
	case actionTypes.GET_CLOSED_PSA:
		return { ...state, closePSA: action.payload };
	case actionTypes.GET_TIMELINES:
		return { ...state, timelines: action.payload };
	case actionTypes.HANDLE_ERR:
		return { ...state, error: action.payload };
	default:
		return state;
	}
};
