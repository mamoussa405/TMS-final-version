import CircularProgress from '@mui/material/CircularProgress';

import { MyCircularProgressProps } from '../types/ui';

/**
 * The styling object for the Circular Progress, we will pass it
 * as a style extension
 */
const MyCircularProgressStyles = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

/**
 * Custom Circular progress that uses MUI CircularProgress as internal
 * component.
 * @link https://mui.com/material-ui/api/circular-progress/
 * @param {MyCircularProgressProps} -- Object with custom props
 * @return {JSX.Element}
 */
const MyCircularProgress: React.FC<MyCircularProgressProps> =
	({ color }: MyCircularProgressProps): JSX.Element => {
		return (
			<CircularProgress sx={MyCircularProgressStyles}
				color={color as 'primary'} size={60} />
		);
	};

export default MyCircularProgress;
