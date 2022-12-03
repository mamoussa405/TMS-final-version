import { useEffect, useState } from 'react';
import $SP from 'sharepointplus';
import { toast } from 'react-toastify';

const useFetchUser = (url: string) => {
	const [users, setUsers] = useState<any[]>([]);
	const sp = $SP();
	useEffect(() => {
		try {
			const fetchUser = async () => {
				// console.log('url used ---- ', url);
				await sp.whoami(
					{ url: process.env.REACT_APP_BASE_URL },
					function(people: any) {
						const tempUsers: any[] = [];
						for (let i = 0; i < people.length; i++) {
							tempUsers.push(people[i]);
							// console.log(
							// 'users ----- ',
							// people[i] + ' = ' + people[people[i]],
							// );
						}
						setUsers(tempUsers);
					},
				);
			};
			fetchUser();
		} catch (error) {
			// console.log('Error in fetching user data --- ', error);
			toast.error('Error occured in fetching user data');
		}
	}, [sp, url]);

	return [users];
};
export default useFetchUser;
