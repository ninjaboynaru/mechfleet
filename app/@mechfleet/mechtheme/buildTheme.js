
/**
* Theme object
* @typedef {Object} Theme
* @property {Object} values - Object where each property corisponds to a theme value (colors, sizes, etc...)
* @property {Object} styles - Object where each property is a react-native style
* @property {Function} getValue - Given a value name as a string, will return that value or throw an error if it does not exist
* @property {Function} getStyle - Given a styleName as a string (or multiple style names), will return that style or throw an error if it does not exist. If multiple styleNames are provided, will return an array of styles and will throw an error if any of the provided styleNames do not exist..
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

	function getStyle(...styleNames) {
		const foundStyles = [];

		for (const name of styleNames) {
			const styleExists = Object.prototype.hasOwnProperty.call(styles, name);

			if (styleExists === false) {
				throw new ReferenceError(`Theme has no style named "${name}"`);
			}

			foundStyles.push(styles[name]);
		}

		if (foundStyles.length === 0) {
			return null;
		}
		if (foundStyles.length === 1) {
			return foundStyles[0];
		}

		return foundStyles;
	}

	return {
		values,
		styles,
		getValue,
		getStyle
	};
}
