import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryInput } from '../components/LuxuryInput';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';

export const LoginScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();
  const [email, setEmail] = useState('sarswati@serene.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Motion reveals
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start();
  }, [formOpacity, formTranslateY, headerOpacity]);

  const handleLogin = () => {
    Vibration.vibrate([0, 10, 30]);
    navigation.replace('MainApp');
  };

  const outerContainerStyle = [styles.outerContainer, { backgroundColor: colors.softBeigeBackground }];

  return (
    <View style={outerContainerStyle}>
      {/* Editorial campaign bg */}
      <EditorialImage
        source={{ uri: IMAGES.loginBg }}
        style={styles.backgroundImage}
        containerStyle={StyleSheet.absoluteFill}
        enableOverlay={true}
      />
      <View style={[styles.overlay, isDarkMode ? styles.overlayDark : undefined]} />
      {/* StatusBar handled by SafeLayout */}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexFill}
      >
        <View style={[styles.flexFill, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Brand Logo */}
            <Animated.View style={[styles.headerSection, { opacity: headerOpacity }]}>
              <Text style={[styles.logoTextSub, { color: colors.cardBackground }]}>SERENE</Text>
              <Text style={[styles.logoText, { color: colors.cardBackground }]}>CLOSETS</Text>
              <Text style={[styles.tagline, { color: colors.border }]}>AI COGNITIVE STYLING</Text>
            </Animated.View>

            {/* Bottom Input Card */}
            <Animated.View style={[
              styles.formWrapper,
              { opacity: formOpacity, transform: [{ translateY: formTranslateY }] },
            ]}>
              <GlassCard style={styles.formCard} opacity={isDarkMode ? 0.82 : 0.94}>
                <Text style={[styles.cardTitle, { color: colors.darkText }]}>Welcome Back</Text>
                <Text style={[styles.cardSubtitle, { color: colors.secondaryText }]}>Continue your personalized fashion journey.</Text>

                {/* Inputs */}
                <LuxuryInput
                  label="Email Address"
                  placeholder="sarswati@serene.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <LuxuryInput
                  label="Password"
                  placeholder="••••••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />

                {/* Options: Remember Me & Forgot Password */}
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      Vibration.vibrate(6);
                      setRememberMe(!rememberMe);
                    }}
                    style={styles.checkboxContainer}
                  >
                    <View style={[styles.checkbox, { backgroundColor: colors.cardBackground, borderColor: colors.border }, rememberMe && { borderColor: colors.primaryBurgundy }]}>
                      {rememberMe && <View style={[styles.checkboxInner, { backgroundColor: colors.primaryBurgundy }]} />}
                    </View>
                    <Text style={[styles.checkboxLabel, { color: colors.darkText }]}>Remember Me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={[styles.forgotText, { color: colors.primaryBurgundy }]}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Action Button */}
                <LuxuryButton
                  title="Sign In"
                  onPress={handleLogin}
                  style={styles.signInBtn}
                />

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  <Text style={[styles.dividerText, { color: colors.secondaryText }]}>OR CONNECT WITH</Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                </View>

                {/* Social Login Buttons */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={[styles.socialBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  >
                    <Text style={[styles.socialBtnText, { color: colors.darkText }]}>Apple</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={[styles.socialBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  >
                    <Text style={[styles.socialBtnText, { color: colors.darkText }]}>Google</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => Vibration.vibrate(8)}
                    style={[styles.socialBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
                  >
                    <Text style={[styles.socialBtnText, { color: colors.darkText }]}>Facebook</Text>
                  </TouchableOpacity>
                </View>

                {/* Create Account link */}
                <View style={styles.registerContainer}>
                  <Text style={[styles.noAccountText, { color: colors.secondaryText }]}>New to SERENE? </Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={[styles.registerText, { color: colors.primaryBurgundy }]}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            </Animated.View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(5, 31, 32, 0.46)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 28,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 36,
  },
  logoTextSub: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 20,
    letterSpacing: 8,
    textTransform: 'uppercase',
  },
  logoText: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 4,
    marginTop: -4,
  },
  tagline: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 9.5,
    letterSpacing: 2.2,
    marginTop: 6,
    fontWeight: '600',
  },
  formWrapper: {
    marginHorizontal: 28,
  },
  formCard: {
    paddingVertical: 36,
    paddingHorizontal: 28,
    borderWidth: 0.5,
    borderRadius: 20,
    ...THEME.shadows.premiumDeep,
  },
  cardTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 22,
    marginBottom: 2,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    marginBottom: 36,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 1.5,
  },
  checkboxLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    marginLeft: 10,
  },
  forgotText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  signInBtn: {
    width: '100%',
    marginBottom: 28,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    opacity: 0.6,
  },
  dividerText: {
    fontFamily: THEME.typography.uppercase.fontFamily,
    fontSize: 7.5,
    letterSpacing: 1.5,
    marginHorizontal: 10,
    fontWeight: '700',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  socialBtn: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    ...THEME.shadows.premium,
  },
  socialBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  noAccountText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
  },
  registerText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12.5,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});
