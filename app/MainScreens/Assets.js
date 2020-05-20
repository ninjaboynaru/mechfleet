import React from 'react';
import { View } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import AssetCard from '../ItemCards/AssetCard';
import db from '../db/db';

class Assets extends React.Component {
	constructor(props) {
		super(props);
		this.dataMeta = this.props.dataMeta;
		this.onFocus = this.onFocus.bind(this);
		this.onAssetCardPress = this.onAssetCardPress.bind(this);
		this.onAddAssetPress = this.onAddAssetPress.bind(this);
		this.state = { assets: [] };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.dataMeta.showLoading('Loading Assets');
		db.getAssets().then(
			(assets) => {
				this.dataMeta.hideLoading();
				this.setState({ assets });
			},
			() => {
				this.dataMeta.hideLoading();
				this.dataMeta.toastDanger('Error loading assets');
			}
		);
	}

	onAssetCardPress(asset) {
		this.props.navigation.navigate('Asset Info', asset);
	}

	onAddAssetPress() {
		this.props.navigation.navigate('Edit Asset');
	}

	buildAssetList() {
		const assetCards = [];

		for (const asset of this.state.assets) {
			const onPress = () => this.onAssetCardPress(asset);
			assetCards.push(<AssetCard key={asset._id} asset={asset} onPress={onPress} />);
		}

		return assetCards;
	}

	render() {
		if (this.dataMeta.visibleDisplays.loading === true) {
			return null;
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

export default WithDataMeta(Assets);
