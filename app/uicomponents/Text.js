import React from 'react';
import PropTypes from 'prop-types';
import { Text as ReactNativeText } from 'react-native';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Text({ theme, children, small, style, ...props }) {
	const customStyling = {};

	if (small === true) {
		customStyling.fontSize = theme.getValue('fontSizeSmall');
	}

	const finalStyle = mergeStyles(theme.getStyle('text'), customStyling, style);
	return <ReactNativeText style={finalStyle} {...props}>{children}</ReactNativeText>;
}

Text.propTypes = {
	theme: Themed.themePropType.isRequired,
	children: PropTypes.node.isRequired,
	small: PropTypes.bool,
	style: stylePropType
};

Text.defaultProps = {
	style: null,
	small: false
};

export default Themed(Text);
