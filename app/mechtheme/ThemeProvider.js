import React from 'react';
import ThemeContext from './ThemeContext';

function buildTheme(values, styles) {
	return {
		values,
		styles: styles(values),
		getValue: function getValue(valueName) {
			const valueExists = Object.prototype.hasOwnProperty.call(values, valueName);
			if (valueExists === false) {
				throw new ReferenceError(`Theme has no value named "${valueName}"`);
			}
			return values[valueName];
		}
	};
}

/**
* @Component
* @prop {Object} values - Theme values object to build the theme with
* @prop {Function} styles - Styles function to build the theme with. Given a "values" object, should return a set of styles
*
* Provides "theme" object throguh React context
*/
export default function ThemeProvider({ values, styles, children }) {
	const theme = buildTheme(values, styles);

	return (
		<ThemeContext.Provider value={theme}>
			{children}
		</ThemeContext.Provider>
	);
}
