/**
 * special utility file for parsing excel data into resources table
 */

import readXLSXFile from 'read-excel-file';
import { snakeCase } from 'change-case';

// keys to be parsed
const keys = [
	'First Name',
	'Last Name',
	'Function',
	'WBS',
	'BWR',
	'Bare Cost',
	'Jesa Billable',
	'Total Labor Hours',
	'Total Labor Cost',
	'M1',
	'M2',
	'M3',
	'M4',
	'M5',
	'M6',
	'M7',
	'M8',
	'M9',
	'M10',
	'M11',
	'M12',
];

/**
 * @param  {File} file
 */
async function parseXLSX(file: File) {
	const rows: any[] = await readXLSXFile(file);

	return rows
		.filter((_, i) => i !== 0)
		.map((row: any[]) => {
			const obj: any = {};
			keys.forEach((key, i) => {
				obj[snakeCase(key).toLowerCase()] = row[i];
			});

			return obj;
		});
}

export default parseXLSX;
