import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Assets from './MainScreens/Assets';
import AssetInfo from './MainScreens/AssetInfo';
import TaskInfo from './MainScreens/TaskInfo';
import EditAsset from './EditScreens/EditAsset';
import EditTask from './EditScreens/EditTask';

const stack = createStackNavigator();

export default function MainNavigation() {
	const screenOptions = {
		headerTitleAlign: 'center'
	};

	return (
		<NavigationContainer>
			<stack.Navigator initialRouteName="Assets" screenOptions={screenOptions}>
				<stack.Screen name="Assets" component={Assets} />
				<stack.Screen name="Asset Info" component={AssetInfo} />
				<stack.Screen name="Task Info" component={TaskInfo} />
				<stack.Screen name="Edit Asset" component={EditAsset} />
				<stack.Screen name="Edit Task" component={EditTask} />
			</stack.Navigator>
		</NavigationContainer>
	);
}
