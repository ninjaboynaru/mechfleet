import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as ReactNativeTextInput } from 'react-native';
import { Themed } from '../../mechtheme';
import mergeStyles from '../mergeStyles';
import stylePropType from '../stylePropType';

function TextArea({ placeholder, value, onChange, numberOfLines, style, theme, ...props }) {
	const finalStyle = mergeStyles(theme.getStyle('baseTextField', 'textArea'), style);

	return (
		<ReactNativeTextInput
			placeholder={placeholder}
			value={value}
			onChangeText={onChange}
			multiline
			numberOfLines={numberOfLines}
			style={finalStyle}
			{...props}
		/>
	);
}

TextArea.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	numberOfLines: PropTypes.number,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

TextArea.defaultProps = {
	placeholder: null,
	numberOfLines: 4,
	style: null
};

export default Themed(TextArea);
