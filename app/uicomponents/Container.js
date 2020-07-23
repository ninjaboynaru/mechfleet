import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Container({ theme, children, style, ...props }) {
	const finalStyle = mergeStyles(theme.getStyle('containerMain'), style);
	return <View style={finalStyle} {...props}>{children}</View>;
}

Container.propTypes = {
	theme: Themed.themePropType.isRequired,
	children: PropTypes.node.isRequired,
	style: stylePropType
};

Container.defaultProps = {
	style: null
};

export default Themed(Container);
