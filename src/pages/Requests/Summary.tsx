import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';

import summaryFields from './data/summaryFields';
import { SummaryField, SummaryProps } from './types/customTypes';

import './task-order-page.css';

/**
 * This is the first Tab in the Summary Modal, it contains the
 * general information about the clicked task order.
 * @param {SummaryProps} -- Object with the following props:
 * @first rowData -- the current row data, i.e, the current clicked
 * request's info.
 * @second currUserInfo -- the current user info, i.e, the First Name
 * and the Second Name.
 * @return {JSX.Element}
 */
const GeneralInformation: React.FC<SummaryProps> =
	({ rowData, currUserInfo }: SummaryProps): JSX.Element => {
		return (
			<Box className='flex-container'>
				<Box className='sub-container'>
					<Typography variant='h5'>Case Properties</Typography>
					{
						summaryFields.caseProperties(rowData)
							.map((item: SummaryField, key: number): JSX.Element => {
								return (
									<div key={key}>
										<Typography
											variant='h6'
											color='primary'>
											{item.title}
										</Typography>
										<Typography
											variant='h6'>
											{item.value}
										</Typography>
									</div>

								);
							})
					}
				</Box>
				<Box className='sub-container'>
					<Typography variant='h5'>Current Task Properties</Typography>
					{
						summaryFields.currentTaskProperties(rowData, currUserInfo)
							.map((item: SummaryField, key: number): JSX.Element => {
								return (
									<div key={key}>
										<Typography
											variant='h6'
											color='primary'>
											{item.title}
										</Typography>
										<Typography
											variant='h6'>
											{item.value}
										</Typography>
									</div>

								);
							})
					}
				</Box>
			</Box>
		);
	};

/**
 * Renders the Task Order Summary info, it will be
 * rendered when a user hits the summary button on
 * the inbox page.
 * @param { SummaryProps } -- Object with the following
 * props:
 * @first rowData -- the current row data, i.e, the current clicked
 * request's info.
 * @second currUserInfo -- the current user info, i.e, the First Name
 * and the Second Name.
 * @return {JSX.Element}
 */
const Summary: React.FC<SummaryProps> =
	({ rowData, currUserInfo }: SummaryProps) => {
		const [value, setValue] = useState<string>('1');

		const handleChange = (event: React.SyntheticEvent, newValue: string) => {
			setValue(newValue);
		};

		return (
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} variant='scrollable'>
						<Tab label='General Information' value="1" />
						<Tab label='Uploaded Documents' value="2" />
						<Tab label='Generated Documents' value="3" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<GeneralInformation rowData={rowData} currUserInfo={currUserInfo} />
				</TabPanel>
				<TabPanel value="2">Uploaded Documents</TabPanel>
				<TabPanel value="3">Generated Documents</TabPanel>
			</TabContext>
		);
	};

export default Summary;
