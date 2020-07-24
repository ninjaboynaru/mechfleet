
function isObject(obj) {
	return typeof obj === 'object' && obj !== null;
}

function isArray(arr) {
	return Array.isArray(arr);
}

function isEmptyObject(obj) {
	if (!obj) {
		return true;
	}

	return Object.keys(obj).length === 0;
}

/**
* @function
* Merges any number of styles together into a single array of styles.
* Styles can be an object, array of style objects, or null/undefined.
* If a style is null/undefined or an empty object, it is ignored and not merged.
*
* @returns {Array} Returns an array of styles.
* If all styles are null/undefined or empty objects, an empty array is returned.
*/
export default function mergeStyles(...styles) {
	const mergedStyles = [];

	for (const style of styles) {
		const styleIsObject = isObject(style);
		const styleIsArray = isArray(style);
		const styleIsEmptyObject = isEmptyObject(style);

		if (styleIsObject === true && styleIsEmptyObject === false) {
			mergedStyles.push(style);
		}
		else if (styleIsArray === true) {
			mergedStyles.push(...style);
		}
	}

	return mergedStyles;
}
