import React from 'react';
import { YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider } from 'mechtheme';
import themeValues from 'mechtheme/theme/values';
import themeStyles from 'mechtheme/theme/styles';
import EditFleet from './EditScreens/EditFleet';
import Fleets from './FleetsScreen/Fleets';

const stack = createStackNavigator();

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested',
	'Animated: `useNativeDriver` was not specified. This is a required'
]);

export default function App() {
	const screenOptions = {
		headerTitleAlign: 'center'
	};

	return (
		<ThemeProvider values={themeValues} stylesBuilder={themeStyles}>
			<NavigationContainer>
				<stack.Navigator initialRouteName="Fleets" screenOptions={screenOptions}>
					<stack.Screen name="Fleets" component={Fleets} options={{ headerShown: false }} />
					<stack.Screen name="Edit Fleet" component={EditFleet} />
				</stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
