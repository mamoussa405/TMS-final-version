
import { useCallback, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import {
	ResourcesProps,
	InitTheRequestResource,
	EditBWRColumnProps,
	EditTaskCodeColumnProps,
} from '../../types/forms';
import DragTable from '../../../../components/ui/DragTable';

import '../../../../css/initTheRequest.css';

/**
 * Renders the custom component to use in the BWR column as a
 * substitution of the default one, it will manage the value
 * state and validate the required format.
 * @param {EditBWRColumnProps} -- Object with the following props:
 * @first resources -- Array of resources items, with the required
 * info filled in the expression of the needs phase, we will use it
 * to store the BWR.
 * @return {JSX.Element}
 */
const EditBWRColumn: React.FC<EditBWRColumnProps> =
	({ resources, rowData }: EditBWRColumnProps): JSX.Element => {
		/**
		 * State to manage the text field value change, its init value
		 * will be the BWR if it's already filled in case we are not at
		 * the Initiate the request phase or empty string otherwise.
		 */
		const [value, setValue] = useState(resources[rowData.id || 0].bwr || '');
		/**
		 * RegExp to validate the required format which is:
		 * number
		 * \d+.2d
		 */
		const validate = /^\d+(\.\d{2})*$/.test(value);

		resources[rowData.id || 0].bwr = value;
		/**
		 * If the BWR is not in the correct format we will set an
		 * error var to true, or false otherwise.
		 */
		resources[rowData.id || 0].BWRError = !validate;
		return (
			<TextField
				error={!validate}
				variant='standard'
				placeholder='BWR'
				type='number'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		);
	};

/**
 * Renders the custom component to use in the Task Code column as a
 * substitution of the default one, it will manage the value
 * state and validate the required format.
 * @param {EditTaskCodeColumnProps} -- Object with the following props:
 * @first resources -- Array of resources items, with the required
 * info filled in the expression of the needs phase, we will use it
 * to store the Task Code.
 * @return {JSX.Element}
 */
const EditTaskCodeColumn: React.FC<EditTaskCodeColumnProps> =
	({ resources, rowData }: EditTaskCodeColumnProps):
		JSX.Element => {
		/**
		 * State to manage the text field value change, its init value
		 * will be the Task Code if it's already filled in case we are not at
		 * the Initiate the request phase or empty string otherwise.
		 */
		const [value, setValue] = useState(
			resources[rowData.id || 0].taskCode || '');
		/**
		 * RegExp to validate the required format which is:
		 * x.xx.xx
		 */
		const validate = /^\w\.\w{2}\.\w{2}$/.test(value);

		resources[rowData.id || 0].taskCode = value;
		/**
		 * If the Task Code is not in the correct format we will set an
		 * error var to true, or false otherwise.
		 */
		resources[rowData.id || 0].taskCodeError = !validate;
		return (
			<TextField
				error={!validate}
				helperText={(!validate)
					? 'The correct format is X.XX.XX' : ''}
				variant='standard'
				placeholder='Task Code'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
		);
	};
/**
 * This is the first page to render in the initiate the request phase if
 * the contract type is reimbursable.
 * @param {ResourcesProps} -- Object with the following props:
 * @first resources -- These are the already filled resources in the
 * expression of the needs phase.
 * @second onResourcesSubmit -- This is the function handler for the Next
 * button click event.
 * @third onBackClick -- This is the function handler for the Back button
 * click event.
 * @fourth submitting -- This is the submittion state it will let us decide
 * if we gonna disable the Next and the Back buttons or not.
 * @return {JSX.Element}
 */
const Resources: React.FC<ResourcesProps> = ({
	resources,
	onResourcesSubmit,
	onBackClick,
	submitting,
}: ResourcesProps): JSX.Element => {
	/**
	 * editBWR and editTaskCode are callBacks that will be passed to
	 * the render callBack in the table columns to render a custom
	 * component instead of using the default one, we pass them to the useCallback
	 * hook to silent the state losing error when the Resources component
	 * render each time, the useCallback hook let the callbacks that we will use
	 * change if the resources change.
	 */
	const editBWR = useCallback(
		(rowData: InitTheRequestResource) => {
			return (
				<EditBWRColumn
					rowData={rowData}
					resources={resources} />
			);
		}, [resources]);
	const editTaskCode = useCallback(
		(rowData: InitTheRequestResource) => {
			return (
				<EditTaskCodeColumn
					rowData={rowData}
					resources={resources} />
			);
		}, [resources]);

	return (
		<>
			<DragTable
				title='Resources'
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
						field: 'bwr',
						title: 'BWR',
						editable: 'always',
						type: 'string',
						render: editBWR,
					},
					{
						field: 'function',
						title: 'Function',
					},
					{
						field: 'taskCode',
						title: 'Task Code',
						editable: 'always',
						type: 'string',
						render: editTaskCode,
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
			<div className='resources-buttons-div'>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					startIcon={<NavigateBeforeIcon />}
					type='submit'
					onClick={() => onBackClick()}>
					Back
				</Button>
				<Button
					disabled={submitting}
					variant='contained'
					color='primary'
					endIcon={<NavigateNextIcon />}
					type='submit'
					onClick={() => onResourcesSubmit(resources)}>
					Next
				</Button>
			</div>
		</>
	);
};

export default Resources;
