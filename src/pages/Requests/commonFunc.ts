// THIS FILE CONTAINS ALL COMMON FUNCTION FOR REQUEST PAGES.
const regex = /[+-]?\d+(\.\d+)?/g;

export const getTwoDcpValues = (requests: any[], listFields: string[]) => {
	const newRequests = requests.map((request: any) => {
		const obj: any = {};
		listFields.forEach((field: string) => {
			if (
				!isNaN(request[field]) &&
				request[field]?.toString()?.indexOf('.') !== -1
			) {
				const floatNum = request[field]?.match(regex);
				obj[field] = parseFloat(floatNum)?.toFixed(2);
			} else {
				obj[field] = request[field];
			}
		});
		return { ...request, ...obj };
	});

	return newRequests;
};
