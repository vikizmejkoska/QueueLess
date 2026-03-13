import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function ServiceSelectionScreen({ route, navigation }) {
  const { salonId } = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const setSelectedService = useTicketStore((state) => state.setSelectedService);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get(`/salons/${salonId}/services`);
      setServices(response.data);
    } catch (error) {
      console.log('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    navigation.navigate('CustomerForm');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Select the treatment you want to join the queue for
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelectService(item)}>
            <View style={styles.iconWrap}>
              <Feather name="star" size={18} color={COLORS.primary} />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>{item.durationMinutes} min</Text>
                </View>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>{item.price} MKD</Text>
                </View>
              </View>
            </View>

            <Feather name="chevron-right" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 12,
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
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  cardDescription: {
    color: COLORS.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metaBadge: {
    backgroundColor: '#F5E8EC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  metaText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 12,
  },
});