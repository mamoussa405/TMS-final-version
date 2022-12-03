/**
 * This file contains common custom types that we will use in our
 * app, by common we mean that we will use these types in all our
 * app components, pages and utils.
 */

/**
 * This is the shape for the dynamic objects that we will use in the app,
 * we use this type when we can't expect how the object shape will look
 * like.
 */
export type DynamicObject = {
	[key: string]: string | number | boolean;
};

/**
 * This dynamic type will represent the data type that we will fetch from
 * sharepoint
 */
export type DataTypeFromSP = string | number;

/**
 * This is the custom type for the label position the CheckBox component
 * should have.
 * @see src/components/forms/CheckBox.tsx
 */
export type LabelPosition = 'end' | 'start' | 'top' | 'bottom' | undefined;

/**
 * This is the custom type and the shape of the items the Select
 * component has to render as menu items, it contains the mandatory and the
 * optional properties that the item should contain, and it's always passed
 * as an array element @type {ItemToRender[]}
 * @see src/components/forms/Select.tsx
 */
export type ItemToRender = {
	name: string;
	value?: string | number;
};


/**
 * This is the custom type for the NewFSA component props it contains the
 * shape of the props object with the mandatory properties that we have
 * to pass to this component to work.
 * @see  /src/pages/FSA/newFSA.tsx
 */
export type NewFSAProps = {
	curUserInfo: DynamicObject;
};

/**
 * This is the custom type for the MyRequests component props it contains the
 * shape of the props object with the mandatory properties that we have
 * to pass to this component to work.
 * @see  /src/pages/Requests/my-requests.tsx
 */
export type MyRequestsProps = {
	curUserInfo: DynamicObject;
};
