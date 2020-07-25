import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Themed } from '../mechtheme';
import Text from './Text';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Button({ onPress, text, children, style, theme, ...props }) {
	const finalStyle = mergeStyles(theme.getStyle('button'), style);

	let content = children;
	if (text) {
		content = <Text style={theme.getStyle('buttonText')}>{text}</Text>;
	}

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
