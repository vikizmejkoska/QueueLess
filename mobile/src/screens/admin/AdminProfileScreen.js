import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SHADOW } from '../../theme';
import useAdminStore from '../../store/adminStore';

export default function AdminProfileScreen({ navigation }) {
  const user = useAdminStore((state) => state.user);
  const logoutAdmin = useAdminStore((state) => state.logoutAdmin);

  const handleLogout = () => {
    logoutAdmin();
    navigation.replace('ClientTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </Text>
        </View>

        <Text style={styles.name}>{user?.name || 'Admin User'}</Text>
        <Text style={styles.subtitle}>{user?.email || 'admin@example.com'}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Salon</Text>
        <Text style={styles.infoValue}>{user?.salonName || 'Assigned salon'}</Text>

        <Text style={styles.infoTitle}>Role</Text>
        <Text style={styles.infoValue}>{user?.role || 'ADMIN'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log out</Text>
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
    marginBottom: 18,
    ...SHADOW,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.primary,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.textMuted,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    ...SHADOW,
  },
  infoTitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});