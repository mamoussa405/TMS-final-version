import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import $SP from 'sharepointplus';

import { DynamicObject } from '../@types/customTypes';

const sp = $SP();
/**
 * This custom hook fetchs the current user information from sharepoint
 * @return {[{Object}, boolean]} -- an array with:
 * @first object contains all the needed info about the user
 * @second boolean to describe the loading status
 */

const useFetchUser = (neededInfo: string[]): [DynamicObject, boolean] => {
	const [userNeededData, setUserNeededData] = useState<DynamicObject>({});
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		const fetchUser = async () => {
			try {
				const userData = await sp.whoami({
					url: process.env.REACT_APP_BASE_URL,
				});
				const tmpData: DynamicObject = {};

				neededInfo.forEach((info) => {
					tmpData[info] = userData[info];
				});
				setUserNeededData(tmpData);
			} catch (error) {
				toast.error(`Error occured in fetching user data ${error}`);
				// navigate to the dashboard when an error occured
				navigate('/dashboard');
			}
			setLoading(false);
		};
		fetchUser();
	}, []); /* eslint-disable-line */
	return [userNeededData, loading];
};
export default useFetchUser;
