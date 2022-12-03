/**
 * for converting local html files to pdf files that
 * can be exported and persisted into database
 */

const getFileBlobUsingURL = function(url: string, convertBlob: any) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', function() {
    convertBlob(xhr.response);
  });
  xhr.send();
};

const blobToFile = function(blob: any, name: string) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
};

export const getFileObjectFromURL = function(filePathOrUrl: string) {
  let file: any;
  let done = false;
  getFileBlobUsingURL(filePathOrUrl, function(blob: any) {
    file = blobToFile(blob, 'testFile.jpg');
    done = true;
  });

  while (!done) {}
  return file;
};
