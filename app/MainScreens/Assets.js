import React from 'react';
import { Container, Content, Button, Text } from 'native-base';
import AssetCard from '../ItemCards/AssetCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import { assetModel } from '../db/models';

function assetSortComparator(assetA, assetB) {
	if (assetA.status === assetB.status) {
		return assetA.name.localeCompare(assetB.name);
	}

	if (assetA.status === 2) {
		return -1;
	}

	return 1;
}

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
		this.loadAssets();
	}

	loadAssets() {
		this.dataMeta.showLoading('Loading Assets');
		assetModel.getAssets(true).then(
			(assets) => {
				assets.sort(assetSortComparator);
				this.dataMeta.hideLoading();
				this.setState({ assets });
			},
			() => {
				this.dataMeta.hideLoading();
				this.dataMeta.toastDanger('Error loading assets');
			}
		);
	}

	onAssetCardPress(assetId) {
		this.props.navigation.navigate('Asset Info', assetId);
	}

	onAddAssetPress() {
		this.props.navigation.navigate('Edit Asset');
	}

	buildAssetList() {
		const assetCards = [];

		for (const asset of this.state.assets) {
			const onPress = () => this.onAssetCardPress(asset._id);
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
					<Button block onPress={this.onAddAssetPress}>
						<Text>Add Asset</Text>
					</Button>
					{this.buildAssetList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(Assets);
