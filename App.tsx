/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AppStack from './src/routes/AppStack';

const App: React.FC = () => (
  <>
    <StatusBar backgroundColor="transparent" translucent style="dark" />
    <AppStack />
  </>
);

export default App;
