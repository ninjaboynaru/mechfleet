import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Themed } from '../mechtheme';
import Text from './Text';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Button({ onPress, text, children, style, theme, ...props }) {
	let content = children;
	if (text) {
		const textStyle = theme.getStyle('buttonTextLayout', 'buttonPrimaryText');
		content = <Text style={textStyle}>{text}</Text>;
	}

	const finalStyle = mergeStyles(theme.getStyle('buttonLayout', 'buttonPrimary'), style);
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={onPress} style={finalStyle} {...props}>
			{content}
		</TouchableOpacity>
	);
}

Button.propTypes = {
	onPress: PropTypes.func,
	text: PropTypes.string,
	children: PropTypes.node,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

Button.defaultProps = {
	onPress: () => {},
	text: null,
	children: null,
	style: null
};

export default Themed(Button);
