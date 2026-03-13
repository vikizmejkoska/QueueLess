import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function MyTicketScreen({ navigation }) {
  const currentTicket = useTicketStore((state) => state.currentTicket);

  if (!currentTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Ticket</Text>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No active ticket</Text>
          <Text style={styles.emptyText}>
            Take a virtual ticket from the Home screen to track your place in line.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ClientTabs', { screen: 'HomeTab' })}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Ticket</Text>

      <View style={styles.ticketCard}>
        <Text style={styles.ticketNumber}>{currentTicket.ticketNumber}</Text>
        <Text style={styles.info}>Salon: {currentTicket.salonName}</Text>
        <Text style={styles.info}>Service: {currentTicket.serviceName}</Text>
        <Text style={styles.info}>People ahead: {currentTicket.peopleAhead}</Text>
        <Text style={styles.info}>
          Estimated wait: {currentTicket.estimatedWaitMinutes} min
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TicketStatus')}
        >
          <Text style={styles.buttonText}>Track Status</Text>
        </TouchableOpacity>
      </View>
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
  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    ...SHADOW,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  ticketCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    ...SHADOW,
  },
  ticketNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  button: {
    marginTop: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});