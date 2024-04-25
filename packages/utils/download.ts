/**
 * Download from HTTP response
 * This is used to call server to get data first and then handle download manually
 * @param {*} response          HTTP response
 * @param {*} defaultFileName   default file name
 */
export function downloadHttpResponse(response, defaultFileName) {
  const contentType = response.headers["content-type"]
    ? response.headers["content-type"]
    : "application/octet-stream";

  let filename = defaultFileName;
  if (response.headers["content-disposition"]) {
    let temp = response.headers["content-disposition"];
    const index = temp.indexOf("filename=");
    if (index >= 0) {
      temp = temp.substr(index + 9); //+9 is to remove the length of "filename="
      filename = temp;
      //Handle possible Chinese file name
      filename = decodeURI(filename)
    }
  }
  //
  downloadData(response.data, contentType, filename);

}
/**
 * Download data to file name
 * @param {*} data        Data to download
 * @param {*} contentType  
 * @param {*} filename    file name
 */
export function downloadData(data, contentType, filename) {
  const blob = new Blob([data], {
    type: contentType
  });

  const url = window.URL.createObjectURL(blob); //Create download URL
  downloadUrl(url,filename)
}

//Download the given URL to filename
export function downloadUrl(url, filename) {
  const downloadElement = document.createElement("a");
  downloadElement.style = 'display: none'
  downloadElement.href=url
  downloadElement.download = filename; //download file name
  document.body.appendChild(downloadElement);
  downloadElement.click(); //Simulate click download
  document.body.removeChild(downloadElement); //Remove element
  window.URL.revokeObjectURL(url); //Release blob resource
}
