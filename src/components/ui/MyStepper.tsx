import clsx from 'clsx';
import { Check, Create, InsertDriveFile, List } from '@material-ui/icons';
import { makeStyles, StepIconProps } from '@material-ui/core';
import {
	Step,
	StepConnector,
	StepLabel,
	Stepper,
	withStyles,
} from '@material-ui/core';

import { MyStepperProps } from '../types/ui';

// stepper styles
const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
	},
});

// stepper connector
const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 20,
	},
	active: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
		},
	},
	completed: {
		'& $line': {
			backgroundImage:
				'linear-gradient( 95deg,rgb(30,50,127) 0%,rgb(133, 144, 208) 50%,rgb(66, 145, 245) 100%)', // eslint-disable-line
		},
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: '#eaeaf0',
		borderRadius: 1,
	},
})(StepConnector);

/**
 * stepper icons
 * @param {StepIconProps} props
 * @return {JSX.Element}
 */
function ColorlibStepIcon(props: StepIconProps): JSX.Element {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <Create />,
		2: <List />,
		3: <InsertDriveFile />,
		4: <Check />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}>
			{icons[String(props.icon)]}
		</div>
	);
}
const PSA_STEPS = ['Basic Information', 'Checklist', 'Generate Document', 'Finish']; /* eslint-disable-line*/
const FSA_STEPS = ['Expression Of The Needs', 'Initiate The Request', 'Step3', 'Step4']; /* eslint-disable-line*/
/**
 * @param {number} activeStep
 * @return {JSX.Element}
 */
const MyStepper: React.FC<MyStepperProps> = ({
	activeStep,
	framework,
}: MyStepperProps): JSX.Element => {
	/**
	 * Render the FSA_STEPS in case of FSA framework
	 */
	if (framework === 'FSA') {
		return (
			<Stepper
				className='pb-5'
				alternativeLabel
				activeStep={activeStep}
				connector={<ColorlibConnector />}>
				{FSA_STEPS.map((step) => (
					<Step key={step}>
						<StepLabel StepIconComponent={ColorlibStepIcon}>
							{step}
						</StepLabel>
					</Step>
				))}
			</Stepper>

		);
	}
	/**
	 * Render the PSA_STEPS in case of PSA framework
	 */
	return (
		<Stepper
			className='pb-5'
			alternativeLabel
			activeStep={activeStep}
			connector={<ColorlibConnector />}>
			{PSA_STEPS.map((step) => (
				<Step key={step}>
					<StepLabel StepIconComponent={ColorlibStepIcon}>
						{step}
					</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default MyStepper;
