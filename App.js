import React from 'react';
import { YellowBox } from 'react-native';
import MainNavigation from './app/MainNavigation';

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested',
	'Animated: `useNativeDriver` was not specified. This is a required'
]);

export default function App() {
	return <MainNavigation />
}
