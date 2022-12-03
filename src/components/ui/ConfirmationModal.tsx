import ReactDom from 'react-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';

import { ConfirmationModalProps } from '../types/ui';

const MODAL_STYLES = {
	position: 'fixed' as 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	zIndex: 2000,
	maxWidth: '500px',
	backgrounColor: 'red',
};

const SHADOW_STYLES = {
	position: 'fixed' as 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, .7)',
	zIndex: 2000,
};

/**
 *
 * This is a confirmation Modal, it will display a message and two buttons one
 * to confirm it and an other to discard it.
 * @param {ConfirmationModalProps} -- object with the following props:
 * @first {confirmationModalIsOpen} -- this is a boolean to track if the
 * confirmation Modal is opened or not.
 * @second {confirmed} -- this is a function to handle if the user confirms
 * the message.
 * @third {notConfirmed} -- this is a function to handle if the user discards
 * the message.
 * @fourth {message} -- this is the message to display
 * @returns
 */

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	confirmationModalIsOpen,
	confirmed,
	notConfirmed,
	message,
}: ConfirmationModalProps) => {
	if (!confirmationModalIsOpen) return null;

	return ReactDom.createPortal(
		<>
			<div style={SHADOW_STYLES} />
			<Card sx={MODAL_STYLES}>
				<CardContent>
					<Typography variant='h6'>{message}</Typography>
				</CardContent>
				<CardActions>
					<Button
						sx={{ marginRight: 'auto' }}
						size='small'
						variant='contained'
						color='error'
						endIcon={<CloseIcon />}
						onClick={() => notConfirmed()}>
						Cancel
					</Button>
					<Button
						size='small'
						variant='contained'
						color='success'
						endIcon={<DoneIcon />}
						onClick={() => confirmed()}>
						ok
					</Button>
				</CardActions>
			</Card>
		</>,
		document.getElementById('portal') as HTMLElement,
	);
};

export default ConfirmationModal;
