import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Themed } from '../../mechtheme';
import mergeStyles from '../mergeStyles';
import stylePropType from '../stylePropType';

function TextInput({ placeholder, value, onChange, style, theme, ...props }) {
	const finalStyle = mergeStyles(theme.getStyle('baseTextField', 'textInput'), style);

	return (
		<ReactNativeTextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChange}
			style={finalStyle}
			{...props}
		/>
	);
}

TextInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

TextInput.defaultProps = {
	placeholder: null,
	style: null
};

export default Themed(TextInput);
