import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Themed } from '../mechtheme';

function Container({ theme, children }) {
	return <View style={[theme.getStyle('containerMain')]}>{children}</View>;
}

Container.propTypes = {
	theme: Themed.themePropType.isRequired,
	children: PropTypes.node.isRequired
};

export default Themed(Container);
