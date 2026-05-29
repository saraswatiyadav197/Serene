import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeLayout } from '../components/SafeLayout';
import { EditorialHeader } from '../components/EditorialHeader';
import { PremiumInput } from '../components/PremiumInput';
import { GlassCard } from '../components/GlassCard';
import { THEME } from '../theme';
import { EXPLORE_PRODUCTS } from '../utils/mockData';
import { Check, Sparkles } from '../components/Icons';

const { width } = Dimensions.get('window');

export const CheckoutScreen = ({ route, navigation }: any) => {
  const { productId } = route.params || { productId: 'e1' };
  const product = EXPLORE_PRODUCTS.find((p) => p.id === productId) || EXPLORE_PRODUCTS[0];

  const [address, setAddress] = useState('12, Halcyon Heights, Indiranagar');
  const [city, setCity] = useState('Bangalore');
  const [zipCode, setZipCode] = useState('560038');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9845');
  
  const [isOrdered, setIsOrdered] = useState(false);

  const deliveryFee = 25;
  const productPriceNum = parseInt(product.price.replace('$', '').replace(',', ''), 10);
  const totalVal = productPriceNum + deliveryFee;

  const handlePlaceOrder = () => {
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <SafeLayout statusBarMode="dark-content" style={styles.successContainer}>
        <View style={styles.successCardContainer}>
          <GlassCard style={styles.successCard} opacity={0.96}>
            <View style={styles.sparkleCircle}>
              <Sparkles size={32} color={THEME.colors.primaryBurgundy} fill={THEME.colors.primaryBurgundy} />
            </View>
            <Text style={styles.successTitle}>Order Secured</Text>
            <Text style={styles.successSubtitle}>YOUR LUXURY EXPERIENCE BEGINS</Text>
            
            <View style={styles.receipt}>
              <Text style={styles.receiptLabel}>ITEM SECURED</Text>
              <Text style={styles.receiptValue}>{product.title}</Text>
              
              <Text style={styles.receiptLabel}>ESTIMATED DELIVERY</Text>
              <Text style={styles.receiptValue}>Tomorrow, 2:00 PM (Express Concierge)</Text>

              <Text style={styles.receiptLabel}>SHIPPING TO</Text>
              <Text style={styles.receiptValue}>{address}, {city}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => navigation.replace('MainApp')}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>Return to Wardrobe</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('OrderTracking', { productId: product.id })}
              style={styles.trackBtn}
            >
              <Text style={styles.trackBtnText}>Track Order Capsule</Text>
            </TouchableOpacity>
          </GlassCard>
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout statusBarMode="dark-content" style={styles.container}>
      <EditorialHeader
        title="Concierge Checkout"
        subtitle="Secure Atelier Placement"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Brief Summary Card */}
        <View style={styles.productSummaryCard}>
          <Image source={{ uri: product.image }} style={styles.productImg} />
          <View style={styles.productMeta}>
            <Text style={styles.productCategory}>{product.category.toUpperCase()}</Text>
            <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        </View>

        {/* Shipping Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>CONCIERGE DELIVERY DESTINATION</Text>
          <PremiumInput
            label="Delivery Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter home/atelier suite..."
          />
          <View style={styles.inputRow}>
            <View style={{ flex: 1, marginRight: THEME.spacing.sm }}>
              <PremiumInput
                label="City"
                value={city}
                onChangeText={setCity}
                placeholder="City"
              />
            </View>
            <View style={{ flex: 1, marginLeft: THEME.spacing.sm }}>
              <PremiumInput
                label="ZIP / Postal Code"
                value={zipCode}
                onChangeText={setZipCode}
                placeholder="ZIP"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Secure Billing Entry */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>SECURE COGNITIVE BILLING</Text>
          <PremiumInput
            label="Chamber Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Card number"
            keyboardType="numeric"
          />
        </View>

        {/* Breakdown Card */}
        <View style={styles.breakdownSection}>
          <GlassCard style={styles.breakdownCard} opacity={0.88}>
            <Text style={styles.breakdownTitle}>ORDER DETAIL CAPSUlE</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Subtotal</Text>
              <Text style={styles.breakdownValue}>{product.price}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Private Courier</Text>
              <Text style={styles.breakdownValue}>$25.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>${totalVal.toLocaleString()}</Text>
            </View>
          </GlassCard>
        </View>
      </ScrollView>

      {/* Place Order Sticky Bottom Action */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handlePlaceOrder}
          style={styles.orderBtn}
        >
          <Text style={styles.orderBtnText}>AUTHORIZE SECURE PLACEMENT</Text>
        </TouchableOpacity>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  productSummaryCard: {
    flexDirection: 'row',
    marginHorizontal: THEME.spacing.md,
    backgroundColor: THEME.colors.cardBackground,
    borderRadius: THEME.borderRadius.card,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: THEME.spacing.md,
    alignItems: 'center',
    ...THEME.shadows.premium,
    marginTop: THEME.spacing.sm,
  },
  productImg: {
    width: 64,
    height: 80,
    borderRadius: THEME.borderRadius.card - 10,
  },
  productMeta: {
    marginLeft: THEME.spacing.md,
    flex: 1,
  },
  productCategory: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1.5,
    color: THEME.colors.primaryBurgundy,
  },
  productTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 16,
    color: THEME.colors.darkText,
    marginTop: 2,
  },
  productPrice: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    marginTop: 4,
  },
  formSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg + 4,
  },
  sectionLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.secondaryText,
    marginBottom: THEME.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
  },
  breakdownSection: {
    paddingHorizontal: THEME.spacing.md,
    marginTop: THEME.spacing.lg + 4,
  },
  breakdownCard: {
    padding: THEME.spacing.md + 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  breakdownTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 9,
    letterSpacing: 2,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.sm,
  },
  breakdownLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
  },
  breakdownValue: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.darkText,
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginVertical: THEME.spacing.md,
    opacity: 0.5,
  },
  totalLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 13,
    color: THEME.colors.darkText,
  },
  totalValue: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 18,
    color: THEME.colors.primaryBurgundy,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 22,
    left: THEME.spacing.md,
    right: THEME.spacing.md,
    zIndex: 100,
  },
  orderBtn: {
    backgroundColor: THEME.colors.primaryBurgundy,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadows.premiumDeep,
  },
  orderBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 10,
    color: THEME.colors.cardBackground,
    letterSpacing: 2,
  },
  successContainer: {
    flex: 1,
    backgroundColor: THEME.colors.softBeigeBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCardContainer: {
    width: width - 32,
    alignItems: 'center',
  },
  successCard: {
    width: '100%',
    padding: THEME.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: THEME.borderRadius.card + 6,
    ...THEME.shadows.premiumDeep,
  },
  sparkleCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(22, 56, 50, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(22, 56, 50, 0.15)',
  },
  successTitle: {
    fontFamily: THEME.typography.heading.fontFamily,
    fontSize: 26,
    color: THEME.colors.darkText,
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 2,
    color: THEME.colors.primaryBurgundy,
    marginTop: 4,
    marginBottom: THEME.spacing.lg,
  },
  receipt: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: THEME.borderRadius.card - 8,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    marginBottom: THEME.spacing.lg,
  },
  receiptLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 8,
    letterSpacing: 1,
    color: THEME.colors.secondaryText,
    marginBottom: 2,
  },
  receiptValue: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 12.5,
    color: THEME.colors.darkText,
    marginBottom: THEME.spacing.sm,
  },
  continueBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.primaryBurgundy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
    ...THEME.shadows.premium,
  },
  continueBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.cardBackground,
    letterSpacing: 0.5,
  },
  trackBtn: {
    paddingVertical: THEME.spacing.xs,
  },
  trackBtnText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 12,
    color: THEME.colors.secondaryText,
    textDecorationLine: 'underline',
  },
});
