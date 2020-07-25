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
		buttonPrimaryText: {
			color: getValue('buttonPrimaryContentColor')
		},
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
		}
	});
}
