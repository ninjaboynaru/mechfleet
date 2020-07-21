import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Assets from './MainScreens/Assets';
import Tasks from './MainScreens/Tasks/Tasks';
import Parts from './MainScreens/Parts';
import AssetInfo from './MainScreens/AssetInfo';
import TaskInfo from './MainScreens/TaskInfo';
import PartInfo from './MainScreens/PartInfo';
import EditAsset from './EditScreens/EditAsset';
import EditTask from './EditScreens/EditTask';
import EditPart from './EditScreens/EditPart';

import { ThemeProvider } from './mechtheme';
import themeValues from './mechtheme/theme/values';
import themeStyles from './mechtheme/theme/styles';

const stack = createStackNavigator();

export default function MainNavigation() {
	const screenOptions = {
		headerTitleAlign: 'center'
	};

	return (
		<ThemeProvider values={themeValues} styles={themeStyles}>
			<NavigationContainer>
				<stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
					<stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<stack.Screen name="Assets" component={Assets} />
					<stack.Screen name="Tasks" component={Tasks} />
					<stack.Screen name="Parts" component={Parts} />
					<stack.Screen name="Asset Info" component={AssetInfo} />
					<stack.Screen name="Task Info" component={TaskInfo} />
					<stack.Screen name="Part Info" component={PartInfo} />
					<stack.Screen name="Edit Asset" component={EditAsset} />
					<stack.Screen name="Edit Task" component={EditTask} />
					<stack.Screen name="Edit Part" component={EditPart} />
				</stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
