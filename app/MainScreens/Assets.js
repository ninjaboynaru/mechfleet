import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
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
		this.renderAssetCard = this.renderAssetCard.bind(this);
		this.onAssetCardPress = this.onAssetCardPress.bind(this);
		this.state = { assets: null, loading: true, loadingError: false };
	}

	componentDidMount() {
		db.getAssets().then(
			(assets) => {
				this.setState({ assets, loading: false });
			},
			() => {
				this.setState({ loadingError: true });
			}
		);
	}

	// eslint-disable-next-line
	onAssetCardPress(asset) {
		const navigation = this.props.navigation;
		navigation.navigate('Asset Info', asset);
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
			<View>
				{this.buildAssetList()}
			</View>
		);
	}
}
