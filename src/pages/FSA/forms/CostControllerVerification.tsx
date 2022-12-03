import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import MyTextField from '../../../components/forms/MyTextField';
import MySelect from '../../../components/forms/MySelect';
import costControllerVer from '../data/costControllerVerification';
import {
	fillItemsWithFetchedData,
	getProjectName,
	getProjectNumber,
	getCurCostController,
	removeDuplicats,
} from '../utils/expressionOfNeedsTools';
import { CostControllerProps } from '../types/forms';

/**
 * This component is for the cost controller verification step it will
 * render two disabled text fields contain Project Number and Project Name
 * consecutively, and a select to verify the cost controller.
 * @param {CostControllerProps} -- object the following properties:
 * @first basicInformationForm -- the object returned by useFormik
 * @second fsaInfo -- a map with all the available users in sharepoint
 * @return {JSX.Element}
 */
const CostControllerVerification: React.FC<CostControllerProps> = ({
	basicInformationForm,
	fsaInfo,
}: CostControllerProps): JSX.Element => {
	const { values } = basicInformationForm;
	/**
	 * If The costController is empty means the project title
	 * changed so we should update the current costController.
	 */
	if (values.costController === '') {
		values.costController = getCurCostController(
			fsaInfo.get('projectCostController') as string[],
			fsaInfo.get('projectNumber') as string[],
			fsaInfo.get('projectName') as string[],
			values.projectTitle);
	}

	return (
		<>
			<Typography variant='body2' style={{ marginBottom: '.5rem' }}>
				Please verify if the assigned cost controller is correct or otherwise
				update to the correct one.
			</Typography>
			<Grid container columnSpacing={10}>
				<Grid item xs={12} sm={12} md={6}>
					<Typography variant='h6' style={{ marginBottom: '.3rem' }}>
						Project Number
					</Typography>
					<MyTextField
						basicInformationForm={basicInformationForm}
						textFieldInfo={costControllerVer.projectNumberField}
						value={getProjectNumber(values.projectTitle)}
						additionalStyles={{
							'& legend': { display: 'none' },
							'& fieldset': { top: 0 },
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<Typography variant='h6' style={{ marginBottom: '.3rem' }}>
						Project Name
					</Typography>
					<MyTextField
						basicInformationForm={basicInformationForm}
						textFieldInfo={costControllerVer.projectNameField}
						value={getProjectName(values.projectTitle)}
						additionalStyles={{
							'& legend': { display: 'none' },
							'& fieldset': { top: 0 },
						}}
					/>
				</Grid>
			</Grid>
			<div style={{ margin: '3rem 0 2rem 0rem' }}>
				<Typography variant='h6' style={{ marginBottom: '.3rem' }}>
					Cost Controller
				</Typography>
				<MySelect
					basicInformationForm={basicInformationForm}
					selectInfo={{
						...costControllerVer.costControllerInfo,
						items: fillItemsWithFetchedData(removeDuplicats(
							[...fsaInfo.get('projectCostController') as string[]])),
					}}
				/>
			</div>
		</>
	);
};

export default CostControllerVerification;
