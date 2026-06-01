import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Intro1: undefined;
  Intro2: undefined;
  Intro3: undefined;
  Login: undefined;
  MainApp: NavigatorScreenParams<TabParamList>;
  ProductDetail: { productId: string };
  Checkout: { productId: string };
  OrderTracking: { productId: string };
  Notifications: undefined;
  Profile: undefined;
  Settings: undefined;
  Wishlist: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  Explore: undefined;
  Scan: undefined;
  Closet: undefined;
  Stylist: undefined;
};

// Export combined navigation props type
export type RootStackNavigationProp = any; // Use for navigation.navigate, etc.
