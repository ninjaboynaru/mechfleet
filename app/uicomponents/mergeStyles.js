
function isObject(obj) {
	return typeof obj === 'object' && obj !== null;
}

function isArray(arr) {
	return Array.isArray(arr);
}

/**
* @function
* Merges two styles together. Either style can be an object, array of style objects, or null/undefined.
* If one of the styles is null, it is ignored and not merged.
*
* @returns {Array} Returns an array of styles. If both styles are null/undefined, an empty array is returned.
*/
export default function mergeStyles(baseStyle, otherStyle) {
	const baseIsObject = isObject(baseStyle);
	const baseIsArray = isArray(baseStyle);
	const otherIsObject = isObject(otherStyle);
	const otherIsArray = isArray(otherStyle);

	const mergedStyles = [];

	if (baseIsObject) {
		mergedStyles.push(baseStyle);
	}
	else if (baseIsArray) {
		mergedStyles.push(...baseStyle);
	}

	if (otherIsObject) {
		mergedStyles.push(otherStyle);
	}
	else if (otherIsArray) {
		mergedStyles.push(...otherStyle);
	}

	return mergedStyles;
}
