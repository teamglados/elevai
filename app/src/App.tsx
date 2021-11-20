import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { styled, ThemeProvider } from './styles/styled';
import { useScreenOptions } from './styles/helpers';
import HomeScreen from './screens/home';
import ARScreen from './screens/ar';
import IncidentScreen from './screens/incident';

const Stack = createNativeStackNavigator();

function App() {
  const screenOptions = useScreenOptions();

  return (
    <Wrapper>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerLargeTitle: true, headerTitle: 'Incidents' }}
        />
        <Stack.Screen
          name="Incident"
          component={IncidentScreen}
          options={{ headerLargeTitle: true, headerTitle: 'Incident' }}
        />
        <Stack.Screen
          name="AR"
          component={ARScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  backgroundColor: '$background',
});

export default function Root() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </ThemeProvider>
  );
}
