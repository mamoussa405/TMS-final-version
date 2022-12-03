import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import blue from '@mui/material/colors/blue';

import { MyCheckBoxProps } from '../types/forms';

/**
 * This is a custom CheckBox which uses the Checkbox component from MUI
 * it needs an object as @param {CheckBoxProps} which contains two
 * properties:
 * @first {basicInformationForm} this is the object returned by
 * useFormik hook.
 * @second {checkBoxInfo} this contains the info about the
 * CheckBox:
 * @first_info {name} this is the name given in the useFormik hook,
 * @second_info {label} the text that will be display next to the Checkbox,
 * @third_info {labelPosition} this is the label position
 * {start, end, top, bottom}
 * @return {JSX.Element}
 */
const MyCheckbox: React.FC<MyCheckBoxProps> = ({
	basicInformationForm,
	checkBoxInfo,
	additionalStyle,
}: MyCheckBoxProps): JSX.Element => {
	const { name, label, labelPosition } = checkBoxInfo;
	const { values, handleChange, handleBlur } = basicInformationForm;

	return (
		<FormControlLabel
			componentsProps={{
				typography: {
					fontFamily:
						"'Helvetica', 'Arial', 'sans-serif'" /* eslint-disable-line */,
					fontSize: '1.2rem',
					fontWeight: '500 !important',
					color: '#00001a',
					marginRight: additionalStyle?.marginR,
				},
			}}
			sx={{
				marginLeft: '0',
			}}
			control={
				<Checkbox
					name={name}
					checked={values[`${name}`]}
					onChange={handleChange}
					onBlur={handleBlur}
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
			label={label}
			labelPlacement={labelPosition}
		/>
	);
};

export default MyCheckbox;
