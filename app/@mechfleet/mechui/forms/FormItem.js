import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Themed } from '../../mechtheme';
import mergeStyles from '../mergeStyles';
import stylePropType from '../stylePropType';

function FormItem({ error, children, style, theme, ...props }) {
	const errorStyle = null;
	if (error === true) {
		theme.getStyle('formItemError');
	}

	const finalStyle = mergeStyles(theme.getStyle('formItem'), errorStyle, style);
	return <View style={finalStyle} {...props}>{children}</View>;
}

FormItem.propTypes = {
	error: PropTypes.bool,
	children: PropTypes.node,
	style: stylePropType,
	theme: Themed.themePropType.isRequired
};

FormItem.defaultProps = {
	error: false,
	children: null,
	style: null
};

export default Themed(FormItem);
