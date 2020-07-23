import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';

/**
* @HOC
* Higher order component.
* Obtains the current theme context and passes it to the wrapped component as a prop named "theme"
*/
function Themed(ThemedComponent) {
	return function ThemedHOC(props) {
		const theme = React.useContext(ThemeContext);
		return <ThemedComponent theme={theme} {...props} />;
	};
}

/**
* @PropType
* PropType definition of the "theme" object passed as a prop to themed components.
* Themed componnets with PropType validation should use this as the definition of the "theme" prop.
*/
Themed.themePropType = PropTypes.shape({
	values: PropTypes.object.isRequired,
	styles: PropTypes.object.isRequired,
	getValue: PropTypes.func.isRequired,
	getStyle: PropTypes.func.isRequired
});

export default Themed;
