import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Themed } from '../../mechtheme';
import mergeStyles from '../mergeStyles';
import stylePropType from '../stylePropType';

function FieldErrorMessage({ show, children, style, theme, ...props }) {
	if (show === false) {
		return null;
	}

	const finalStyle = mergeStyles(theme.getStyle('fieldErrorMessage'), style);
	return <Text style={finalStyle} {...props}>{children}</Text>;
}

FieldErrorMessage.propTypes = {
	show: PropTypes.bool,
	children: PropTypes.node,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

FieldErrorMessage.defaultProps = {
	show: true,
	children: null,
	style: null
};

export default Themed(FieldErrorMessage);
