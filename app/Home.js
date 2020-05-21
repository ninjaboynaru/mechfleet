import React from 'react';
import { Container, Content, H1, Button, Text } from 'native-base';

const navButtonStyle = {
	marginVertical: 12
};

const headerStyle = {
	textAlign: 'center',
	fontWeight: 'bold',
	marginVertical: 32
};

export default function Home({ navigation }) {
	const onAssetsPress = () => navigation.navigate('Assets');
	const onPartsPress = () => navigation.navigate('Parts');

	return (
		<Container>
			<Content padder>
				<H1 style={headerStyle}>Mech Fleet</H1>
				<Button block style={navButtonStyle} onPress={onAssetsPress}><Text>Assets</Text></Button>
				<Button block style={navButtonStyle} onPress={onPartsPress}><Text>Parts</Text></Button>
			</Content>
		</Container>
	);
}
