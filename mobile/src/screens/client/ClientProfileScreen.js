import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../../theme';

export default function ClientProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>V</Text>
        </View>

        <Text style={styles.name}>Guest Client</Text>
        <Text style={styles.subtitle}>
          Manage your ticket tracking and preferences
        </Text>
      </View>

      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="clock" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Recent Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="bell" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="info" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>About QueueLess</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.adminButton}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={styles.adminButtonText}>Admin login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    ...SHADOW,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 8,
    marginBottom: 18,
    ...SHADOW,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  adminButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  adminButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});