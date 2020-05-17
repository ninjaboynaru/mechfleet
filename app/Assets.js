import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ErrorDisplay, LoadingDisplay } from './metaComponents';
import AssetCard from './AssetCard';
import db from './db/db';

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
		this.state = { assets: null, loading: false, loadingError: false };
	}

	componentDidMount() {
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

	// eslint-disable-next-line
	onAssetCardPress(asset) {
		console.log(`ASSET CLICK: ${asset._id}`);
	}

	buildAssetList() {
		const { assets } = this.state;
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
			return <ErrorDisplay>Error loading assets</ErrorDisplay>;
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
