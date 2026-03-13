import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../../services/api';
import { COLORS, SHADOW } from '../../theme';
import useAdminStore from '../../store/adminStore';

export default function QueueManagementScreen() {
  const token = useAdminStore((state) => state.token);

  const [queue, setQueue] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/queue', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQueue(response.data);
    } catch (error) {
      console.log('Queue error:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const callNext = async () => {
    try {
      await api.post(
        '/admin/queue/next',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchQueue();
    } catch (error) {
      console.log('Call next error:', error?.response?.data || error.message);
      Alert.alert('Queue', error?.response?.data?.message || 'Failed to call next ticket.');
    }
  };

  const updateStatus = async (ticketId, status) => {
    try {
      await api.put(
        `/admin/tickets/${ticketId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchQueue();
    } catch (error) {
      console.log('Update status error:', error?.response?.data || error.message);
      Alert.alert('Queue', error?.response?.data?.message || 'Failed to update ticket status.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchQueue();
    }
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading queue...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Queue management</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={callNext}>
        <Text style={styles.primaryButtonText}>Call next ticket</Text>
      </TouchableOpacity>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>In progress</Text>
        {queue?.inProgressTicket ? (
          <View style={styles.ticketCard}>
            <Text style={styles.ticketNumber}>{queue.inProgressTicket.ticketNumber}</Text>
            <Text style={styles.ticketText}>{queue.inProgressTicket.customerName}</Text>
            <Text style={styles.ticketSubtext}>{queue.inProgressTicket.service?.name}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => updateStatus(queue.inProgressTicket.id, 'done')}
              >
                <Text style={styles.actionText}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => updateStatus(queue.inProgressTicket.id, 'cancelled')}
              >
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.emptyText}>No ticket is currently in progress.</Text>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Waiting tickets</Text>

        {queue?.waitingTickets?.length ? (
          queue.waitingTickets.map((ticket) => (
            <View key={ticket.id} style={styles.waitingCard}>
              <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
              <Text style={styles.ticketText}>{ticket.customerName}</Text>
              <Text style={styles.ticketSubtext}>{ticket.service?.name}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No waiting tickets.</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    ...SHADOW,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  ticketCard: {
    backgroundColor: '#FCF4F6',
    borderRadius: 20,
    padding: 16,
  },
  waitingCard: {
    backgroundColor: '#FCF4F6',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  ticketNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 8,
  },
  ticketText: {
    color: COLORS.text,
    fontSize: 15,
    marginBottom: 6,
  },
  ticketSubtext: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  doneButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.danger,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});