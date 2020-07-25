import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Fleets from './FleetsScreen/Fleets';
import EditFleet from './EditScreens/EditFleet';

import { ThemeProvider } from './mechtheme';
import themeValues from './mechtheme/theme/values';
import themeStyles from './mechtheme/theme/styles';

const stack = createStackNavigator();

export default function MainNavigation() {
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
