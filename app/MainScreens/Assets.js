import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { ErrorDisplay, LoadingDisplay } from '../metaComponents';
import AssetCard from '../ItemCards/AssetCard';
import db from '../db/db';

const styles = StyleSheet.create({
	assetListContainer: {

	}
});

function assetListKeyExtractor(asset, index) {
	return `${asset._id}_${index}`;
}

export default class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.renderAssetCard = this.renderAssetCard.bind(this);
		this.onAssetCardPress = this.onAssetCardPress.bind(this);
		this.onAddAssetPress = this.onAddAssetPress.bind(this);
		this.state = { assets: null, loading: true, loadingError: false };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.setState({ loading: true });
		db.getAssets().then(
			(assets) => {
				this.setState({ assets, loading: false });
			},
			() => {
				this.setState({ loadingError: true });
			}
		);
	}

	onAssetCardPress(asset) {
		const navigation = this.props.navigation;
		navigation.navigate('Asset Info', asset);
	}

	onAddAssetPress() {
		this.props.navigation.navigate('Edit Asset');
	}

	buildAssetList() {
		const assets = this.state.assets;
		return (
			<FlatList
				style={styles.assetListContainer}
				data={assets}
				renderItem={this.renderAssetCard}
				keyExtractor={assetListKeyExtractor}
			/>
		);
	}

	renderAssetCard({ item }) {
		const asset = item;
		const onPress = () => {
			this.onAssetCardPress(asset);
		};
		return <AssetCard asset={asset} onPress={onPress} />;
	}

	render() {
		const { loading, loadingError } = this.state;

		if (loadingError === true) {
			return <ErrorDisplay>Error Loading Assets</ErrorDisplay>;
		}
		if (loading === true) {
			return <LoadingDisplay>Loading Assets</LoadingDisplay>;
		}

		return (
			<Container>
				<Content padder>
					<Button success block onPress={this.onAddAssetPress}>
						<Text>Add Asset</Text>
					</Button>
					{this.buildAssetList()}
				</Content>
			</Container>
		);
	}
}
