import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Themed } from '../mechtheme';
import Text from './Text';
import Button from './Button';

function ConfirmationModal({ titleText, bodyText, cancelText, confirmText, onCancel, onConfirm, theme }) {
	return (
		<View style={theme.getStyle('modal')}>
			<TouchableWithoutFeedback onPress={onCancel}>
				<View style={theme.getStyle('modalBackground')} />
			</TouchableWithoutFeedback>
			<View style={theme.getStyle('modalContent')}>
				<Text large style={theme.getStyle('modalTitle')}>{titleText}</Text>
				<Text large style={theme.getStyle('modalBody')}>{bodyText}</Text>
				<View style={theme.getStyle('modalControls')}>
					<Button plain text={cancelText} onPress={onCancel} />
					<Button plain text={confirmText} onPress={onConfirm} />
				</View>
			</View>
		</View>
	);
}

ConfirmationModal.propTypes = {
	titleText: PropTypes.string.isRequired,
	bodyText: PropTypes.string.isRequired,
	cancelText: PropTypes.string.isRequired,
	confirmText: PropTypes.string.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	theme: Themed.themePropType.isRequired
};


export default Themed(ConfirmationModal);
