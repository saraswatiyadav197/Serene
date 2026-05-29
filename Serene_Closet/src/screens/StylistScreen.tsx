import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Vibration,
} from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { Send, Sparkles, RefreshCw, Bookmark } from '../components/Icons';
import { THEME } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { AI_RECOMMENDED_LOOK, CHAT_HISTORY } from '../utils/mockData';
import { GlassCard } from '../components/GlassCard';
import { LuxuryButton } from '../components/LuxuryButton';
import { EditorialImage } from '../components/EditorialImage';
import AmbientBackground from '../components/AmbientBackground';

const CONTEXTS = ['Boardroom', 'High-Tea', 'Soiree', 'Dinner'];

export const StylistScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [selectedContext, setSelectedContext] = useState('Boardroom');
  const [currentLook, setCurrentLook] = useState(AI_RECOMMENDED_LOOK);
  const [isTyping, setIsTyping] = useState(false);

  // Typing Dots Animation
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  // Fade-in animation for recommendations
  const revealAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (isTyping) {
      const animateDot = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1.0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const anim1 = animateDot(dot1, 0);
      const anim2 = animateDot(dot2, 150);
      const anim3 = animateDot(dot3, 300);

      anim1.start();
      anim2.start();
      anim3.start();

      return () => {
        anim1.stop();
        anim2.stop();
        anim3.stop();
      };
    }
  }, [isTyping, dot1, dot2, dot3]);

  // Stagger look reveal on occasions change
  useEffect(() => {
    revealAnim.setValue(0.5);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: THEME.motion.durations.screen,
      useNativeDriver: true,
    }).start();
  }, [selectedContext]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    Vibration.vibrate(10);
    const newMsg = {
      id: `m-${messages.length + 1}`,
      sender: 'user',
      text: inputValue,
    };

    setMessages([...messages, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Concierge typing pacing simulation
    setTimeout(() => {
      setIsTyping(false);
      Vibration.vibrate(15);
      const responses = [
        "Splendid choice. I would suggest matching that with our Pleated Wool Trousers and the Cashmere Knit for a softer architectural line.",
        "An elegant direction. Let's accent that with gold-toned fine jewelry to anchor the luxury warmth of the fabric composition.",
        "Understood, Sarswati. I've updated the seasonal capsule archive. The composition is highly optimized for comfort and visual authority."
      ];
      const randomResponse = {
        id: `m-${messages.length + 2}`,
        sender: 'stylist',
        text: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, randomResponse]);
    }, 2000);
  };

  const handleSwapItems = () => {
    Vibration.vibrate(10);
    const swappedItems = [...currentLook.items];
    const first = swappedItems.shift();
    if (first) {
      swappedItems.push(first);
    }
    setCurrentLook({
      ...currentLook,
      items: swappedItems,
    });
  };

  return (
    <AmbientBackground>
      <SafeLayout
        statusBarMode={isDarkMode ? 'light-content' : 'dark-content'}
        style={[styles.container, { backgroundColor: 'transparent' }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Header section */}
            <View style={styles.header}>
              <View style={styles.headerTitleRow}>
                <Sparkles size={18} color={colors.primaryBurgundy} fill={colors.primaryBurgundy} />
                <Text style={[styles.title, { color: colors.darkText }]}>AI Stylist</Text>
              </View>
              <Text style={[styles.subtitle, { color: colors.secondaryText }]}>COGNITIVE CONCIERGE & CAPSULES</Text>
            </View>

            {/* Context Filter Chips */}
            <View style={styles.contextWrapper}>
              <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>TARGET STYLE OCCASION</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contextScroll}>
                {CONTEXTS.map((ctx) => {
                  const isActive = selectedContext === ctx;
                  return (
                    <TouchableOpacity
                      key={ctx}
                      activeOpacity={0.8}
                      onPress={() => {
                        Vibration.vibrate(8);
                        setSelectedContext(ctx);
                      }}
                      style={[
                        styles.contextChip,
                        {
                          backgroundColor: isActive ? colors.primaryBurgundy : colors.cardBackground,
                          borderColor: isActive ? colors.primaryBurgundy : colors.border,
                        }
                      ]}
                    >
                      <Text
                        style={[
                          styles.contextChipText,
                          { color: isActive ? (isDarkMode ? '#140F0F' : colors.cardBackground) : colors.secondaryText }
                        ]}
                      >
                        {ctx.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Curated Outfit Set Presentation */}
            <Animated.View style={[styles.outfitSection, { opacity: revealAnim }]}>
              <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>RECOMMENDED LOOK COMPOSITION</Text>
              <Text style={[styles.lookTitle, { color: colors.darkText }]}>{currentLook.name}</Text>
              
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.outfitScroll}
              >
                {currentLook.items.map((item) => (
                  <View 
                    key={item.id} 
                    style={[
                      styles.itemCard, 
                      { 
                        backgroundColor: colors.cardBackground, 
                        borderColor: colors.border,
                        shadowColor: isDarkMode ? '#000000' : '#201515',
                      }
                    ]}
                  >
                    <View style={styles.itemImageContainer}>
                      <EditorialImage
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                        containerStyle={styles.itemImageContainer}
                      />
                    </View>
                    <View style={styles.itemMeta}>
                      <Text style={[styles.itemCategory, { color: colors.secondaryText }]}>{item.category}</Text>
                      <Text style={[styles.itemTitle, { color: colors.darkText }]} numberOfLines={1}>{item.title}</Text>
                      <Text style={[styles.itemBrand, { color: colors.primaryBurgundy }]}>{item.brand}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Action buttons for composition */}
              <View style={styles.outfitActions}>
                <LuxuryButton
                  title="Swap Items"
                  onPress={handleSwapItems}
                  variant="outline"
                  style={styles.actionBtn}
                  icon={<RefreshCw size={14} color={colors.primaryBurgundy} style={{ marginRight: 6 }} />}
                />
                <LuxuryButton
                  title="Save Look"
                  onPress={() => Vibration.vibrate([0, 15, 20])}
                  style={styles.actionBtnRight}
                  icon={<Bookmark size={14} color={isDarkMode ? '#140F0F' : colors.cardBackground} style={{ marginRight: 6 }} />}
                />
              </View>
            </Animated.View>

            {/* Chat dialog logs */}
            <View style={styles.chatSection}>
              <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>STYLIST CONVERSATION LOG</Text>
              
              {messages.map((msg) => {
                const isStylist = msg.sender === 'stylist';
                return (
                  <View
                    key={msg.id}
                    style={[
                      styles.messageRow,
                      isStylist ? styles.messageRowLeft : styles.messageRowRight,
                    ]}
                  >
                    {isStylist ? (
                      <GlassCard style={styles.stylistBubble} opacity={isDarkMode ? 0.82 : 0.88}>
                        <Text style={[styles.messageText, { color: colors.darkText }]}>{msg.text}</Text>
                      </GlassCard>
                    ) : (
                      <View style={[styles.userBubble, { backgroundColor: colors.primaryBurgundy }]}>
                        <Text style={[styles.userMessageText, { color: isDarkMode ? '#140F0F' : colors.cardBackground }]}>
                          {msg.text}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              })}

              {/* Pulsing AI Typing indicator */}
              {isTyping && (
                <View style={[styles.messageRow, styles.messageRowLeft]}>
                  <GlassCard style={styles.typingBubble} opacity={isDarkMode ? 0.82 : 0.85}>
                    <Animated.View style={[styles.typingDot, { opacity: dot1, backgroundColor: colors.primaryBurgundy }]} />
                    <Animated.View style={[styles.typingDot, { opacity: dot2, backgroundColor: colors.primaryBurgundy }]} />
                    <Animated.View style={[styles.typingDot, { opacity: dot3, backgroundColor: colors.primaryBurgundy }]} />
                  </GlassCard>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Input Bar (Sticky Bottom) */}
          <View style={styles.inputStickyContainer}>
            <GlassCard style={styles.inputStickyCard} opacity={isDarkMode ? 0.85 : 0.94}>
              <TextInput
                style={[styles.chatInput, { color: colors.darkText }]}
                placeholder="Ask Serene Stylist..."
                placeholderTextColor={colors.secondaryText}
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSend}
                style={[styles.sendBtn, { backgroundColor: colors.primaryBurgundy }]}
              >
                <Send size={16} color={isDarkMode ? '#140F0F' : colors.cardBackground} />
              </TouchableOpacity>
            </GlassCard>
          </View>
        </KeyboardAvoidingView>
      </SafeLayout>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 180, // Buffer for sticky bottom chat input + tab nav
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: 'Georgia',
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 2,
    fontWeight: '600',
  },
  contextWrapper: {
    marginTop: 18,
    paddingHorizontal: 18,
  },
  sectionLabel: {
    fontFamily: 'Georgia',
    fontSize: 8.5,
    letterSpacing: 1.8,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  contextScroll: {
    flexDirection: 'row',
  },
  contextChip: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    marginRight: 6,
  },
  contextChipText: {
    fontFamily: 'Georgia',
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  outfitSection: {
    marginTop: 28,
    paddingHorizontal: 18,
  },
  lookTitle: {
    fontFamily: 'Georgia',
    fontSize: 18,
    marginBottom: 18,
    fontWeight: '700',
  },
  outfitScroll: {
    paddingBottom: 6,
  },
  itemCard: {
    width: 140,
    marginRight: 18,
    borderRadius: 16,
    borderWidth: 0.5,
    padding: 10,
    ...THEME.shadows.premium,
  },
  itemImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemMeta: {
    paddingTop: 10,
  },
  itemCategory: {
    fontFamily: 'Georgia',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  itemTitle: {
    fontFamily: 'Georgia',
    fontSize: 12,
    marginVertical: 1,
    fontWeight: '700',
  },
  itemBrand: {
    fontFamily: 'Georgia',
    fontSize: 8,
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  outfitActions: {
    flexDirection: 'row',
    marginTop: 18,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
  },
  actionBtnRight: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    marginLeft: 10,
  },
  chatSection: {
    marginTop: 36,
    paddingHorizontal: 18,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 18,
    width: '100%',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
    paddingRight: 36,
  },
  messageRowRight: {
    justifyContent: 'flex-end',
    paddingLeft: 36,
  },
  stylistBubble: {
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 18,
    ...THEME.shadows.premium,
  },
  userBubble: {
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 18,
    ...THEME.shadows.premium,
  },
  messageText: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
    lineHeight: 18,
  },
  userMessageText: {
    fontFamily: 'Georgia',
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 62,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  typingDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 2.5,
  },
  inputStickyContainer: {
    position: 'absolute',
    bottom: 96,
    left: 18,
    right: 18,
    zIndex: 100,
  },
  inputStickyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    ...THEME.shadows.premiumDeep,
  },
  chatInput: {
    flex: 1,
    fontFamily: 'Georgia',
    fontSize: 13,
    padding: 0,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
