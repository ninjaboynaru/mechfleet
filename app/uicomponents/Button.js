import React from 'react';
import PropTypes from 'prop-types';
import { View, Button as ReactNativeButton } from 'react-native';
import { Themed } from '../mechtheme';

function Button({ onPress, title, theme, ...props }) {
	return (
		<View style={theme.getStyle('buttonWrapper')}>
			<ReactNativeButton
				color={theme.getValue('primaryColor')}
				onPress={onPress}
				title={title}
				{...props}
			/>
		</View>
	);
}

Button.propTypes = {
	onPress: PropTypes.func,
	title: PropTypes.string,
	theme: Themed.themePropType.isRequired
};

Button.defaultProps = {
	onPress: () => {},
	title: ''
};

export default Themed(Button);
