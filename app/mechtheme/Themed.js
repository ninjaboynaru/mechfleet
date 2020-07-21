import React from 'react';
import ThemeContext from './ThemeContext';

/**
* @HOC
* Higher order component.
* Obtains the current theme context and passes it to the wrapped component as a prop named "theme"
*/
export default function Themed(ThemedComponent) {
	return function ThemedHOC(props) {
		const theme = React.useContext(ThemeContext);
		return <ThemedComponent theme={theme} {...props} />;
	};
}
