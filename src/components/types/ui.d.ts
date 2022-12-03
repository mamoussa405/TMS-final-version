/**
 * This file contains custom types for ui component's props and objects
 * that we will use in our app, by ui we mean the components that forms
 * a ui it can contain forms components.
 */
import { ReactElement } from 'react';

/**
 * This is the custom type for the MyStepper component's props it contains the
 * shape of the props object with the mandatory properties that we have
 * to pass to the MyStepper component to work.
 * @see  src/components/ui/MyStepper.tsx
 */
export type MyStepperProps = {
	activeStep: number;
	framework?: string;
};

/**
 * This is the custom type for the DragTable component's props
 * it contains the shape of the props object with the mandatory and the
 * optional properties that we have to pass to this component to work.
 * @see src/components/ui/DragTable.tsx
 */
export type TableProps = {
	title?: string;
	data: any[];
	columns: any[];
	onRowAdd?: (newData: any) => Promise<void>;
	onRowUpdate?: (newData: any, oldData: any) => Promise<void>;
	onRowDelete?: (oldData: any) => Promise<void>;
	loading?: boolean;
	onRowClicked?: (event: any, props: any) => Promise<void>;
	paging?: boolean;
	search?: boolean;
	exportButton?: boolean;
	dropzoneAtTop?: boolean;
	dropzoneText?: string;
	dropzoneSubText?: string;
	downloadSampleExcel?: boolean;
	supportedFiles?: string[];
	onDrop?: (files: File[]) => Promise<void>;
	hideDropZone?: boolean;
	toggleMAction?: () => void;
	addAttachment?: () => void;
	editCell?: boolean;
};

/**
 * This is the custom type for the CardModal object, it contains all the
 * mandatory properties that a CardModal component should have to work.
 * @see src/components/ui/CardModal.tsx
 */
export type CardModalProps = {
	cardModalIsOpen: boolean;
	onClose: (submit: boolean) => void;
	content: string | number;
	title: string;
	checkForContent: boolean;
	children: ReactElement[];
	buttonsProps?: {
		leftButton: {
			name: string;
			color: string;
			endIcon: JSX.Element;
		},
		rightButton: {
			name: string;
			color: string;
			endIcon: JSX.Element;
		},
	},
	isSummaryModal?: boolean;
};

/**
 * This is the custom type for the ConfirmationModal object, it contains all the
 * mandatory properties that a ConfirmationModal component should have to work.
 * @see src/components/ui/ConfirmationModal.tsx
 */
export type ConfirmationModalProps = {
	confirmationModalIsOpen: boolean;
	confirmed: () => void;
	notConfirmed: () => void;
	message: string;
};

/**
 * This is the custom type for the MyCircularProgress props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see src/components/ui/MyCircularProgress.tsx
 */
export type MyCircularProgressProps = {
	color: string;
};
