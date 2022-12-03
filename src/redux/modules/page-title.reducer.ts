// page reducer for setting page title on page change

import { AnyAction } from 'redux';

export interface PageTitleState {
	title: string;
}

export const PageTitleActions = {
	SET_PAGE_TITLE: 'SET_PAGE_TITLE',
};

export const initialState: PageTitleState = {
	title: 'Home Page',
};

export const setPageTitle = (title: string) => {
	return {
		type: PageTitleActions.SET_PAGE_TITLE,
		payload: title,
	};
};

/**
 * @param  {PageTitleState} state
 * @param  {AnyAction} action
 * @return {PageTitleState}
 */
export function pageTitleReducer(
	state: PageTitleState = initialState,
	action: AnyAction,
):PageTitleState {
	switch (action.type) {
	case PageTitleActions.SET_PAGE_TITLE:
		return { ...state, title: action.payload };
	default:
		return state;
	}
}
