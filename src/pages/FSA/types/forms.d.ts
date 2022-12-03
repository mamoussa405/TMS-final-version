/**
 * This file contains the custom types for the forms components in the
 * FSA page.
 * @exemple BasicInformation.tsx
 */
import {
	BasicInformationRecource,
	BasicInformationDataToSendToSP,
	GatherInputsDataToSendToSP,
	MyFile,
} from './cummonTypes';
/**
 * This is the custom type for the BasicInformation page's props it contains the
 * shape of the props object with the mandatory properties that we have
 * to pass to this component to work.
 * @see  src/pages/FSA/forms/BasicInformation.tsx
 */
export type BasicInformationProps = {
	basicInformationForm: any;
	resources: any[];
	onRowAdd: (rowData: any) => Promise<void>;
	onRowUpdate: (newData: any, oldData: any) => Promise<void>;
	onRowDelete: (rowData: any) => Promise<void>;
	fsaInfo: Map<string, any[] | undefined>;
	loadingData: boolean;
	costControllerVerIsOpen: boolean;
	onCostControllerVerClose: (submit: boolean) => void;
	phase: string;
};

/**
 * This is the custom type for the CostControllerVerification props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see src/pages/FSA/forms/CostControllerVerification.tsx
 */
export type CostControllerProps = {
	basicInformationForm: any;
	fsaInfo: Map<string, any[] | undefined>;
};


/**
 * The custom type used to represent the initiate the request resources
 * means the resources that the user will fill in the second step "Initiate
 * the request".
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 * @see /src/pages/FSA/forms/initiateTheRequest/Resources.tsx
 * @see /src/pages/FSA/utils/initTheRequest.ts
 */
export type InitTheRequestResource = BasicInformationRecource;

/**
 * This is the custom type for the InitTheRequest props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see /src/pages/FSA/forms/initiateTheRequest/InitTheRequest.tsx
 */
export type InitTheRequestProps = {
	resources: InitTheRequestResource[];
	onBackClick: () => void;
	alreadyFilledData: BasicInformationDataToSendToSP,
};

/**
 * This is the custom type for the Resources props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see /src/pages/FSA/forms/initiateTheRequest/Resources.tsx
 */
export type ResourcesProps = {
	resources: InitTheRequestResource[];
	onResourcesSubmit: (resourcesData: InitTheRequestResource[]) => void;
	onBackClick: () => void;
	submitting: boolean;
};

/**
 * This is the custom type for the EditBWRColumns props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see /src/pages/FSA/forms/initiateTheRequest/Resources.tsx
 */
export type EditBWRColumnProps = {
	resources: InitTheRequestResource[];
	rowData: InitTheRequestResource;
};

/**
 * This is the custom type for the EditTaskCodeColumn props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see /src/pages/FSA/forms/initiateTheRequest/Resources.tsx
 */
export type EditTaskCodeColumnProps = EditBWRColumnProps;

/**
 * This is the custom type for the TravelRequest props object, it
 * contains all the mandatory properties that the component should have to
 * work.
 * @see /src/pages/FSA/forms/initiateTheRequest/TravelRequest.tsx
 */
export type TravelRequestProps = {
	travelRequestForm: any;
	alreadyFilledData: BasicInformationDataToSendToSP;
	resources: InitTheRequestResource[];
	onTravelRequestBackClick: () => void;
	submitting: boolean;
};

/**
 * This is the custom type for the GatherInputs props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/froms/initiateTheRequest/GatherInputs.tsx
 */
export type GatherInputsProps = {
	gatherInputsForm: any;
	alreadyFilledData: BasicInformationDataToSendToSP;
	resources: InitTheRequestResource[];
	onGatherInputsBackClick: () => void;
	submitting: boolean;
};

/**
 * This is the custom type for the Hours Split resources, it's the shape
 * of the object that each row in the table should have.
 * @see /src/pages/FSA/forms/initiateTheRequest/HoursSplit.tsx
 */
export type HoursSplitResources = {
	firstName: string;
	lastName: string;
	bwr: string;
	taskCode: string;
	expenses: boolean;
	bareCost: number;
	JESABilledRate: number;
	totalCost: number;
	totalHours: number;
	ma: number; // the 1st month its title will be M1 in the table
	mb: number; // the 2nd month its title will be M2 in the table
	mc: number; // the 3rd month its title will be M3 in the table
	md: number; // the 4th month its title will be M4 in the table
	me: number; // the 5th month its title will be M5 in the table
	mf: number; // the 6th month its title will be M6 in the table
	mg: number; // the 7th month its title will be M7 in the table
	mh: number; // the 8th month its title will be M8 in the table
	mi: number; // the 9th month its title will be M9 in the table
	mj: number; // the 10th month its title will be M10 in the table
	mk: number; // the 11th month its title will be M11 in the table
	ml: number; // the 12th month its title will be M12 in the table
	framework: string;
	comments: string;
	ID: string;
	renderTotalHours: () => void;
	renderBareCost: (totalHours: number) => void;
	renderJESABilledRate: (framework: string) => void;
	renderTotalCost: (totalHours: number, billedRate: number) => void;
	requestID?: string;
	id?: number;
	tableData?: {
		id: number;
	};
	[key: string]: string | boolean | number;
};

/**
 * This is the custom type for the HoursSplit props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplit.tsx
 */
export type HoursSplitProps = {
	resources: HoursSplitResources[];
	formikValues: GatherInputsDataToSendToSP;
};

/**
 * This is the custom type for the EditTotalHoursColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditTotalHoursColumnProps = {
	resources: HoursSplitResources[];
	rowData: HoursSplitResources;
};

/**
 * This is the custom type for the EditBareCostColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work. It's the same as the EditTotalHoursColumnProps type
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditBareCostColumnProps = EditTotalHoursColumnProps;

/**
 * This is the custom type for the EditJESABilledRateColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work. It's and union between the EditTotalHoursColumnProps and
 * { formikValues: GatherInputsDataToSendToSP} type
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditJESABilledRateColumnProps =
	EditTotalHoursColumnProps
	& { formikValues: GatherInputsDataToSendToSP };

/**
 * This is the custom type for the EditTotalCostColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work. It's the same as the EditTotalHoursColumnProps type
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditTotalCostColumnProps = EditTotalHoursColumnProps;

/**
 * This is the custom type for the EditFrameworkColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work. It's the same as the EditTotalHoursColumnProps type
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditFrameworkColumnProps = EditTotalHoursColumnProps;

/**
 * This is the custom type for the EditMonthColumn props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/froms/initiateTheRequest/HoursSplitEditColumns.tsx
 */
export type EditMonthColumnProps = {
	resources: HoursSplitResources[];
	rowData: HoursSplitResources;
	id: string;
};

/**
 * This is the custom type that will represent the shape of the multipliers
 * object that will fetch from sharepoint.
 * @see /src/pages/FSA/forms/initiateTheRequest/GatherInputs.tsx
 */
export type GatherInputsMultipliers = {
	type: string;
	office: string;
	MT_COST: number;
	ODC: number;
	LDC: number;
	ADC: number;
	EDC: number;
};

/**
 * This is the custom type for the FormsUpload props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/forms/initiateTheRequest/FormsUpload.tsx
 */
export type FormsUploadProps = {
	onFormsUploadSubmit: (attachments: MyFile[]) => void;
	onFormsUploadBackClick: () => void;
	submitting: boolean;
};

/**
 * This is the custom type for the MyDropzone props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/forms/initiateTheRequest/FormsUpload.tsx
 */
export type MyDropzoneProps = {
	onFileDrop: (file: MyFile) => void;
	fileName: string | undefined;
};

/**
 * This is the custom type for the CheckList props object, it
 * contains all the mandatory properties that the component should
 * have to work.
 * @see /src/pages/FSA/forms/initiateTheRequest/CheckList.tsx
 */
export type CheckListProps = {
	checkListForm: any;
	resources: HoursSplitResources[];
	expenses: number;
	onCheckListBackClick: () => void;
	submitting: boolean;
};
