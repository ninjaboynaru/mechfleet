import React from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import MainNavigation from './app/MainNavigation';

export default function App() {
	return (
		<StyleProvider style={getTheme(material)}>
			<MainNavigation />
		</StyleProvider>
	);
}
