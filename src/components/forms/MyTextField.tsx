import TextField from '@mui/material/TextField';
import { styled } from '@mui/styles';
import blue from '@mui/material/colors/blue';
import { InputLabelProps } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';

import { MyTextFieldProps } from '../types/forms';

const CustomTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderRadius: '12px',
		},
		'&:hover fieldset': {
			border: `2px solid ${blue['A200']}`,
		},
		'&.Mui-focused fieldset': {
			borderColor: blue['A400'],
		},
	},
});

/**
 * This is an edge case for the input label, if we have text field
 * type date we should display the label at the top not the middle
 * of the text field.
 * @param {string} type -- the type of the text field
 * @return {Partial<InputLabelProps>} -- the @Partial is an utility
 * type for creating a new type from an existing type converting
 * all its properties to optional ?
 * @see https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript#partial-type
 */
const inputLabel = (type: string): Partial<InputLabelProps> => {
	return type === 'date' ? { shrink: true } : {};
};
const MyTextField: React.FC<MyTextFieldProps> = ({
	basicInformationForm,
	textFieldInfo,
	value,
	additionalStyles,
}: MyTextFieldProps): JSX.Element => {
	const { values, errors, handleChange, handleBlur } = basicInformationForm;
	const {
		name,
		label,
		type,
		disabled,
		inputAdornment,
		multiline,
		placeholder,
		required,
		rows,
	} = textFieldInfo;

	if (disabled) {
		return (
			<CustomTextField
				fullWidth
				variant='outlined'
				disabled
				sx={additionalStyles}
				value={(value) ? value : values[name]}
				InputLabelProps={{ ...inputLabel(type) }}
				type={type}
				label={label}
				placeholder={placeholder}
			/>
		);
	}

	return (
		<CustomTextField
			name={name}
			required={required}
			fullWidth
			multiline={multiline}
			rows={(rows) ? rows : 4}
			variant='outlined'
			sx={additionalStyles}
			placeholder={placeholder}
			InputLabelProps={{ ...inputLabel(type) }}
			label={label}
			type={type}
			value={values[name]}
			error={!!errors[name]}
			onChange={handleChange}
			onBlur={handleBlur}
			InputProps={{
				startAdornment: inputAdornment && (
					<InputAdornment position='start'>$</InputAdornment>
				),
			}}
		/>
	);
};

export default MyTextField;
