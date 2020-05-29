import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'native-base';
import Fuse from 'fuse.js';
import PartCard from './ItemCards/PartCard';
import WithDataMeta from './metaComponents/WithDataMeta';
import { partModel } from './db/models';

const styles = StyleSheet.create({
	container: {

	},
	controls: {
		flexDirection: 'row',
		alignItems: 'center',
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
	keys: ['name', 'noun', 'nsn']
};

function partSortComparator(partA, partB) {
	return partA.name.localeCompare(partB.name);
}

class PartsBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.fuseSearcher = null;
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
		this.onPartPress = this.onPartPress.bind(this);
		this.state = { parts: [], matchedParts: [], searchTerm: '' };
	}

	componentDidMount() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Parts');

		partModel.getParts().then(
			(parts) => {
				parts.sort(partSortComparator);
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

		matchedParts.sort(partSortComparator);
		this.setState({ matchedParts });
	}

	onPartPress(part) {
		this.props.onPartPress(part);
	}

	buildPartsList() {
		const partCards = [];

		for (const part of this.state.matchedParts) {
			if (this.props.ignorePartIds.includes(part._id)) {
				continue;
			}
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
			<View style={styles.container}>
				<View style={styles.controls}>
					<Input
						placeholder="Search Parts"
						style={styles.searchInput}
						value={this.state.searchTerm}
						onChangeText={this.onSearchTermChange}
					/>
					{this.props.extraControls}
				</View>
				{this.buildPartsList()}
			</View>
		);
	}
}

PartsBrowser.defaultProps = {
	onPartPress: () => {},
	ignorePartIds: [],
	extraControls: null
};

export default WithDataMeta(PartsBrowser);
