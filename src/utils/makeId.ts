export const makeId = (length: number) => {
	let result = '';
	const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkl' +
    'mnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const makeIntOnlyId = (length: number) =>
	Math.floor(Math.random() * length);
