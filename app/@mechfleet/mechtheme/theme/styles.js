import { StyleSheet } from 'react-native';

export default function(getValue) {
	return StyleSheet.create({
		containerMain: {
			width: '100%',
			height: '100%',
			flexDirection: 'column',
			alignItems: 'center',
			backgroundColor: getValue('backgroundColor'),
			padding: getValue('mainContainerPadding')
		},
		logo: {
			width: getValue('logoWidth'),
			height: getValue('logoHeight'),
			resizeMode: 'contain'
		},
		heading: {
			color: getValue('textColor'),
			fontWeight: 'bold'
		},
		text: {
			fontSize: getValue('fontSize'),
			color: getValue('textColor')
		},


		// Buttons
		buttonLayout: {
			justifyContent: 'center',
			alignItems: 'center',
			margin: getValue('buttonStandardMargin'),
			padding: getValue('buttonStandardPadding')
		},
		buttonTextLayout: {
			fontSize: getValue('buttonContentSize'),
			fontWeight: 'bold'
		},
		buttonPrimary: {
			backgroundColor: getValue('buttonPrimaryColor'),
			borderRadius: getValue('buttonBorderRadius')
		},
		buttonPlain: {

		},
		buttonPrimaryText: {
			color: getValue('buttonPrimaryContentColor')
		},
		buttonPrimaryPlainText: {
			color: getValue('buttonPrimaryColor')
		},


		// Forms
		formItem: {
			width: '100%',
			marginTop: getValue('itemVerticalMargin'),
			justifyContent: 'flex-start',
			alignItems: 'flex-start'
		},
		formItemError: {
			borderBottomWidth: 1,
			borderColor: getValue('dangerColor')
		},
		label: {
			color: getValue('labelColor'),
			marginBottom: getValue('labelBottomMargin')
		},
		fieldErrorMessage: {
			fontSize: getValue('fontSize'),
			color: getValue('dangerColor')
		},
		baseTextField: {
			width: '100%',
			fontSize: getValue('textFieldFontSize'),
			elevation: 2,
			backgroundColor: getValue('surfaceOnBackgroundColor')
		},
		textInput: {
		},
		textArea: {
			maxHeight: 100,
			textAlignVertical: 'top'
		},


		// Modal
		modal: {
			zIndex: 100,
			position: 'absolute',
			width: '100%',
			height: '100%',
			justifyContent: 'center',
			alignItems: 'center'
		},
		modalBackground: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: getValue('modalBackgroundColor')
		},
		modalContent: {
			maxWidth: '90%',
			minWidth: '40%',
			minHeight: 100,
			paddingHorizontal: 18,
			paddingTop: 18,
			borderRadius: 4,
			backgroundColor: getValue('modalContentBackgroundColor')
		},
		modalTitle: {
			paddingBottom: 12
		},
		modalBody: {

		},
		modalControls: {
			marginTop: 16,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center'
		}
	});
}
