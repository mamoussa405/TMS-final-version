import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import blue from '@mui/material/colors/blue';

import { EditColumnsProps } from '../types/utils';

/**
 * Renders a new checkbox component in the expenses column
 * @param {EditColumnsProps} -- @object
 * @first onRowDataChange -- a call back to handle the data change
 * @second rowData -- the data in the current row
 * @return {JSX.Element}
 */
export const editExpenses = ({ onRowDataChange, rowData }: EditColumnsProps):
	JSX.Element => {
	return (
		<FormControlLabel
			control={
				<Checkbox
					onChange={(e) => {
						const newRowData = {
							...rowData,
							expenses: e.target.checked,
						};
						if (!newRowData.expenses) {
							newRowData.comments = '';
						}
						onRowDataChange(newRowData);
					}}
					sx={{
						'&.Mui-checked': {
							color: blue['A400'],
						},
						'&:hover': {
							color: blue['A200'],
						},
					}}
				/>
			}
			label=''
		/>
	);
};

/**
 * Renders a new Text field component in the comments column
 * @param {EditColumnsProps} -- @object
 * @first onRowDataChange -- a call back to handle the data change
 * @second rowData -- the data in the current row
 * @return {JSX.Element}
 */
export const editComments = ({ onRowDataChange, rowData }: EditColumnsProps):
	JSX.Element => {
	return (
		<TextField
			variant='standard'
			helperText='If any expenses'
			value={rowData.comments || ''}
			placeholder='Comments'
			disabled={!rowData.expenses}
			onChange={(e) => {
				const newRowData = {
					...rowData,
					comments: e.target.value,
				};
				onRowDataChange(newRowData);
			}}
		/>
	);
};
