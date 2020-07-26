import React from 'react';
import { Image } from 'react-native';
import { Themed } from '../mechtheme';
import mergeStyles from './mergeStyles';
import stylePropType from './stylePropType';

function Logo({ theme, style, ...props }) {
	const { getStyle, getValue } = theme;
	const finalStyle = mergeStyles(getStyle('logo'), style);

	return <Image style={finalStyle} source={getValue('logo')} {...props} />;
}

Logo.propTypes = {
	theme: Themed.themePropType.isRequired,
	style: stylePropType
};

Logo.defaultProps = {
	style: null
};

export default Themed(Logo);
