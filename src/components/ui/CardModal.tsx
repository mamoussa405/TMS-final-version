/* eslint-disable */
import ReactDom from 'react-dom';
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';

import ConfirmationModal from './ConfirmationModal';
import { CardModalProps } from '../types/ui';

import '../../css/cardModal.css';


/**
 * This is a Card Modal it can take a title and a content to render (JSX) as a body,
 * it also contains two buttons one to close the Modal and an other to confirm the
 * changes made, as well as a confirmation dialog when trying to close the Modal
 * with a written content. The Modal can also be closed by clicking on the shadow
 * near it. Below you will find the comment about each part.
 * @param { CardModalProps } -- object with the following props:
 * @first {cardModalIsOpen} -- this is a flag to track if the card Modal is opened or not
 * @second {onClose} -- this is a function that turns cardModalIsOpen to false means
 * the Modal is closed
 * @third {content} -- this is the content of the element that we are rendring on
 * the Modal body, and it's used to check if we need to open the confirmation Modal
 * when closing the card Modal
 * @fourth {children} -- this an array of JSX element to render on the body
 * @returns
 */

const CardModal: React.FC<CardModalProps> = ({
	cardModalIsOpen,
	onClose,
	content,
	title,
	checkForContent,
	buttonsProps,
	children,
	isSummaryModal,
}: CardModalProps): JSX.Element | null => {
	/**
	 * confirmationModalIsOpen and isConfirmed are two states to track if the confirmation Modal
	 * is opened or not and if the user confirmed the message or not consecutively
	 */
	const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);

	/**
	 * This use effect hook closes the card Modal if the user confirmed the message displayed on
	 * the confirmation Modal, we use useEffect here to not block the rendering of the current
	 * component
	 */
	useEffect(() => {
		if (cardModalIsOpen) {
			setIsConfirmed(false);
			onClose(true);
		}
	}, [isConfirmed]); /* eslint-disable-line */

	if (!cardModalIsOpen) return null;

	/**
	 * confirmed and notConfirmed are two functions that we will send to the confirmation Modal
	 * to handle if the user confirms the message or not
	 */
	const confirmed = () => {
		setIsConfirmed(true);
		setConfirmationModalIsOpen(false);
	};

	const notConfirmed = () => {
		setIsConfirmed(false);
		setConfirmationModalIsOpen(false);
	};

	/**
	 * close function will be called when the user click on the close button on the card Modal,
	 * and it'is used to handle if we are gonna open the confirmation Modal if there is a content
	 * written
	 */
	const close = () => {
		if (content !== '' && checkForContent) {
			setConfirmationModalIsOpen(true);
		} else onClose(false);
	};

	if (confirmationModalIsOpen) {
		return (
			<ConfirmationModal
				message='The content will be cleared'
				confirmationModalIsOpen={confirmationModalIsOpen}
				confirmed={confirmed}
				notConfirmed={notConfirmed}
			/>
		);
	}
	return ReactDom.createPortal(
		<>
			<div className='shadow-container' onClick={() => close()} />
			<Card className='card-modal'>
				{
					(!isSummaryModal) ?
						<div className='card-title1'>
							<Typography variant='h5'>{title}</Typography>
						</div> :
						<div className='card-title2'>
							<Typography variant='h5' className='typography'>{title}</Typography>
							<IconButton color='error' onClick={() => onClose(false)}>
								<CloseIcon />
							</IconButton>
						</div>
				}
				<CardContent className='content'>{children}</CardContent>
				{(!isSummaryModal) && <CardActions>
					<Button
						sx={{ marginRight: 'auto' }}
						size='small'
						variant='contained'
						color={(buttonsProps) ? buttonsProps.leftButton.color as 'success' : 'success'}
						endIcon={(buttonsProps) ? buttonsProps.leftButton.endIcon as JSX.Element : <CloseIcon />}
						onClick={() => close()}>
						{(buttonsProps) ? buttonsProps.leftButton.name : 'close'}
					</Button>
					<Button
						size='small'
						variant='contained'
						color={(buttonsProps) ? buttonsProps.rightButton.color as 'success' : 'success'}
						endIcon={(buttonsProps) ? buttonsProps.rightButton.endIcon as JSX.Element : <KeyboardArrowUpIcon />}
						onClick={() => onClose(true)}>
						{(buttonsProps) ? buttonsProps.rightButton.name : 'submit'}
					</Button>
				</CardActions>
				}
			</Card>
		</>,
		document.getElementById('portal') as HTMLElement,
	);
};

export default CardModal;
