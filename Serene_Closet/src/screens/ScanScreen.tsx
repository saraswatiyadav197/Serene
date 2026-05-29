import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { X, ImageIcon, History, Sparkles, Shirt } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { IMAGES } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialImage } from '../components/EditorialImage';

const { width, height } = Dimensions.get('window');

type ScanScreenProps = {
  navigation: any;
};

export const ScanScreen = ({ navigation }: ScanScreenProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();

  // Core scan beam animation
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  
  // Custom tracking reticles
  const node1Opacity = useRef(new Animated.Value(0)).current;
  const node2Opacity = useRef(new Animated.Value(0)).current;
  const node3Opacity = useRef(new Animated.Value(0)).current;
  const bracketPulse = useRef(new Animated.Value(1)).current;

  // Cinematic results card reveal
  const resultFade = useRef(new Animated.Value(0)).current;
  const resultSlide = useRef(new Animated.Value(40)).current;

  // Edge vignette overlay for active scanning state
  const scanVignetteOpacity = useRef(new Animated.Value(0)).current;

  // Scanning simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(false);
  const [liveConfidence, setLiveConfidence] = useState(0);

  // Animated Floating Particles
  const particles = useRef([
    { x: new Animated.Value(40), y: new Animated.Value(40), opacity: new Animated.Value(0) },
    { x: new Animated.Value(180), y: new Animated.Value(60), opacity: new Animated.Value(0) },
    { x: new Animated.Value(90), y: new Animated.Value(140), opacity: new Animated.Value(0) },
    { x: new Animated.Value(130), y: new Animated.Value(180), opacity: new Animated.Value(0) },
    { x: new Animated.Value(200), y: new Animated.Value(120), opacity: new Animated.Value(0) },
  ]).current;

  // Scanner beam loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 240,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scanLineAnim]);

  // Particle animations & bracket pulse loop when scanning
  useEffect(() => {
    if (isScanning) {
      // Intensify corner vignette
      Animated.timing(scanVignetteOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Loop tracking node opacity transitions
      const nodeAnimation = Animated.loop(
        Animated.stagger(450, [
          Animated.sequence([
            Animated.timing(node1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node1Opacity, { toValue: 0.15, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(node2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node2Opacity, { toValue: 0.15, duration: 400, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(node3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(node3Opacity, { toValue: 0.15, duration: 400, useNativeDriver: true }),
          ]),
        ])
      );

      const bracketAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(bracketPulse, { toValue: 1.05, duration: 700, useNativeDriver: true }),
          Animated.timing(bracketPulse, { toValue: 1.0, duration: 700, useNativeDriver: true }),
        ])
      );

      nodeAnimation.start();
      bracketAnim.start();

      // Trigger floating particles inside box
      particles.forEach((p, idx) => {
        const loopParticle = () => {
          if (!isScanning) return;
          // Randomize starting location
          p.x.setValue(Math.random() * 190 + 30);
          p.y.setValue(Math.random() * 190 + 30);
          p.opacity.setValue(0);

          Animated.sequence([
            Animated.timing(p.opacity, {
              toValue: Math.random() * 0.7 + 0.3,
              duration: 900,
              useNativeDriver: true,
            }),
            Animated.timing(p.opacity, {
              toValue: 0,
              duration: 900,
              useNativeDriver: true,
            }),
          ]).start((res) => {
            if (res.finished) {
              loopParticle();
            }
          });
        };
        loopParticle();
      });

      return () => {
        nodeAnimation.stop();
        bracketAnim.stop();
      };
    } else {
      Animated.timing(scanVignetteOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      node1Opacity.setValue(0);
      node2Opacity.setValue(0);
      node3Opacity.setValue(0);
      bracketPulse.setValue(1);
      particles.forEach(p => p.opacity.setValue(0));
    }
  }, [isScanning]);

  // Spring animation for result reveal
  useEffect(() => {
    if (scanResult) {
      Animated.parallel([
        Animated.spring(resultFade, {
          toValue: 1,
          tension: 30,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(resultSlide, {
          toValue: 0,
          tension: 30,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      resultFade.setValue(0);
      resultSlide.setValue(40);
    }
  }, [scanResult]);

  const handleCapture = () => {
    if (isScanning || scanResult) return;
    setIsScanning(true);
    setScanStep(0);
    setLiveConfidence(32);
    Vibration.vibrate([0, 15, 90, 20]);

    // Live confidence counting up
    const interval = setInterval(() => {
      setLiveConfidence((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98.6;
        }
        return prev + Math.floor(Math.random() * 9 + 4);
      });
    }, 350);

    // Dynamic step progress simulation
    setTimeout(() => {
      setScanStep(1);
      Vibration.vibrate(8);
    }, 1100);
    setTimeout(() => {
      setScanStep(2);
      Vibration.vibrate(8);
    }, 2200);
    setTimeout(() => {
      setScanStep(3);
      Vibration.vibrate(8);
    }, 3300);
    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      setScanResult(true);
      Vibration.vibrate([0, 10, 25, 40]);
    }, 4400);
  };

  const getScanStepText = () => {
    switch (scanStep) {
      case 0:
        return 'Calibrating focal thread sensors...';
      case 1:
        return 'Analyzing organic fiber weave orientation...';
      case 2:
        return 'Weave pattern matching: Mulberry Silk Crepe Blend...';
      case 3:
        return 'Synthesizing local eco sustainability scores...';
      default:
        return 'Analyzing...';
    }
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanResult(false);
    setScanStep(0);
    setLiveConfidence(0);
  };

  const scanHighlightColor = isDarkMode ? colors.primaryBurgundy : colors.gold;
  const activeBracketColor = isDarkMode ? colors.primaryBurgundy : colors.gold;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Background with Editorial treatment */}
      <EditorialImage
        source={{ uri: IMAGES.fabricBg }}
        style={styles.backgroundImage}
        containerStyle={StyleSheet.absoluteFill}
        enableOverlay={true}
      />
      <View style={[styles.overlay, isDarkMode && { backgroundColor: 'rgba(5, 31, 32, 0.72)' }]} />
      {/* StatusBar handled by SafeLayout */}

      {/* Atmospheric Scanning vignette layer */}
      <Animated.View 
        style={[
          styles.scanVignette, 
          { 
            opacity: scanVignetteOpacity,
            backgroundColor: isDarkMode ? 'rgba(35, 83, 71, 0.12)' : 'rgba(22, 56, 50, 0.08)' 
          }
        ]} 
        pointerEvents="none" 
      />

      <SafeLayout statusBarMode="light-content" style={styles.container} applyBottomInset={true}>
        {/* Top Header bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.closeBtn}
          >
            <X size={20} color={colors.cardBackground} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>ATELIER SCANNER</Text>
            <Text style={[styles.subtitle, { color: colors.border }]}>AI TEXTILE & PATTERN DETECTOR</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Dynamic Center Viewfinder */}
        {!scanResult ? (
          <View style={styles.centerSection}>
            {/* Viewfinder Target */}
            <View style={styles.scannerBox}>
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketTL,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && { borderColor: activeBracketColor },
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketTR,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && { borderColor: activeBracketColor },
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketBL,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && { borderColor: activeBracketColor },
                ]}
              />
              <Animated.View
                style={[
                  styles.bracket,
                  styles.bracketBR,
                  { transform: [{ scale: bracketPulse }] },
                  isScanning && { borderColor: activeBracketColor },
                ]}
              />

              {/* Glowing Scan Beam */}
              <Animated.View
                style={[
                  styles.beamContainer,
                  { transform: [{ translateY: scanLineAnim }] },
                ]}
              >
                <LinearGradient
                  colors={['transparent', scanHighlightColor, 'transparent'] as const}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.beamGrad}
                />
              </Animated.View>

              {/* Advanced Live Bounding Box Nodes */}
              {isScanning && (
                <>
                  <Animated.View style={[styles.scanNode, { top: 60, left: 40, opacity: node1Opacity }]}>
                    <View style={[styles.nodePoint, { backgroundColor: scanHighlightColor }]} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>WEFT ANGLE: 92.4°</Text>
                    </View>
                  </Animated.View>

                  <Animated.View style={[styles.scanNode, { top: 160, left: 130, opacity: node2Opacity }]}>
                    <View style={[styles.nodePoint, { backgroundColor: scanHighlightColor }]} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>THREAD COUNT: HIGH</Text>
                    </View>
                  </Animated.View>

                  <Animated.View style={[styles.scanNode, { top: 100, left: 160, opacity: node3Opacity }]}>
                    <View style={[styles.nodePoint, { backgroundColor: scanHighlightColor }]} />
                    <View style={styles.nodeCard}>
                      <Text style={styles.nodeLabel}>DENSITY: OPTIMAL</Text>
                    </View>
                  </Animated.View>

                  {/* Glittering Floating Particles */}
                  {particles.map((p, idx) => (
                    <Animated.View
                      key={idx}
                      style={[
                        styles.particle,
                        {
                          left: p.x,
                          top: p.y,
                          opacity: p.opacity,
                          backgroundColor: scanHighlightColor,
                          shadowColor: scanHighlightColor,
                        },
                      ]}
                    />
                  ))}
                </>
              )}

              {/* Progress counter overlay */}
              {isScanning && (
                <View style={styles.counterOverlay}>
                  <Text style={[styles.counterVal, { color: scanHighlightColor }]}>{liveConfidence}%</Text>
                  <Text style={[styles.counterLabel, { color: colors.border }]}>RESOLVING TEXTURE</Text>
                </View>
              )}

              {isScanning && (
                <View style={styles.scanningLogsContainer}>
                  <GlassCard style={styles.logGlass} opacity={0.88}>
                    <View style={styles.loaderRow}>
                      <View style={[styles.loaderPulse, { backgroundColor: colors.primaryBurgundy }]} />
                      <Text style={[styles.logText, { color: colors.darkText }]}>{getScanStepText()}</Text>
                    </View>
                  </GlassCard>
                </View>
              )}
            </View>
          </View>
        ) : (
          /* Premium Scan Fabric Report Card with Spring Entry */
          <Animated.View 
            style={[
              styles.resultContainer,
              {
                opacity: resultFade,
                transform: [{ translateY: resultSlide }]
              }
            ]}
          >
            <GlassCard style={styles.resultCard} opacity={isDarkMode ? 0.88 : 0.96}>
              <View style={styles.resultHeader}>
                <View style={styles.sparkleRow}>
                  <Sparkles size={14} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
                  <Text style={[styles.resultTag, { color: colors.primaryBurgundy }]}>ATELIER RECOGNITION COMPLETE</Text>
                </View>
                <Text style={[styles.confidenceText, { color: colors.secondaryText }]}>98.6% CONFIDENCE</Text>
              </View>

              <Text style={[styles.fabricName, { color: colors.darkText }]}>Mulberry Silk Crepe Blend</Text>
              <Text style={[styles.fabricDesc, { color: colors.secondaryText }]}>
                High-end fluid twill weave with double-twisted yarn orientation. Extremely breathable, biodegradable fiber characteristics.
              </Text>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <View style={styles.specs}>
                <View style={styles.specItem}>
                  <Text style={[styles.specLabel, { color: colors.secondaryText }]}>WEAVE SPEC</Text>
                  <Text style={[styles.specVal, { color: colors.darkText }]}>High-Density Crepe</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={[styles.specLabel, { color: colors.secondaryText }]}>SUSTAINABILITY INDEX</Text>
                  <Text style={[styles.specVal, { color: colors.darkText }]}>Grade A • Carbon Neutral</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={[styles.specLabel, { color: colors.secondaryText }]}>CARE GUIDELINES</Text>
                  <Text style={[styles.specVal, { color: colors.darkText }]}>Dry Clean Only • Low Heat Iron</Text>
                </View>
              </View>

              <View style={styles.resultActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Vibration.vibrate(10);
                    navigation.navigate('Closet');
                  }}
                  style={[
                    styles.archiveBtn,
                    {
                      borderColor: colors.primaryBurgundy,
                      backgroundColor: colors.cardBackground,
                    }
                  ]}
                >
                  <Shirt size={14} color={colors.primaryBurgundy} style={{ marginRight: 6 }} />
                  <Text style={[styles.archiveBtnText, { color: colors.primaryBurgundy }]}>Archive in Closet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => {
                    Vibration.vibrate(10);
                    navigation.navigate('Stylist');
                  }}
                  style={[styles.stylistBtn, { backgroundColor: colors.primaryBurgundy }]}
                >
                  <Sparkles size={14} color={isDarkMode ? '#140F0F' : colors.cardBackground} style={{ marginRight: 6 }} />
                  <Text style={[styles.stylistBtnText, { color: isDarkMode ? '#140F0F' : colors.cardBackground }]}>Consult AI Stylist</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={resetScan}
                style={styles.resetBtn}
              >
                <Text style={[styles.resetBtnText, { color: colors.secondaryText }]}>Scan Another Piece</Text>
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>
        )}

        {/* Bottom Captured Actions Deck */}
        {!scanResult && (
          <View style={styles.bottomControls}>
            <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
              <ImageIcon size={22} color={colors.cardBackground} />
              <Text style={[styles.controlIconLabel, { color: colors.cardBackground }]}>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleCapture}
              style={[styles.captureBtnContainer, isScanning && styles.captureDisabled]}
              disabled={isScanning}
            >
              <View style={styles.captureBtnOuter}>
                <View style={[styles.captureBtnInner, { backgroundColor: colors.primaryBurgundy }, isScanning && styles.captureActive]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.controlIconBtn}>
              <History size={22} color={colors.cardBackground} />
              <Text style={[styles.controlIconLabel, { color: colors.cardBackground }]}>History</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeLayout>
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
    backgroundColor: 'rgba(5, 31, 32, 0.48)',
  },
  scanVignette: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 10,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: 'Georgia',
    fontSize: 7.5,
    letterSpacing: 1.5,
    marginTop: 2,
    fontWeight: '600',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBox: {
    width: 250,
    height: 250,
    position: 'relative',
    justifyContent: 'flex-start',
  },
  bracket: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  bracketTL: {
    top: -2,
    left: -2,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  bracketTR: {
    top: -2,
    right: -2,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
  },
  bracketBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  bracketBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
  beamContainer: {
    width: '100%',
    height: 6,
    position: 'absolute',
  },
  beamGrad: {
    width: '100%',
    height: '100%',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  scanNode: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodePoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  nodeCard: {
    backgroundColor: 'rgba(11, 43, 38, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(142, 182, 155, 0.25)',
  },
  nodeLabel: {
    fontFamily: 'Georgia',
    color: '#DAF1DE',
    fontSize: 6.5,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  counterOverlay: {
    position: 'absolute',
    top: '38%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 43, 38, 0.92)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(142, 182, 155, 0.2)',
  },
  counterVal: {
    fontFamily: 'Georgia',
    fontSize: 24,
    fontWeight: '700',
  },
  counterLabel: {
    fontFamily: 'Georgia',
    fontSize: 7,
    letterSpacing: 1.2,
    marginTop: 2,
    fontWeight: '600',
  },
  scanningLogsContainer: {
    position: 'absolute',
    bottom: -64,
    left: -16,
    right: -16,
    alignItems: 'center',
  },
  logGlass: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    width: width * 0.72,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loaderPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  logText: {
    flex: 1,
    fontFamily: 'Georgia',
    fontSize: 10,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  resultCard: {
    padding: 36,
    borderWidth: 0.5,
    borderRadius: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTag: {
    fontFamily: 'Georgia',
    fontSize: 8,
    letterSpacing: 1.5,
    marginLeft: 4,
    fontWeight: '600',
  },
  confidenceText: {
    fontFamily: 'Georgia',
    fontSize: 9,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  fabricName: {
    fontFamily: 'Georgia',
    fontSize: 22,
    marginBottom: 6,
    fontWeight: '700',
  },
  fabricDesc: {
    fontFamily: 'Georgia',
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    height: 0.5,
    marginVertical: 18,
    opacity: 0.4,
  },
  specs: {
    marginBottom: 28,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  specLabel: {
    fontFamily: 'Georgia',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '600',
  },
  specVal: {
    fontFamily: 'Georgia',
    fontSize: 11,
  },
  resultActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  archiveBtn: {
    flex: 1.1,
    height: 42,
    borderRadius: 21,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 6,
  },
  archiveBtnText: {
    fontFamily: 'Georgia',
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  stylistBtn: {
    flex: 1.1,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 6,
  },
  stylistBtnText: {
    fontFamily: 'Georgia',
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  resetBtn: {
    alignSelf: 'center',
    marginTop: 18,
    paddingVertical: 6,
  },
  resetBtnText: {
    fontFamily: 'Georgia',
    fontSize: 11.5,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 36,
    marginBottom: 36,
  },
  controlIconBtn: {
    alignItems: 'center',
  },
  controlIconLabel: {
    fontFamily: 'Georgia',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 6,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  captureBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureDisabled: {
    opacity: 0.5,
  },
  captureBtnOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  captureBtnInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  captureActive: {
    backgroundColor: '#FFF',
  },
});
