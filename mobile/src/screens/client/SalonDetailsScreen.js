import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../../theme';

export default function SalonDetailsScreen({ route, navigation }) {
  const { salon } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.iconCircle}>
            <Feather name="scissors" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Open today</Text>
          </View>
        </View>

        <Text style={styles.title}>{salon.name}</Text>
        <Text style={styles.subtitle}>Beauty & self-care waiting line management</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={18} color={COLORS.primary} />
          <Text style={styles.infoText}>{salon.address}, {salon.city}</Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="phone" size={18} color={COLORS.primary} />
          <Text style={styles.infoText}>{salon.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="clock" size={18} color={COLORS.primary} />
          <Text style={styles.infoText}>{salon.workingHours}</Text>
        </View>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.sectionTitle}>About this salon</Text>
        <Text style={styles.aboutText}>
          Join the queue digitally, save time, and track your place in line without
          waiting in uncertainty.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ServiceSelection', { salonId: salon.id })}
      >
        <Text style={styles.buttonText}>Choose a service</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    ...SHADOW,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    alignItems: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#F3E4EA',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    ...SHADOW,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    color: COLORS.text,
    fontSize: 15,
    flex: 1,
  },
  aboutCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    ...SHADOW,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});