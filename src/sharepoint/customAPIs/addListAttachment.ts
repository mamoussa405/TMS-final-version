import { toast } from 'react-toastify';

import $SP from 'sharepointplus';

import { MyFile } from '../../pages/FSA/types/cummonTypes';

const sp = $SP();

/**
 * Calls the sharepoint list's addAttachment to add new attachment
 * @param {string} listName -- The list name to add the attachment to
 * @param {MyFile} attachment -- The attachment to add
 * @param {string} attachmentName -- The attachment name in sharepoint
 * @param { boolean } successFeedback -- a boolean to decide if we gonna give
 * the feedback that the items submited successfully
 * @param {string} requestID -- The current request ID
 * @return {Promise<void>}
 */
const addListAttachment = (
	listName: string,
	attachment: MyFile,
	attachmentName: string,
	successFeedback: boolean,
	requestID: string): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			/**
			 * First thing we should do is to check if already have an
			 * attachment with the same name in the sharepoint list.
			 */
			const QUERY = 'requestID = "' + requestID +
				'" AND attachmentName = "' + attachmentName + '"';
			const existedAttachments = await sp
				.list(listName, process.env.REACT_APP_BASE_URL)
				.get({
					fields: 'ID,Attachments',
					where: QUERY,
				});
			let ID;

			/**
			 * So if we already have an attachment with the same name in the
			 * sharepoint list, we should handle two cases:
			 * the first case is if the attachment to add is undefined means
			 * the user didn't upload one, so in this case we should remove this
			 * row item from the list.
			 * the second case if the attachment to add is defined means the user
			 * uploaded and attachment, in this case we should remove the previous
			 * one.
			 * If we didn't found and attachment already in the list then we just
			 * need to create a new row item with the current attachment name and
			 * the current request ID.
			 * Finally we should attach the attachment if the user uploaded it.
			 */
			if (existedAttachments.length) {
				ID = existedAttachments[0].getAttribute('ID');
				let attachmentURL = existedAttachments[0].getAttribute('Attachments');

				if (!attachment) {
					await sp.list(listName).remove({ ID });
				} else if (attachmentURL !== '0') {
					attachmentURL = sp.cleanResult(attachmentURL);
					await sp.list(listName, process.env.REACT_APP_BASE_URL)
						.removeAttachment({
							ID,
							fileURL: attachmentURL,
						})
						.then((url: any) => {
							return url;
						})
						.catch(() => {
							throw Error('');
						});
				}
			} else if (attachment) {
				const newItem = await sp.list(listName, process.env.REACT_APP_BASE_URL)
					.add([{ requestID, attachmentName }]);
				if (newItem.failed.length > 0) {
					throw Error('');
				}
				ID = newItem.passed[0].ID;
			}
			if (attachment) {
				await sp.list(listName, process.env.REACT_APP_BASE_URL)
					.addAttachment({
						ID,
						filename: attachment.sharepointName,
						attachment: attachment.content,
					}).then((url: any) => {
						return url;
					})
					.catch(() => {
						throw Error('');
					});
			}
			// if (successFeedback) {
			// toast.success('Attachments added successfully');
			// }
			resolve();
		} catch (e) {
			toast.error(
				'Failed to add attachments, Please try again or check with IT team.');
			reject(e);
		}
	});
};

export default addListAttachment;
