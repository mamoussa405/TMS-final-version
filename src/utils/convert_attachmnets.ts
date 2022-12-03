// convert files to base64 string.
export const fileToBase64String = (file: any) =>
	new Promise((resolve, reject) => {
		const reader: any = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			let encoded = reader?.result?.toString().replace(/^data:(.*,)?/, '');
			if (encoded.length % 4 > 0) {
				encoded += '='.repeat(4 - (encoded.length % 4));
			}
			resolve(encoded);
		};
		reader.onerror = (error: any) => reject(error);
	});

// convert blob to base64
export const convertBlobToBase64 = (blob: any) => {
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onloadend = function() {
		const base64data = reader.result;
		return base64data;
	};
};
