import { useCallback } from 'react';

import {
	HoursSplitProps,
	HoursSplitResources,
} from '../../types/forms';
import DragTable from '../../../../components/ui/DragTable';
import {
	EditBareCostColumn,
	EditJESABilledRateColumn,
	EditTotalCostColumn,
	EditTotalHoursColumn,
	EditMonthColumn,
	EditFrameworkColumn,
} from './HoursSplitEditColumns';

/**
 * Renders the Hours Split table
 * @param {HoursSplitProps} -- Object with the following props:
 * @first resources -- These are the already filled resources in the
 * expression of the needs phase and the resources step (init the request phase)
 * @second formikValues -- This the Formik values that already set, we will need
 * it to get the multipliers
 * @return {JSX.Element}
 */
const HoursSplit: React.FC<HoursSplitProps> = ({
	resources,
	formikValues,
}: HoursSplitProps) => {
	/**
	 * The Bare Cost callback, it will render a custom text field
	 * in which we will display the Bare Cost. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render.
	 */
	const editBareCostCB = useCallback((
		rowData: HoursSplitResources,
	): JSX.Element => {
		return (
			<EditBareCostColumn resources={resources} rowData={rowData} />
		);
	}, [resources]);
	/**
	 * The JESA Billed Rate callback, it will render a custom text field
	 * in which we will display the JESA Billed Rate. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render.
	 */
	const editJESABilledRateCB = useCallback((
		rowData: HoursSplitResources,
	): JSX.Element => {
		return (
			<EditJESABilledRateColumn
				resources={resources}
				rowData={rowData}
				formikValues={formikValues} />
		);
	}, [resources]); /*eslint-disable-line*/
	/**
	 * The Total Labor Cost callback, it will render a custom text field
	 * in which we will display the Total Labor Cost. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render.
	 */
	const editTotalCostCB = useCallback((
		rowData: HoursSplitResources,
	): JSX.Element => {
		return (
			<EditTotalCostColumn resources={resources} rowData={rowData} />
		);
	}, [resources]);
	/**
	 * The Total Labor Hours callback, it will render a custom text field
	 * in which we will display the Total Labor Hours. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render.
	 */
	const editTotalHoursCB = useCallback((
		rowData: HoursSplitResources,
	): JSX.Element => {
		return (
			<EditTotalHoursColumn resources={resources} rowData={rowData} />
		);
	}, [resources]);
	/**
	 * The Months callback, it will render a custom text field
	 * from which we will get each month value. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render. And
	 * because we are using useCallback we can't use a loop to render
	 * all the months from 1 to 12, because of the roles of hooks, we
	 * can't use the hook inside a for of if statement, hence we hard
	 * coded each month with a different id.
	 */
	const editMonth1CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='a' />
		);
	}, [resources]);
	const editMonth3CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='b' />
		);
	}, [resources]);
	const editMonth4CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='c' />
		);
	}, [resources]);
	const editMonth5CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='d' />
		);
	}, [resources]);
	const editMonth6CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='e' />
		);
	}, [resources]);
	const editMonth7CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='f' />
		);
	}, [resources]);
	const editMonth8CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='g' />
		);
	}, [resources]);
	const editMonth9CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='h' />
		);
	}, [resources]);
	const editMonth10CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='i' />
		);
	}, [resources]);
	const editMonth11CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='j' />
		);
	}, [resources]);
	const editMonth12CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='k' />
		);
	}, [resources]);
	const editMonth2CB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditMonthColumn resources={resources} rowData={rowData} id='l' />
		);
	}, [resources]);
	/**
	 * The Framework callback, it will render a custom text field
	 * from which we will get the Framework. We are using useCallback
	 * to avoid rendering the component in each HoursSplit render.
	 */
	const editframeworkCB = useCallback((
		rowData: HoursSplitResources,
	) => {
		return (
			<EditFrameworkColumn resources={resources} rowData={rowData} />
		);
	}, [resources]);

	return (
		<>
			<DragTable
				title='Hours Split'
				data={resources}
				columns={[
					{
						field: 'firstName',
						title: 'First Name',
					},
					{
						field: 'lastName',
						title: 'Last Name',
					},
					{
						field: 'taskCode',
						title: 'Task Code',
					},
					{
						field: 'bwr',
						title: 'BWR',
					},
					{
						field: 'bareCost',
						title: 'Bare Cost',
						render: editBareCostCB,
					},
					{
						field: 'JESABilledRate',
						title: 'JESA Billed Rate',
						render: editJESABilledRateCB,
					},
					{
						field: 'totalCost',
						title: 'Total Labor Cost',
						render: editTotalCostCB,
					},
					{
						field: 'totalHours',
						title: 'Total Labor Hours',
						render: editTotalHoursCB,
					},
					{
						field: 'ma',
						title: 'M1',
						type: 'numeric',
						render: editMonth1CB,
					},
					{
						field: 'mb',
						title: 'M2',
						type: 'numeric',
						render: editMonth2CB,
					},
					{
						field: 'mc',
						title: 'M3',
						type: 'numeric',
						render: editMonth3CB,
					},
					{
						field: 'md',
						title: 'M4',
						type: 'numeric',
						render: editMonth4CB,
					},
					{
						field: 'me',
						title: 'M5',
						type: 'numeric',
						render: editMonth5CB,
					},
					{
						field: 'mf',
						title: 'M6',
						type: 'numeric',
						render: editMonth6CB,
					},
					{
						field: 'mg',
						title: 'M7',
						type: 'numeric',
						render: editMonth7CB,
					},
					{
						field: 'mh',
						title: 'M8',
						type: 'numeric',
						render: editMonth8CB,
					},
					{
						field: 'mi',
						title: 'M9',
						type: 'numeric',
						render: editMonth9CB,
					},
					{
						field: 'mj',
						title: 'M10',
						type: 'numeric',
						render: editMonth10CB,
					},
					{
						field: 'mk',
						title: 'M11',
						type: 'numeric',
						render: editMonth11CB,
					},
					{
						field: 'ml',
						title: 'M12',
						type: 'numeric',
						render: editMonth12CB,
					},
					{
						field: 'framework',
						title: 'Framework',
						type: 'string',
						render: editframeworkCB,
					},
					{
						field: 'expenses',
						title: 'Expenses',
						type: 'boolean',
					},
					{
						field: 'comments',
						title: 'Comments',
					}]}
				hideDropZone
				exportButton
			/>
		</>
	);
};

export default HoursSplit;
