import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Input, Button, Text } from 'native-base';
import Fuse from 'fuse.js';
import PartCard from '../ItemCards/PartCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import db from '../db/db';

const styles = StyleSheet.create({
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	searchInput: {
		borderBottomWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		marginRight: 12
	}
});

const fuseSearchOptions = {
	includeScore: false,
	keys: ['name', 'noun', 'NSN']
};

class Parts extends React.Component {
	constructor(props) {
		super(props);
		this.fuseSearcher = null;
		this.onFocus = this.onFocus.bind(this);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
		this.onAddPartPress = this.onAddPartPress.bind(this);
		this.onPartPress = this.onPartPress.bind(this);
		this.state = { parts: [], matchedParts: [], searchTerm: '' };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Parts');

		db.getParts().then(
			(parts) => {
				dataMeta.hideLoading();
				this.fuseSearcher = new Fuse(parts, fuseSearchOptions);
				this.setState({ parts, matchedParts: parts });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading parts');
			}
		);
	}

	onSearchTermChange(searchTerm) {
		this.setState({ searchTerm });

		if (!searchTerm) {
			this.setState({ matchedParts: this.state.parts });
			return;
		}

		const searchResults = this.fuseSearcher.search(searchTerm);
		const matchedParts = [];

		for (const result of searchResults) {
			matchedParts.push(result.item);
		}

		this.setState({ matchedParts });
	}

	onAddPartPress() {
		this.props.navigation.navigate('Edit Part');
	}

	onPartPress(part) {
		this.props.navigation.navigate('Part Info', part);
	}

	buildPartsList() {
		const partCards = [];

		for (const part of this.state.matchedParts) {
			const onPress = () => this.onPartPress(part);
			partCards.push(<PartCard key={part._id} part={part} onPress={onPress} />);
		}

		return partCards;
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		return (
			<Container>
				<Content padder>
					<View style={styles.controls}>
						<Input
							placeholder="Search Parts"
							style={styles.searchInput}
							value={this.state.searchTerm}
							onChangeText={this.onSearchTermChange}
						/>
						<Button onPress={this.onAddPartPress}><Text>Add Part</Text></Button>
					</View>
					{this.buildPartsList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(Parts);
