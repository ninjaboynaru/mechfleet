import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyleProvider, Spinner, H1 } from 'native-base';
import getTheme from './native-base-theme/components';
import theme from './native-base-theme/variables/platform';
import MainNavigation from './app/MainNavigation';
import db from './app/db/db';

const styles = StyleSheet.create({
	centeredInfoView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		color: 'red'
	}
});

function CenteredInfoView(props) {
	return <View style={styles.centeredInfoView}>{props.children}</View>
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbInitialized: false, dbInitializeError: false };
	}

	componentDidMount() {
		db.init().then(
			() => {
				this.setState({ dbInitialized: true });
			},
			() => {
				this.setState({ dbInitializeError: true });
			}
		)
	}

	render() {
		const { dbInitialized, dbInitializeError } = this.state;
		let toRender = null;

		if (dbInitializeError === true) {
			toRender = <CenteredInfoView><H1 style={styles.errorText}>Error Initializing Data Storage</H1></CenteredInfoView>
		}
		else if (dbInitialized === false) {
			toRender = (
				<CenteredInfoView>
					<Spinner />
					<H1>Initializing Data Storage</H1>
				</CenteredInfoView>
			);
		}
		else {
			toRender = <MainNavigation/>
		}
		return (
			<StyleProvider style={getTheme(theme)}>
				{toRender}
			</StyleProvider>
		);
	}
}
