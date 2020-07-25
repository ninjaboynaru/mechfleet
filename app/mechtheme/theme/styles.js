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
		buttonWrapper: {
			margin: getValue('buttonStandardMargin')
		}
	});
}
