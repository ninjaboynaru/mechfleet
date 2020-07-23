import React from 'react';
import { Image } from 'react-native';
import { Themed } from '../mechtheme';

function Logo({ theme }) {
	const { getStyle, getValue } = theme;

	return <Image style={getStyle('logo')} source={getValue('logo')} />;
}

Logo.propTypes = {
	theme: Themed.themePropType.isRequired
};

export default Themed(Logo);
