import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Themed } from '../../mechtheme';
import mergeStyles from '../mergeStyles';
import stylePropType from '../stylePropType';

function Label({ children, style, theme, ...props }) {
	const finalStyle = mergeStyles(theme.getStyle('label'), style);
	return <Text style={finalStyle} {...props}>{children}</Text>;
}

Label.propTypes = {
	children: PropTypes.node,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

Label.defaultProps = {
	children: null,
	style: null
};

export default Themed(Label);
