import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Container({ theme, children, center, style, ...props }) {
	const customStyling = {};

	if (center === true) {
		customStyling.justifyContent = 'center';
	}

	const finalStyle = mergeStyles(theme.getStyle('containerMain'), customStyling, style);
	return <View style={finalStyle} {...props}>{children}</View>;
}

Container.propTypes = {
	theme: Themed.themePropType.isRequired,
	children: PropTypes.node.isRequired,
	center: PropTypes.bool,
	style: stylePropType
};

Container.defaultProps = {
	center: false,
	style: null
};

export default Themed(Container);
