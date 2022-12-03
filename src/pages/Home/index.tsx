import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MDBRow } from 'mdbreact';
import { BeatLoader } from 'react-spinners';
import Button from '@material-ui/core/Button';
import $SP from 'sharepointplus';

import { TaskCard, ProgressCard } from './components';
import { setPageTitle } from '../../redux/modules/page-title.reducer';
import { toast } from 'react-toastify';
import { taskOrderFields } from '../PSA/sharepointsFields';
import useFetchListItems from '../../hooks/useFetchListItems';

interface StatValues {
	totalRequest: number;
	totalPsa: number;
	totalFsa: number;
	totalPsaInProgress: number;
	totalPsaClosed: number;
	totalFsaInProgress: number;
	totalFsaClosed: number;
	totalPsaApproved: number;
	totalPsaRejected: number;
	totalFsaApproved: number;
	totalFsaRejected: number;
}

const DV1 = () => {
	const [statValues, setStatValues] = useState<StatValues>({
		totalRequest: 0,
		totalPsa: 0,
		totalFsa: 0,
		totalPsaInProgress: 0,
		totalPsaClosed: 0,
		totalFsaInProgress: 0,
		totalFsaClosed: 0,
		totalPsaApproved: 0,
		totalPsaRejected: 0,
		totalFsaApproved: 0,
		totalFsaRejected: 0,
	}); // state to handle the statistics
	const [loading, setLoading] = useState(false);
	const [isTaskOrdersLoading, taskorders] = useFetchListItems(
		'Dataflow',
		taskOrderFields,
	);
	const dispatch = useDispatch();
	const sp = $SP();

	React.useEffect(() => {
		dispatch(setPageTitle('Dashboard'));
		const fetchStatsValues = async () => {
			try {
				// get the various stats values and update the statValues state
				setLoading(true);
				// total of all task orders
				const totalRequest = taskorders.length;
				// total of all psa requests
				// console.log('Task orders: ', taskorders);
				const totalPsa = taskorders.filter(
					(result: any) => result.framework === 'psa',
				).length;
				// total of all fsa requests
				const totalFsa = totalRequest - totalPsa;
				// total of psa in progress.
				const totalPsaInProgress = taskorders.filter(
					(result: any) =>
						result.framework === 'psa' &&
						result.status === 'active',
				).length;
				// total of psa closed
				const totalPsaClosed = totalPsa - totalPsaInProgress;
				// total of fsa in progress
				const totalFsaInProgress = taskorders.filter(
					(result: any) =>
						result.framework === 'fsa' &&
						result.status === 'active',
				).length;
				// total of fsa closed
				const totalFsaClosed = totalFsa - totalFsaInProgress;
				// total of psa approved
				const totalPsaApproved = taskorders.filter(
					(result: any) =>
						result.isApproved === 'Yes' &&
						result.status === 'active' &&
						result.framework === 'psa',
				).length;
				// total of psa rejected
				const totalPsaRejected = totalPsaClosed - totalPsaApproved;
				// total of fsa approved
				const totalFsaApproved = taskorders.filter(
					(result: any) =>
						result.isApproved === 'Yes' &&
						result.status === 'active' &&
						result.framework === 'psa',
				).length;
				// total of fsa rejected
				const totalFsaRejected = totalPsaClosed - totalPsaApproved;
				setStatValues({
					...statValues,
					totalRequest,
					totalPsa,
					totalFsa,
					totalPsaInProgress,
					totalPsaClosed,
					totalFsaInProgress,
					totalFsaClosed,
					totalPsaApproved,
					totalPsaRejected,
					totalFsaApproved,
					totalFsaRejected,
				});
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toast.error(
					'Failed to get task order statistics from sharepoint',
				);
			}
		};
		fetchStatsValues();
	}, [taskorders]); /* eslint-disable-line */

	const getUserGroups = async () => {
		await sp.usergroups(
			'mydomain\\john_doe',
			// { url: window.location.href.toString() },
			{ url: process.env.REACT_APP_BASE_URL },
			function(groups: any) {
				for (let i = 0; i < groups.length; i++) {
					// console.log('groups --- ', groups[i]);
				} // -> "Roadmap Admin", "Global Viewers", ...
			},
		);
	};

	const getUserInfo = async () => {
		await sp.getUserInfo(
			'domain\\john_doe',
			// { url: window.location.href.toString() },
			{ url: process.env.REACT_APP_BASE_URL },
			function(info: any) {
				// if (typeof info === 'string') {
				// console.log('Error:' + info); // there was a problem so we show it
				// } else console.log('User ID = ' + info.ID);
			},
		);
	};

	const whoamiTest = async () => {
		await sp.whoami(
			// { url: window.location.href.toString() },
			{ url: process.env.REACT_APP_BASE_URL },
			function(people: any) {
				// for (let i = 0; i < people.length; i++) {
				// console.log(people[i] + ' = ' + people[people[i]]);
				// }
			},
		);
	};

	// destructure the stats fields from the statValues state.
	const {
		totalRequest,
		totalPsa,
		totalFsa,
		totalPsaInProgress,
		totalPsaClosed,
		totalFsaInProgress,
		totalFsaClosed,
		totalPsaApproved,
		totalPsaRejected,
		totalFsaApproved,
		totalFsaRejected,
	} = statValues;

	// to display the progress bar correctly
	const PsaValues = [
		(totalPsaInProgress / totalPsa) * 100,
		(totalPsaClosed / totalPsa) * 100,
		(totalPsaApproved / totalPsaClosed) * 100,
		(totalPsaRejected / totalPsaClosed) * 100,
	];
	const FsaValues = [
		(totalFsaInProgress / totalFsa) * 100,
		(totalFsaClosed / totalFsa) * 100,
		(totalFsaApproved / totalFsaClosed) * 100,
		(totalFsaRejected / totalFsaClosed) * 100,
	];

	// To render the cards for the various request stats.
	const renderRequestStats = (
		type: string,
		total: number,
		totalClosed: number,
		values: any,
	) => {
		// console.log(values);
		return (
			<div className='mb-3'>
				<h4>Statistics about {type} Request</h4>
				{/* buttons to test data retrieval from sharepoint */}
				<MDBRow>
					<ProgressCard
						total={total}
						value={values[0]}
						title={`Total ${type} (In Progress)`}
						description={`Out of the <b>${total}</b> ${type} requests`}
						color='primary-color'
					/>
					<ProgressCard
						total={total}
						value={values[1]}
						title={`Total ${type} (Closed)`}
						description={`Out of the <b>${total}</b> ${type} requests`}
						color='danger-color'
					/>
					<ProgressCard
						total={totalClosed}
						value={values[2]}
						title={`Total ${type} (Approved)`}
						description={`Out of the <b>${total}</b> ${type} requests`}
						color='success-color'
					/>
					<ProgressCard
						total={totalClosed}
						value={values[3]}
						title={`Total ${type} (Rejected)`}
						description={`Out of the <b>${total}</b> ${type} requests`}
						color='danger-color'
					/>
				</MDBRow>
			</div>
		);
	};

	// display a loader whiles still fetching from sharepoint
	if (loading || isTaskOrdersLoading) {
		return (
			<div
				style={{
					height: '80vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<BeatLoader color='#0d0082' />
			</div>
		);
	}

	return (
		<>
			{/* top cards */}
			<section>
				<MDBRow>
					<TaskCard title='Total Requests' value={totalRequest} />
					<TaskCard title='total PSA Requests' value={totalPsa} />
					<TaskCard title='total FSA Requests' value={totalFsa} />
				</MDBRow>
				<Button
					variant='contained'
					color='primary'
					onClick={getUserGroups}>
					Test users group
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={getUserInfo}>
					Test getUserInfo group
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={whoamiTest}>
					Test whoami
				</Button>
			</section>

			<section className='mb-5'>
				{renderRequestStats('PSA', totalPsa, totalPsaClosed, PsaValues)}
				{renderRequestStats('FSA', totalFsa, totalFsaClosed, FsaValues)}
			</section>
		</>
	);
};

export default DV1;
