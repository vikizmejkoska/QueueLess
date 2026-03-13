import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function TicketCreatedScreen({ navigation }) {
  const currentTicket = useTicketStore((state) => state.currentTicket);

  if (!currentTicket) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No ticket found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.successCircle}>
        <Feather name="check" size={36} color={COLORS.white} />
      </View>

      <Text style={styles.subtitle}>
        Your place in line has been reserved successfully.
      </Text>

      <View style={styles.ticketCard}>
        <Text style={styles.ticketLabel}>Ticket number</Text>
        <Text style={styles.ticketNumber}>{currentTicket.ticketNumber}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Salon</Text>
          <Text style={styles.infoValue}>{currentTicket.salonName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Service</Text>
          <Text style={styles.infoValue}>{currentTicket.serviceName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>People ahead</Text>
          <Text style={styles.infoValue}>{currentTicket.peopleAhead}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Estimated wait</Text>
          <Text style={styles.infoValue}>
            {currentTicket.estimatedWaitMinutes} min
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('TicketStatus')}
      >
        <Text style={styles.primaryButtonText}>Track my ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('ClientTabs', { screen: 'HomeTab' })}
      >
        <Text style={styles.secondaryButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },
  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 22,
    ...SHADOW,
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  ticketCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 24,
    marginBottom: 22,
    ...SHADOW,
  },
  ticketLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  ticketNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  infoLabel: {
    color: COLORS.textMuted,
    fontSize: 15,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    ...SHADOW,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 16,
  },
});