import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Assets from './Assets';
import AssetInfo from './AssetInfo';
import TaskInfo from './TaskInfo';

const stack = createStackNavigator();

export default function MainNavigation() {
	return (
		<NavigationContainer initialRouteName="Assets" headerMode="none">
			<stack.Navigator>
				<stack.Screen name="Assets" component={Assets} />
				<stack.Screen name="Asset Info" component={AssetInfo} />
				<stack.Screen name="Task Info" component={TaskInfo} />
			</stack.Navigator>
		</NavigationContainer>
	);
}
