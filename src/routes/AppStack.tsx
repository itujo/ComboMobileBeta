import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import OtherPage from '../pages/OtherPage';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F2F3F5' },
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="OtherPage" component={OtherPage} />
    </Navigator>
  </NavigationContainer>
);

export default Routes;
