import React from 'react';
import ThemeContext from './ThemeContext';
import buildTheme from './buildTheme';

/**
* @Component
* @prop {Object} values - Theme values object to build the theme with
* @prop {Function} stylesBuilder - Styles builder function to build the theme with. Given a getValue function, should return an object of styles where each property is a style.
*
* Provides "theme" object throguh React context
*/
export default function ThemeProvider({ values, stylesBuilder, children }) {
	const theme = buildTheme(values, stylesBuilder);

	return (
		<ThemeContext.Provider value={theme}>
			{children}
		</ThemeContext.Provider>
	);
}
