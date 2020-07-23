import { StyleSheet } from 'react-native';

export default function(getValue) {
	return StyleSheet.create({
		containerMain: {
			width: '100%',
			height: '100%',
			flexDirection: 'column',
			justifyContent: 'center',
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
		}
	});
}
