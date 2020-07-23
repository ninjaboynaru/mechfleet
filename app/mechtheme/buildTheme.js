
/**
* Theme object
* @typedef {Object} Theme
* @property {Object} values - Object where each property corisponds to a theme value (colors, sizes, etc...)
* @property {Object} styles - Object where each property is a react-native style
* @property {Function} getValue - Given a value name as a string, will return that value or throw an error if it does not exist
* @property {Function} getStyle - Given a styleName as a string, will return that style or throw an error if it does not exist
*/

/**
* @function
* Returns a theme object given given a values object and stylesBuilder function.
* @returns {Theme} Theme object
*/
export default function buildTheme(values, stylesBuilder) {
	function getValue(valueName) {
		const valueExists = Object.prototype.hasOwnProperty.call(values, valueName);
		if (valueExists === false) {
			throw new ReferenceError(`Theme has no value named "${valueName}"`);
		}
		return values[valueName];
	}

	const styles = stylesBuilder(getValue);

	function getStyle(styleName) {
		const styleExists = Object.prototype.hasOwnProperty.call(styles, styleName);
		if (styleExists === false) {
			throw new ReferenceError(`Theme has no style named "${styleName}"`);
		}
		return styles[styleName];
	}

	return {
		values,
		styles,
		getValue,
		getStyle
	};
}
