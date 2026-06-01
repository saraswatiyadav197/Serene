import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FloatingTabBar } from '../components/FloatingTabBar';

import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { WardrobeScreen } from '../screens/WardrobeScreen';
import { StylistScreen } from '../screens/StylistScreen';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const renderFloatingTabBar = (props: any) => <FloatingTabBar {...props} />;

export const TabNavigator = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={renderFloatingTabBar}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ tabBarLabel: 'Scan' }} />
      <Tab.Screen name="Closet" component={WardrobeScreen} options={{ tabBarLabel: 'Closet' }} />
      <Tab.Screen name="Stylist" component={StylistScreen} options={{ tabBarLabel: 'Stylist' }} />
    </Tab.Navigator>
  );
};
