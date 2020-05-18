import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyleProvider, Spinner, H1 } from 'native-base';
import getTheme from './native-base-theme/components';
import theme from './native-base-theme/variables/material';
import { ErrorDisplay, LoadingDisplay } from './app/metaComponents';
import MainNavigation from './app/MainNavigation';
import db from './app/db/db';

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
			toRender = <ErrorDisplay>Error Initializing Data Storage</ErrorDisplay>
		}
		else if (dbInitialized === false) {
			toRender = <LoadingDisplay>Initializing Data Storage</LoadingDisplay>
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
