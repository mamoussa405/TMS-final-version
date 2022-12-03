/**
 * This file contains the custom types for the components that
 * we will use as form components, by form components we mean
 * the component that will use as the core for our form.
 * @exemples Select, CheckBox, RadioButtons...
 */

/**
 * This is the custom type for the MySelect component's props it contains the
 * shape of the props object with the mandatory and the optional properties
 * that we have to pass to this component to work.
 * @see src/components/forms/MySelect.tsx
 */
export type MySelectProps = {
	basicInformationForm: any;
	selectInfo: {
		name: string;
		items: ItemToRender[];
	};
	defaultValue?: string | number;
};

/**
 * This is the custom type and the shape of the items the RadioButtons
 * component has to render as an item, it contains the mandatory
 * properties that the item should have, and it's always passed
 * as an array element @type {RadioBottonToRender[]}
 * @see src/components/forms/RadioButtons.tsx
 */
export type RadioButtonToRender = {
	label: string;
	value: string;
};


/**
 * This is the custom type for the MyRadioButtons component's props
 * it contains the shape of the props object with the mandatory properties
 * that we have to pass to this component to work.
 * @see src/components/forms/MyRadioButtons.tsx
 */
export type MyRadioButtonProps = {
	basicInformationForm: any;
	radioInfo: {
		name: string;
		label: string;
		items: RadioButtonToRender[];
	};
};

/**
 * This is the custom type for the MyTextField component's props
 * it contains the shape of the props object with the mandatory and the
 * optional properties that we have to pass to this component to work.
 * @see src/components/forms/MyTextField.tsx
 */
export type MyTextFieldProps = {
	basicInformationForm: any;
	textFieldInfo: {
		name: string;
		disabled: boolean;
		type: string;
		inputAdornment: boolean;
		multiline: boolean;
		required: boolean;
		label?: string;
		placeholder?: string;
		rows?: number;
	};
	value?: string | number;
	additionalStyles?: {};
};

/**
 * This is a custom type for the porps object's shape for the MyCheckBox
 * component, with the mandatory properties that we should pass for it
 * to work.
 * @see src/components/forms/MyCheckBox.tsx
 */
export type MyCheckBoxProps = {
	basicInformationForm: any;
	checkBoxInfo: {
		name: string;
		label: string;
		labelPosition: LabelPosition;
	};
	additionalStyle?: {
		marginR: string;
	};
};
