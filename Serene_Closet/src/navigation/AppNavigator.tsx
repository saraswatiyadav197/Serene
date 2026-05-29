import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FloatingTabBar } from '../components/FloatingTabBar';
import { RootStackParamList, TabParamList } from './types';

// Import Screens
import { IntroScreen1 } from '../screens/IntroScreen1';
import { IntroScreen2 } from '../screens/IntroScreen2';
import { IntroScreen3 } from '../screens/IntroScreen3';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { StylistScreen } from '../screens/StylistScreen';
import { WardrobeScreen } from '../screens/WardrobeScreen';

// Import newly added screens
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { OrderTrackingScreen } from '../screens/OrderTrackingScreen';
import { WishlistScreen } from '../screens/WishlistScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NotificationScreen } from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Bottom Tab Navigation Configuration utilizing custom FloatingTabBar
const TabNavigator = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{ tabBarLabel: 'Scan' }}
      />
      <Tab.Screen
        name="Closet"
        component={WardrobeScreen}
        options={{ tabBarLabel: 'Closet' }}
      />
      <Tab.Screen
        name="Stylist"
        component={StylistScreen}
        options={{ tabBarLabel: 'Stylist' }}
      />
    </Tab.Navigator>
  );
};

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
