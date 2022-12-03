import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
	EditBareCostColumnProps,
	EditJESABilledRateColumnProps,
	EditTotalCostColumnProps,
	EditTotalHoursColumnProps,
	EditMonthColumnProps,
	EditFrameworkColumnProps,
} from '../../types/forms';

export const EditBareCostColumn: React.FC<EditBareCostColumnProps> = ({
	resources,
	rowData,
}: EditBareCostColumnProps): JSX.Element => {
	/**
	 * State to manage the text field value change, its init value
	 * will be the Bare Cost if it's already filled in case we are not at
	 * the Initiate the request phase or '0' otherwise.
	 */
	const currRow = resources[rowData.id || 0];
	const [value, setValue] = useState(
		currRow.bareCost || '0');

	currRow.bareCost = +value;
	/**
	 * Callback to re-render the component if an other component related to
	 * this one has changed, in this case the Total hours.
	 * @param {number} totalHours -- The current total hours.
	 */
	currRow.renderBareCost = (totalHours: number) => {
		setValue(totalHours * +currRow.bwr);
	};
	return (
		<TextField
			disabled
			variant='standard'
			type='number'
			value={value}
		/>
	);
};

export const EditJESABilledRateColumn: React.FC<EditJESABilledRateColumnProps> =
	({
		resources,
		rowData,
		formikValues,
	}: EditJESABilledRateColumnProps): JSX.Element => {
		/**
		 * State to manage the text field value change, its init value
		 * will be the JESABilledRate if it's already filled in case we are not at
		 * the Initiate the request phase or (BWR * MT) + ODC + ADC + LDC the
		 * mltipliers are from the FSA framework as default, otherwise.
		 */
		const currRow = resources[rowData.id || 0];
		const JESABilledRate = (+currRow.bwr * formikValues.multipliers_MT_COST) +
			formikValues.multipliers_ODC + formikValues.multipliers_ADC +
			formikValues.multipliers_LDC;
		const [value, setValue] = useState(
			currRow.JESABilledRate || '' + JESABilledRate);

		currRow.JESABilledRate = +value;
		/**
		 * Callback to re-render the component if an other component related to
		 * this one has changed, in this case the Framework, we will choose the
		 * multipliers depending on which framework the user selected.
		 * @param {string} framework -- The selected framework.
		 */
		currRow.renderJESABilledRate = (framework: string) => {
			const MT_COST = (framework === 'FSA') ? formikValues.multipliers_MT_COST
				: formikValues.multipliersFSAAgency_MT_COST;
			const ODC = (framework === 'FSA') ? formikValues.multipliers_ODC
				: formikValues.multipliersFSAAgency_ODC;
			const ADC = (framework === 'FSA') ? formikValues.multipliers_ADC
				: formikValues.multipliersFSAAgency_ADC;
			const LDC = (framework === 'FSA') ? formikValues.multipliers_LDC
				: formikValues.multipliersFSAAgency_LDC;
			const billedRate = (+currRow.bwr * MT_COST) + ODC + ADC + LDC;

			setValue(billedRate);
			/**
			 * re-render the Total Labor Cost because its formula is related to the
			 * JESA Billed Rate, the formula is:
			 * Total Labor Cost = Total Hours * JESA Billed Rate
			 */
			currRow.renderTotalCost(currRow.totalHours, billedRate);
		};
		return (
			<TextField
				disabled
				variant='standard'
				value={value}
			/>
		);
	};

export const EditTotalCostColumn: React.FC<EditTotalCostColumnProps> = ({
	resources,
	rowData,
}: EditTotalCostColumnProps): JSX.Element => {
	/**
	 * State to manage the text field value change, its init value
	 * will be the Total Labor Cost if it's already filled in case we are not at
	 * the Initiate the request phase or 0 otherwise.
	 * The formula to calculate the Total Labor Cost is:
	 * Total Labor Cost = JESA Billed Rate * Total Hours
	 */
	const currRow = resources[rowData.id || 0];
	const [value, setValue] = useState(
		currRow.totalCost || '0');

	currRow.totalCost = +value;
	/**
	 * Callback to re-render the component if an other component related to
	 * this one has changed, in this case the Total hours and Jesa Billed Rate.
	 * @param {number} totalHours -- The current total hours.
	 * @param {number} billedRate -- The current JESA Billed Rate.
	 */
	currRow.renderTotalCost = (totalHours: number, billedRate: number) => {
		setValue(totalHours * billedRate);
	};
	return (
		<TextField
			disabled
			variant='standard'
			value={value}
		/>
	);
};

export const EditTotalHoursColumn: React.FC<EditTotalHoursColumnProps> = ({
	resources,
	rowData,
}: EditTotalHoursColumnProps): JSX.Element => {
	/**
	 * State to manage the text field value change, its init value
	 * will be the Total Labor Hours if it's already filled in case
	 * we are not at the Initiate the request phase or 0 otherwise.
	 */
	const currRow = resources[rowData.id || 0];
	const [value, setValue] = useState(currRow.totalHours || '0');

	currRow.totalHours = +value;
	/**
	 * Callback to re-render the component if an other component related to
	 * this one has changed, in this case each one of the months components.
	 */
	currRow.renderTotalHours = () => {
		const totalHours = currRow.ma + currRow.mb + currRow.mc +
			currRow.md + currRow.me + currRow.mf + currRow.mg +
			currRow.mh + currRow.mi + currRow.mj + currRow.mk +
			currRow.ml;

		setValue('' + totalHours);

		/**
		 * re-render the Bare Cost because its formula is related to the
		 * Total Labor Hours, the formula is:
		 * Bare Cost = BWR * Total Hours
		 */
		currRow.renderBareCost(+totalHours);
		/**
		 * re-render the Total Labor Cost because its formula is related to the
		 * Total Labor Hours, the formula is:
		 *  Total Labor Cost = JESA Billed Rate * Total Hours
		 */
		currRow.renderTotalCost(+totalHours, currRow.JESABilledRate);
	};
	return (
		<TextField
			disabled
			variant='standard'
			value={value}
		/>
	);
};

export const EditMonthColumn: React.FC<EditMonthColumnProps> = ({
	resources,
	rowData,
	id,
}: EditMonthColumnProps): JSX.Element => {
	/**
	 * State to manage the text field value change, its init value
	 * will be the month value depending on the id if it's already
	 * filled in case we are not at the Initiate the request phase
	 * or 0 otherwise.
	 */
	const currRow = resources[rowData.id || 0];
	const [value, setValue] = useState(currRow[`m${id}`] || '0');

	currRow[`m${id}`] = +value;
	return (
		<TextField
			variant='standard'
			type='number'
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
				currRow[`m${id}`] = +e.target.value;
				/**
				 * re-render the Total Hours because its formula is related to the
				 * current month value.
				 */
				currRow.renderTotalHours();
			}}
		/>
	);
};

export const EditFrameworkColumn: React.FC<EditFrameworkColumnProps> = ({
	resources,
	rowData,
}: EditFrameworkColumnProps): JSX.Element => {
	/**
	 * State to manage the text field value change, its init value
	 * will be the Framework if it's already filled in case we are
	 * not at the Initiate the request phase or 'FSA' otherwise.
	 */
	const currRow = resources[rowData.id || 0];
	const [value, setValue] = useState(currRow.framework || 'FSA');

	currRow.framework = value;
	return (
		<Select
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
				/**
				 * re-render the JESA Billed Rate because its formula is related to the
				 * current framework value.
				 */
				currRow.renderJESABilledRate(e.target.value);
			}}
			sx={
				{
					'& legend': { display: 'none' },
					'& fieldset': { top: 0 },
				}
			}
		>
			<MenuItem value='FSA'>FSA</MenuItem>
			<MenuItem value='FSA Agency'>FSA Agency</MenuItem>
		</Select>
	);
};
