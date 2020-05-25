import jsonata from 'jsonata';

/**
* Given an array of data documents (objects with a string property _id), return the index, and data document itself
* with a matching _id property. Returns the first matching document (in case multiple documents match the _id)
*
* @arg {Object[]} dataArray - Array of objects, each with an _id property
* @arg {string} dataId - _id of the object to find in the dataArray arg
*
* @returns {Object} - Returns null if an object in dataArray with _id dataId could not be found. Otherwise returns an object with the following properties
* {integer} index - Array index of the found object within dataArray
* {obect} document - The found object itself
*/
function getDocumentInfoById(dataArray, dataId) {
	const queryExpression = jsonata(`$#$i[_id='${dataId}'][0].{"index": $i, "document": $}`);
	const result = queryExpression.evaluate(dataArray);


	if (!result) {
		return null;
	}

	return result;
}

/**
* The same as getDocumentById, except this returns the document object itself or null if the document could not
* be found
*/
function getDocumentById(dataArray, dataId) {
	const documentInfo = getDocumentInfoById(dataArray, dataId);

	if (!documentInfo) {
		return null;
	}

	return documentInfo.document;
}


/**
	* The same as getDocumentById, except this returns the document array index itself or -1 if the document could
	* not be found.
	*/
function getDocumentIndexById(dataArray, dataId) {
	const documentInfo = getDocumentInfoById(dataArray, dataId);

	if (!documentInfo) {
		return -1;
	}

	return documentInfo.index;
}

export default { getDocumentInfoById, getDocumentById, getDocumentIndexById };
