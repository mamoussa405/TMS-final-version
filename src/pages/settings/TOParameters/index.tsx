import React, { useEffect } from 'react';
import { Multipliers, OfficeTable, Projects, Suffixes } from './subpages';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../redux/modules/page-title.reducer';
// Component for the TO Parameter subpage
const TOParameters: React.FC = (props: any) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageTitle('Settings: TO Parameters'));
	}, []); /* eslint-disable-line */

	// render the available tables dynamically
	const renderTpye = () => {
		switch (props.match.params.type) {
		case 'office-table':
			return <OfficeTable />;
		case 'projects':
			return <Projects />;
		case 'suffixes':
			return <Suffixes />;
		case 'multipliers':
			return <Multipliers />;
		}
	};
	return <div>{renderTpye()}</div>;
};

export default TOParameters;
