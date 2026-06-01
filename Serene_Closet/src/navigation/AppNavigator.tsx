import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';

// Import Screens
import { IntroScreen1 } from '../screens/IntroScreen1';
import { IntroScreen2 } from '../screens/IntroScreen2';
import { IntroScreen3 } from '../screens/IntroScreen3';
import { LoginScreen } from '../screens/LoginScreen';

// Import newly added screens
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NotificationScreen } from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

import { TabNavigator } from './TabNavigator';

// Root Stack Navigator
export const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro1"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {/* Onboarding & Login */}
        <Stack.Screen name="Intro1" component={IntroScreen1} />
        <Stack.Screen name="Intro2" component={IntroScreen2} />
        <Stack.Screen name="Intro3" component={IntroScreen3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Main Tab Bar App */}
        <Stack.Screen name="MainApp" component={TabNavigator} />

        {/* Concierge Flow Screens */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
