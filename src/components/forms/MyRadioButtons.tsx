import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import {
	MyRadioButtonProps,
	RadioButtonToRender,
} from '../types/forms';

const renderButtons = (items: RadioButtonToRender[]): JSX.Element[] => {
	const jsxElements: JSX.Element[] = items.map(
		(item: RadioButtonToRender, key: number) => {
			return (
				<FormControlLabel
					value={item.value}
					control={<Radio />}
					label={item.label}
					key={key}
				/>
			);
		},
	);
	return jsxElements;
};

const MyRadioButtons: React.FC<MyRadioButtonProps> = ({
	basicInformationForm,
	radioInfo,
}: MyRadioButtonProps): JSX.Element => {
	const { values, setFieldValue, errors } = basicInformationForm;
	const { name, label, items } = radioInfo;
	return (
		<FormControl fullWidth error={!!errors[name]}>
			<FormLabel
				required
				sx={{
					margin: '0',
					marginBottom: '10px',
					color: '#00001a',
					fontWeight: '500 !important',
					fontSize: '1.2rem',
				}}
				id='demo-row-radio-buttons-group-label'>
				{label}
			</FormLabel>
			<RadioGroup
				row
				aria-labelledby='demo-row-radio-buttons-group-label'
				name={name}
				value={values[name]}
				onChange={(e) => {
					setFieldValue(name, e.target.value);
				}}>
				{renderButtons(items)}
			</RadioGroup>
		</FormControl>
	);
};

export default MyRadioButtons;
