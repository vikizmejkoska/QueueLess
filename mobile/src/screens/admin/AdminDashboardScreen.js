import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { COLORS, SHADOW } from '../../theme';
import useAdminStore from '../../store/adminStore';

export default function AdminDashboardScreen() {
  const token = useAdminStore((state) => state.token);
  const user = useAdminStore((state) => state.user);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDashboard(response.data);
    } catch (error) {
      console.log('Dashboard error:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hello</Text>
      <Text style={styles.title}>{user?.salonName || 'Admin Dashboard'}</Text>

      <View style={styles.grid}>
        <View style={styles.statCard}>
          <Feather name="users" size={22} color={COLORS.primary} />
          <Text style={styles.statValue}>{dashboard?.waitingCount ?? 0}</Text>
          <Text style={styles.statLabel}>Waiting</Text>
        </View>

        <View style={styles.statCard}>
          <Feather name="play-circle" size={22} color={COLORS.primary} />
          <Text style={styles.statValue}>
            {dashboard?.inProgressTicket ? 1 : 0}
          </Text>
          <Text style={styles.statLabel}>In progress</Text>
        </View>

        <View style={styles.statCardWide}>
          <Feather name="check-circle" size={22} color={COLORS.primary} />
          <Text style={styles.statValue}>{dashboard?.doneTodayCount ?? 0}</Text>
          <Text style={styles.statLabel}>Completed today</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Current queue status</Text>
        {dashboard?.inProgressTicket ? (
          <>
            <Text style={styles.infoText}>
              Ticket: {dashboard.inProgressTicket.ticketNumber}
            </Text>
            <Text style={styles.infoText}>
              Client: {dashboard.inProgressTicket.customerName}
            </Text>
            <Text style={styles.infoText}>
              Service: {dashboard.inProgressTicket.service?.name}
            </Text>
          </>
        ) : (
          <Text style={styles.emptyText}>No ticket is currently in progress.</Text>
        )}
      </View>
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
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textMuted,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
    marginBottom: 20,
  },
  grid: {
    gap: 14,
    marginBottom: 18,
  },
  statCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    ...SHADOW,
  },
  statCardWide: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    ...SHADOW,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 14,
  },
  statLabel: {
    color: COLORS.textMuted,
    marginTop: 6,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    ...SHADOW,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  infoText: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 10,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
});