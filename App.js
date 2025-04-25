import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calendar from './screens/Calendar';
import LiveScore from './screens/LiveScore';
import ClubScreen from './screens/ClubScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calendrier" component={Calendar} />
        <Tab.Screen name="Résultats en Direct" component={LiveScore} />
        <Tab.Screen name="Clubs" component={ClubScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}