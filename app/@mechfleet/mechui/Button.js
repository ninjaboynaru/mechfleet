import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Themed } from '../mechtheme';
import Text from './Text';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Button({ onPress, text, primary, plain, children, style, theme, ...props }) {
	let content = children;

	if (text) {
		const textStyle = [theme.getStyle('buttonTextLayout')];

		if (plain === true) {
			textStyle.push(theme.getStyle('buttonPrimaryPlainText'));
		}
		else if (primary === true) {
			textStyle.push(theme.getStyle('buttonPrimaryText'));
		}

		content = <Text style={textStyle}>{text}</Text>;
	}

	const finalStyle = mergeStyles(theme.getStyle('buttonLayout'), style);
	if (primary === true) {
		finalStyle.push(theme.getStyle('buttonPrimary'));
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
	primary: PropTypes.bool,
	plain: PropTypes.bool,
	children: PropTypes.node,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

Button.defaultProps = {
	onPress: () => {},
	text: null,
	primary: false,
	plain: false,
	children: null,
	style: null
};

export default Themed(Button);
