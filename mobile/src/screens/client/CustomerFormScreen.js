import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function CustomerFormScreen({ navigation }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedSalon = useTicketStore((state) => state.selectedSalon);
  const selectedService = useTicketStore((state) => state.selectedService);
  const setCurrentTicket = useTicketStore((state) => state.setCurrentTicket);

  const handleCreateTicket = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      Alert.alert('Validation', 'Please enter your name and phone number.');
      return;
    }

    if (!selectedSalon || !selectedService) {
      Alert.alert('Error', 'Salon or service is missing.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/tickets', {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        salonId: selectedSalon.id,
        serviceId: selectedService.id,
      });

      setCurrentTicket(response.data);
      navigation.navigate('TicketCreated');
    } catch (error) {
      console.log('Error creating ticket:', error?.response?.data || error.message);
      Alert.alert('Error', 'Failed to create ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Enter your basic details so the salon can identify your place in line.
      </Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Feather name="map-pin" size={18} color={COLORS.primary} />
          <Text style={styles.summaryText}>{selectedSalon?.name || 'Selected salon'}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Feather name="star" size={18} color={COLORS.primary} />
          <Text style={styles.summaryText}>{selectedService?.name || 'Selected service'}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Feather name="clock" size={18} color={COLORS.primary} />
          <Text style={styles.summaryText}>
            {selectedService?.durationMinutes || 0} min
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Full name</Text>
        <View style={styles.inputWrap}>
          <Feather name="user" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Enter your name"
            placeholderTextColor={COLORS.textMuted}
          />
        </View>

        <Text style={styles.label}>Phone number</Text>
        <View style={styles.inputWrap}>
          <Feather name="phone" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            value={customerPhone}
            onChangeText={setCustomerPhone}
            placeholder="Enter your phone number"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleCreateTicket}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating ticket...' : 'Take a virtual ticket'}
        </Text>
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
  subtitle: {
    marginBottom: 20,
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    ...SHADOW,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    ...SHADOW,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCF4F6',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});