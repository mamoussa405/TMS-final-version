import { combineReducers } from 'redux';
import { pageTitleReducer, PageTitleState } from './modules/page-title.reducer';
import { taskOrderReducers } from './modules/request';
import { toParametersTableReducer } from './modules/toParameter-settings';

// root reducer to the application
const root = combineReducers({
	page: pageTitleReducer,
	request_data: taskOrderReducers,
	to_paramters_tableData: toParametersTableReducer,
});

// types for the root reducer
export interface RootState {
	page: PageTitleState;
}

export default root;
