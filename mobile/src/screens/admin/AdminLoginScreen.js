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
import { COLORS, SHADOW } from '../../theme';
import useAdminStore from '../../store/adminStore';

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState('admin@glow.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const loginAdmin = useAdminStore((state) => state.loginAdmin);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation', 'Please enter email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      loginAdmin({
        token: response.data.token,
        user: response.data.user,
      });

      navigation.replace('AdminTabs');
    } catch (error) {
      console.log('Admin login error:', error?.response?.data || error.message);
      Alert.alert('Login failed', 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>Admin access</Text>
        <Text style={styles.subtitle}>
          Log in to manage queue status, dashboard data, and active tickets.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <Feather name="mail" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter admin email"
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <Feather name="lock" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            placeholderTextColor={COLORS.textMuted}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Log in as admin'}
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
    paddingBottom: 40,
    justifyContent: 'center',
    flexGrow: 1,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 24,
    marginBottom: 18,
    ...SHADOW,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 10,
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 22,
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