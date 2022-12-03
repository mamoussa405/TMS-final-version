/* eslint-disable */
import Select from '@mui/material/Select';
import { styled } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import blue from '@mui/material/colors/blue';

import { MySelectProps } from '../types/forms';
import { ItemToRender } from '../../@types/customTypes';

const CustomSelect = styled(Select)({
	borderRadius: '12px !important',
	'&:hover .MuiOutlinedInput-notchedOutline': {
		border: `2px solid ${blue['A200']} !important`,
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: `${blue['A400']} !important`,
	},
});

const renderItems = (items: ItemToRender[]) => {
	const tsxItems = items.map((item: ItemToRender, key: number) => {
		return (
			<MenuItem value={item.value} key={key}>
				{item.name}
			</MenuItem>
		);
	});
	return tsxItems;
};

const MySelect: React.FC<MySelectProps> = ({
	basicInformationForm,
	selectInfo,
	defaultValue,
}: MySelectProps) => {
	const { handleChange, handleBlur, values, errors } = basicInformationForm;
	const { name, items } = selectInfo;

	const label: string =
		values[name] !== ''
			? ''
			: defaultValue !== undefined
				? (defaultValue as string)
				: 'Nothing Selected';
	return (
		<FormControl fullWidth>
			<InputLabel
				id='demo-simple-select-label'
				required={values[name] === '' && defaultValue === undefined}>
				{label}
			</InputLabel>
			<CustomSelect
				labelId='demo-simple-select-label'
				name={name}
				defaultValue={defaultValue}
				value={values[name]}
				label={label}
				onChange={handleChange}
				onBlur={handleBlur}
				error={!!errors[name]}
				sx={
					values[name] === ''
						? {}
						: {
							'& legend': { display: 'none' },
							'& fieldset': { top: 0 },
						}
				}
				MenuProps={{
					PaperProps: {
						sx: {
							borderRadius: '12px',
							marginTop: 0.5,
							maxHeight: '150px',
						},
					},
					MenuListProps: {
						sx: {
							li: {
								fontWeight: 200,
								paddingTop: 0.75,
								paddingBottom: 0.75,
								'&:hover': {
									background: blue['A200'],
								},
								'&.Mui-selected': {
									background: blue['A400'],
									color: 'white',
								},
								'&.Mui-selected:hover': {
									background: blue['A700'],
								},
							},
						},
					},
				}}>
				{renderItems(items)}
			</CustomSelect>
		</FormControl>
	);
};

export default MySelect;
