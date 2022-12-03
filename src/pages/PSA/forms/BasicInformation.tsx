/* eslint-disable */
import React, { useState } from 'react';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	makeStyles,
	MenuItem,
	Radio,
	RadioGroup,
	TextField,
} from '@material-ui/core';
import { MDBRow, MDBCol } from 'mdbreact';
import { MDBBtn } from 'mdb-react-ui-kit';
// import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import DragTable from '../../../components/ui/DragTable';
import { AttachMoney } from '@material-ui/icons';
// import { saveM_total } from '../../../redux/modules/request';

interface Props {
	basicInformationForm: any;
	resources: any[];
	onAddResourceExcel: (files: File[]) => Promise<void>;
	addRow: (rowData: any) => Promise<void>;
	deleteRow: (rowData: any) => Promise<void>;
}

const useStyles = makeStyles((theme) => ({
	btnDiv: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: '2rem',
	},
	field: {
		marginTop: '1rem',
	},
	radio: {
		margin: 0,
		padding: 0,
	},
	title: {
		fontWeight: 600,
		textAlign: 'center',
	},
	flex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& > p': {
			width: '20%',
		},
		'& > div': {
			width: '80%',
		},
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	grid: {
		display: 'flex',
		alignItems: 'center',
	},
	gridField: {
		marginLeft: '.5rem',
	},
	error: {
		color: 'red',
	},
}));

// Initial steps page (Basic Information Page)
const BasicInformation: React.FC<Props> = ({
	basicInformationForm,
	resources,
	onAddResourceExcel,
	addRow,
	deleteRow,
}) => {
	const classes = useStyles();
	const [m1ActionsHidden, setM1ActionsHidden] = useState(true);
	// const dispatch = useDispatch();

	const {
		handleChange,
		handleBlur,
		handleSubmit,
		values,
		errors,
		setFieldValue,
	} = basicInformationForm;

	const sum = (data: any) => {
		if (!data) return 0;
		const m1 = isNaN(data.m1) ? 0 : parseFloat(data.m1);
		const m2 = isNaN(data.m2) ? 0 : parseFloat(data.m2);
		const m3 = isNaN(data.m3) ? 0 : parseFloat(data.m3);
		const m4 = isNaN(data.m4) ? 0 : parseFloat(data.m4);
		const m5 = isNaN(data.m5) ? 0 : parseFloat(data.m5);
		const m6 = isNaN(data.m6) ? 0 : parseFloat(data.m6);
		const m7 = isNaN(data.m7) ? 0 : parseFloat(data.m7);
		const m8 = isNaN(data.m8) ? 0 : parseFloat(data.m8);
		const m9 = isNaN(data.m9) ? 0 : parseFloat(data.m9);
		const m10 = isNaN(data.m10) ? 0 : parseFloat(data.m10);
		const m11 = isNaN(data.m11) ? 0 : parseFloat(data.m11);
		const m12 = isNaN(data.m12) ? 0 : parseFloat(data.m12);

		return m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8 + m9 + m10 + m11 + m12;
	};

	return (
		<div>
			<h3 className={classes.title}>Task Order Request Form</h3>
			<form onSubmit={handleSubmit}>
				<MDBRow>
					<MDBCol md='5' sm='12'>
						<TextField
							className={classes.field}
							name='task_order_category'
							select
							label='Task Order Category'
							fullWidth
							value={values.task_order_category}
							error={!!errors.task_order_category}
							onChange={handleChange}
							onBlur={handleBlur}>
							<MenuItem value='pm'>Project Management</MenuItem>
							<MenuItem value='overhead'>Overhead</MenuItem>
						</TextField>
					</MDBCol>
					<MDBCol md='5' sm='12'>
						<TextField
							name='project_title'
							select
							className={classes.field}
							label='Project Title'
							fullWidth
							value={values.project_title}
							error={!!errors.project_title}
							onChange={handleChange}
							onBlur={handleBlur}>
							<MenuItem value='p1'>Project 1</MenuItem>
							<MenuItem value='p2'>Project 2</MenuItem>
							<MenuItem value='p1'>Project 3</MenuItem>
							<MenuItem value='p2'>Project 4</MenuItem>
						</TextField>
					</MDBCol>
					<MDBCol md='2' sm='12'>
						<TextField
							name='revision_no'
							className={classes.field}
							type='number'
							label='Revision No.'
							fullWidth
							value={values.revision_no}
							error={!!errors.revision_no}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</MDBCol>
				</MDBRow>
				<MDBRow>
					<MDBCol sm='12' md='3'>
						<FormControl
							className={classes.field}
							component='fieldset'>
							<FormLabel component='legend'>Category</FormLabel>
							<RadioGroup
								aria-label='category'
								name='category'
								value={values.category}
								onChange={(_, val) =>
									setFieldValue('category', val)
								}>
								<FormControlLabel
									value='jacobs'
									control={<Radio />}
									className={classes.radio}
									label='Jacobs Staff'
								/>
								<FormControlLabel
									value='worley'
									control={<Radio />}
									className={classes.radio}
									label='Worley Staff'
								/>
								{errors.category && (
									<span className={classes.error}>
										Category is required
									</span>
								)}
							</RadioGroup>
						</FormControl>
					</MDBCol>
					<MDBCol sm='12' md='3'>
						<TextField
							name='office'
							className={classes.field}
							select
							fullWidth
							label='Office'
							value={values.office}
							error={!!errors.office}
							onChange={handleChange}
							onBlur={handleBlur}>
							<MenuItem value='o1'>Office 1</MenuItem>
							<MenuItem value='o2'>Office 2</MenuItem>
							<MenuItem value='o1'>Office 3</MenuItem>
							<MenuItem value='o2'>Office 4</MenuItem>
						</TextField>
					</MDBCol>
					<MDBCol sm='12' md='3'>
						<TextField
							name='legal_entity'
							className={classes.field}
							fullWidth
							label='Legal Entity'
							value={values.legal_entity}
							error={!!errors.legal_entity}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</MDBCol>
					<MDBCol sm='12' md='3'>
						<TextField
							name='framework'
							className={classes.field}
							select
							fullWidth
							label='Framework'
							value={values.framework}
							error={!!errors.framework}
							onChange={handleChange}
							onBlur={handleBlur}
							disabled>
							<MenuItem value='psa'>PSA</MenuItem>
							<MenuItem value='fsa'>FSA</MenuItem>
						</TextField>
					</MDBCol>
				</MDBRow>
				<div className={clsx(classes.flex, classes.field)}>
					<p>Multipliers</p>
					<div className={classes.grid}>
						<TextField
							name='mt_cost'
							fullWidth
							className={classes.gridField}
							type='number'
							label='MT COST'
							value={values.mt_cost}
							error={!!errors.mt_cost}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<TextField
							name='adc'
							fullWidth
							className={classes.gridField}
							type='number'
							label='ADC'
							value={values.adc}
							error={!!errors.adc}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<DragTable
					data={resources}
					columns={[
						{ field: 'first_name', title: 'First Name' },
						{ field: 'last_name', title: 'Last Name' },
						{ field: 'function', title: 'Function' },
						{ field: 'wbs', title: 'WBS' },
						{ field: 'bwr', title: 'BWR' },
						{ field: 'bare_cost', title: 'Bare Cost' },
						{ field: 'jesa_billable', title: 'Jesa Billable' },
						{
							field: 'total_labor_hours',
							title: 'Total Labor Hours',
						},
						{
							field: 'total_labor_cost',
							title: 'Total Labor Cost',
						},
						{
							field: 'm_total',
							title: 'M(total)',
							render: (data: any) => <span>{sum(data)}</span>,
							editable: 'onUpdate',
							align: 'center',
						},
						{
							field: 'm1',
							title: 'M1',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm2',
							title: 'M2',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm3',
							title: 'M3',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm4',
							title: 'M4',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm5',
							title: 'M5',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm6',
							title: 'M6',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm7',
							title: 'M7',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm8',
							title: 'M8',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm9',
							title: 'M9',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm10',
							title: 'M10',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm11',
							title: 'M11',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
						{
							field: 'm12',
							title: 'M12',
							hidden: m1ActionsHidden,
							type: 'numeric',
						},
					]}
					title='Resources'
					onRowAdd={addRow}
					onRowDelete={deleteRow}
					downloadSampleExcel
					dropzoneSubText='Using sample excel file(download above), add
					rows and drop here to parse into table' // eslint-disable-line
					onDrop={onAddResourceExcel}
					supportedFiles={[
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					]}
					toggleMAction={() => setM1ActionsHidden(!m1ActionsHidden)}
				/>
				<div className={clsx(classes.flex, classes.field)}>
					<p>Expenses</p>
					<div className={classes.grid}>
						<TextField
							name='wbs_task_code'
							fullWidth
							className={classes.gridField}
							label='WBS Task Code'
							value={values.wbs_task_code}
							error={!!errors.wbs_task_code}
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={errors.wbs_task_code}
						/>
						<TextField
							name='expenses'
							fullWidth
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<AttachMoney />
									</InputAdornment>
								),
							}}
							className={classes.gridField}
							label='Expenses'
							value={values.expenses}
							error={!!errors.expenses}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<div className={clsx(classes.flex, classes.field)}>
					<p>Period</p>
					<div className={classes.grid}>
						<TextField
							fullWidth
							name='startDate'
							className={classes.gridField}
							type='date'
							InputLabelProps={{ shrink: true }}
							label='Start Date'
							value={values.startDate}
							error={!!errors.startDate}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<TextField
							name='endDate'
							fullWidth
							className={classes.gridField}
							type='date'
							InputLabelProps={{ shrink: true }}
							label='End Date'
							value={values.endDate}
							error={!!errors.endDate}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<div className={clsx(classes.flex, classes.field)}>
					<p>path</p>
					<div className={classes.grid}>
						<TextField
							name='departure'
							fullWidth
							className={classes.gridField}
							label='Departure'
							value={values.departure}
							error={!!errors.departure}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<TextField
							name='destination'
							fullWidth
							className={classes.gridField}
							label='Destination'
							value={values.destination}
							error={!!errors.destination}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
			</form>
			<div className={classes.btnDiv}>
				<MDBBtn
					rounded
					type='submit'
					outline
					color='dark'
					onClick={() => handleSubmit()}>
					Next
				</MDBBtn>
			</div>
		</div>
	);
};

export default BasicInformation;
