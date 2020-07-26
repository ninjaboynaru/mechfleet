import React from 'react';
import { Text } from 'react-native';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function buildHeading(fontSizeValueName) {
	function Heading({ theme, children, style, ...props }) {
		const sizeStyle = { fontSize: theme.getValue(fontSizeValueName) };
		const headingStyle = [theme.getStyle('heading'), sizeStyle];
		const finalStyle = mergeStyles(headingStyle, style);

		return <Text style={finalStyle} {...props}>{children}</Text>;
	}

	Heading.propTypes = {
		theme: Themed.themePropType.isRequired,
		style: stylePropType
	};

	Heading.defaultProps = {
		style: null
	};

	return Themed(Heading);
}

const H1 = buildHeading('fontSizeH1');
const H2 = buildHeading('fontSizeH2');
const H3 = buildHeading('fontSizeH3');
const H4 = buildHeading('fontSizeH4');

export { H1, H2, H3, H4 };
