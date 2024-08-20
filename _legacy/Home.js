import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import getDataOverview from './getDataOverview';
import WithDataMeta from './metaComponents/WithDataMeta';

const styles = StyleSheet.create({
	headerStyle: {
		textAlign: 'center',
		fontWeight: 'bold',
		marginVertical: 32
	},
	navPanel: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	navButtonStyle: {
		width: '30%'
	},
	dataSection: {
		marginTop: 24,
		alignItems: 'center'

	},
	dataSectionTitle: {
		fontWeight: 'bold',
		textDecorationLine: 'underline'
	},
	dataStats: {
		marginTop: 6,
		alignItems: 'center'
	},
	dataStatsItem: {
	}
});

/**
* Expects children prop to be of component type OverviewDataItem
*/
function OverviewDataSection({ title, children }) {
	return (
		<View style={styles.dataSection}>
			<H1 style={styles.dataSectionTitle}>{title}</H1>
			<View style={styles.dataStats}>
				{children}
			</View>
		</View>
	);
}

function OverviewDataItem({ children }) {
	return (
		<View style={styles.dataStatsItem}>{children}</View>
	);
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		this.state = { dataOverview: null };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Data Overview');

		getDataOverview().then(
			(dataOverview) => {
				dataMeta.hideLoading();
				this.setState({ dataOverview });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading data overview');
			}
		);
	}

	buildNavPanel() {
		const onAssetsPress = () => this.props.navigation.navigate('Assets');
		const onTasksPress = () => this.props.navigation.navigate('Tasks');
		const onPartsPress = () => this.props.navigation.navigate('Parts');

		return (
			<View>
				<H1 style={styles.headerStyle}>Mech Fleet</H1>
				<View style={styles.navPanel}>
					<Button block style={styles.navButtonStyle} onPress={onAssetsPress}><Text>Assets</Text></Button>
					<Button block style={styles.navButtonStyle} onPress={onTasksPress}><Text>Tasks</Text></Button>
					<Button block style={styles.navButtonStyle} onPress={onPartsPress}><Text>Parts</Text></Button>
				</View>
			</View>
		);
	}

	buildOverview() {
		if (!this.state.dataOverview) {
			return null;
		}

		const dataOverview = this.state.dataOverview;
		return (
			<View>
				<OverviewDataSection title="Assets">
					<OverviewDataItem><Text>Online: {dataOverview.assets.online}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Online w Tasks: {dataOverview.assets.onlineWithTasks}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Online w Faults: {dataOverview.assets.onlineWithFaults}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Offline: {dataOverview.assets.offline}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Total: {dataOverview.assets.total}</Text></OverviewDataItem>
				</OverviewDataSection>
				<OverviewDataSection title="Tasks">
					<OverviewDataItem><Text>Install: {dataOverview.tasks.install}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Troubleshoot: {dataOverview.tasks.troubleshoot}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Service: {dataOverview.tasks.service}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Inspect: {dataOverview.tasks.inspect}</Text></OverviewDataItem>
					<OverviewDataItem><Text>PMCS: {dataOverview.tasks.pmcs}</Text></OverviewDataItem>
					<OverviewDataItem><Text>ToDo: {dataOverview.tasks.toDo}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Test: {dataOverview.tasks.test}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Other: {dataOverview.tasks.other}</Text></OverviewDataItem>
					<OverviewDataItem><Text>Total: {dataOverview.tasks.total}</Text></OverviewDataItem>
				</OverviewDataSection>
				<OverviewDataSection title="Parts Database">
					<OverviewDataItem><Text>Total Parts: {dataOverview.parts.total}</Text></OverviewDataItem>
				</OverviewDataSection>
			</View>
		);
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		return (
			<Container>
				<Content padder>
					{this.buildNavPanel()}
					{this.buildOverview()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(Home);
