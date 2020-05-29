import React from 'react';
import { Container, Content, Button, Text } from 'native-base';
import PartsBrowser from '../PartsBrowser';

export default function Parts({ navigation }) {
	const onPartPress = (part) => navigation.navigate('Part Info', part._id);
	const onNewPartPress = () => navigation.navigate('Edit Part');
	const newPartButton = <Button onPress={onNewPartPress}><Text>New Part</Text></Button>;

	return (
		<Container>
			<Content padder>
				<PartsBrowser onPartPress={onPartPress} extraControls={newPartButton} />
			</Content>
		</Container>
	);
}
