import React from 'react';
import PropTypes from 'prop-types';
import { Text as ReactNativeText } from 'react-native';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Text({ small, large, children, theme, style, ...props }) {
	const customStyling = {};

	if (small === true) {
		customStyling.fontSize = theme.getValue('fontSizeSmall');
	}
	else if (large === true) {
		customStyling.fontSize = theme.getValue('fontSizeLarge');
	}

	const finalStyle = mergeStyles(theme.getStyle('text'), customStyling, style);
	return <ReactNativeText style={finalStyle} {...props}>{children}</ReactNativeText>;
}

Text.propTypes = {
	small: PropTypes.bool,
	large: PropTypes.bool,
	children: PropTypes.node.isRequired,
	theme: Themed.themePropType.isRequired,
	style: stylePropType
};

Text.defaultProps = {
	small: false,
	large: false,
	style: null
};

export default Themed(Text);
