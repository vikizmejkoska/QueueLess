import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import useTicketStore from '../../store/ticketStore';
import { COLORS, SHADOW } from '../../theme';

export default function HomeScreen({ navigation }) {
  const [salons, setSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const setSelectedSalon = useTicketStore((state) => state.setSelectedSalon);
  const clearFlow = useTicketStore((state) => state.clearFlow);

  useEffect(() => {
    clearFlow();
    fetchSalons();
  }, []);

  useEffect(() => {
    const filtered = salons.filter((salon) =>
      salon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSalons(filtered);
  }, [search, salons]);

  const fetchSalons = async () => {
    try {
      const response = await api.get('/salons');
      setSalons(response.data);
      setFilteredSalons(response.data);
    } catch (error) {
      console.log('Error fetching salons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalonPress = (salon) => {
    setSelectedSalon(salon);
    navigation.navigate('SalonDetails', { salon });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading salons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Welcome</Text>
          <Text style={styles.title}>Find your salon</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bell" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search salons"
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Popular salons</Text>

      <FlatList
        data={filteredSalons}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSalonPress(item)}>
            <View style={styles.cardTop}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>#{index + 1}</Text>
              </View>
            </View>

            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.address}</Text>
            <Text style={styles.cardText}>{item.city}</Text>
            <Text style={styles.cardHours}>Working hours: {item.workingHours}</Text>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleSalonPress(item)}
            >
              <Text style={styles.smallButtonText}>View services</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textMuted,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW,
  },
  searchContainer: {
    marginTop: 22,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    ...SHADOW,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
    ...SHADOW,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  cardBadge: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  cardHours: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 6,
    marginBottom: 14,
  },
  smallButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  smallButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});