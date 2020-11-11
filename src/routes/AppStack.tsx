/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login/Login';
import OtherPage from '../pages/OtherPage';
import Header from '../components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F2F3F5' },
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen
        name="OtherPage"
        component={OtherPage}
        options={{
          headerShown: true,
          header: (props) => (
            <Header title="Outra página" showCancel={false} {...props} />
          ),
        }}
      />
    </Navigator>
  </NavigationContainer>
);

export default Routes;
