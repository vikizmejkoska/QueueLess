import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function TicketStatusScreen() {
  const currentTicket = useTicketStore((state) => state.currentTicket);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTicketStatus = async () => {
    if (!currentTicket?.id) return;

    try {
      setLoading(true);
      const response = await api.get(`/tickets/${currentTicket.id}/status`);
      setTicketStatus(response.data);
    } catch (error) {
      console.log('Error fetching ticket status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketStatus();
  }, []);

  const getStatusColor = () => {
    if (ticketStatus?.status === 'waiting') return COLORS.warning;
    if (ticketStatus?.status === 'in_progress') return COLORS.primary;
    if (ticketStatus?.status === 'done') return COLORS.success;
    if (ticketStatus?.status === 'cancelled') return COLORS.danger;
    return COLORS.textMuted;
  };

  if (!currentTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No active ticket.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading ticket status...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Check your live status and estimated waiting time.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.ticketNumber}>{ticketStatus?.ticketNumber}</Text>

        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}22` }]}>
          <Text style={[styles.statusBadgeText, { color: getStatusColor() }]}>
            {ticketStatus?.statusText || ticketStatus?.status}
          </Text>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Feather name="users" size={18} color={COLORS.primary} />
            <Text style={styles.metaValue}>{ticketStatus?.peopleAhead}</Text>
            <Text style={styles.metaLabel}>Ahead</Text>
          </View>

          <View style={styles.metaItem}>
            <Feather name="clock" size={18} color={COLORS.primary} />
            <Text style={styles.metaValue}>{ticketStatus?.estimatedWaitMinutes}</Text>
            <Text style={styles.metaLabel}>Minutes</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Salon</Text>
          <Text style={styles.detailValue}>{ticketStatus?.salonName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Service</Text>
          <Text style={styles.detailValue}>{ticketStatus?.serviceName}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Client</Text>
          <Text style={styles.detailValue}>{ticketStatus?.customerName}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchTicketStatus}>
        <Text style={styles.buttonText}>Refresh status</Text>
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
  subtitle: {
    marginBottom: 20,
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 24,
    marginBottom: 18,
    ...SHADOW,
  },
  ticketNumber: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 14,
  },
  statusBadge: {
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 22,
  },
  statusBadgeText: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  metaItem: {
    flex: 1,
    backgroundColor: '#FCF4F6',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  metaValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  metaLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    ...SHADOW,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  detailLabel: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
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