// initialize of the sharepoint library, for connecting to sharepoint

import $SP from 'sharepointplus';

const credentials = {
	username: process.env.REACT_APP_SHAREPOINT_USERNAME,
	password: process.env.REACT_APP_SHAREPOINT_PASSWORD,
	domain: process.env.REACT_APP_SHAREPOINT_DOMAIN,
};

const sp = $SP.auth(credentials);

export default sp;
