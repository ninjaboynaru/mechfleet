import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';

const styles = StyleSheet.create({
	container: {
	}
});

export default function Assets() {
	return (
		<Container>
			<Content padder contentContainerStyle={styles.container}>
				<Button rounded block info><Text>Click Me!</Text></Button>
			</Content>
		</Container>
	);
}
