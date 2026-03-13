import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/client/HomeScreen';
import SalonDetailsScreen from '../screens/client/SalonDetailsScreen';
import ServiceSelectionScreen from '../screens/client/ServiceSelectionScreen';
import CustomerFormScreen from '../screens/client/CustomerFormScreen';
import TicketCreatedScreen from '../screens/client/TicketCreatedScreen';
import TicketStatusScreen from '../screens/client/TicketStatusScreen';
import MyTicketScreen from '../screens/client/MyTicketScreen';
import ClientProfileScreen from '../screens/client/ClientProfileScreen';

import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import QueueManagementScreen from '../screens/admin/QueueManagementScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';

import { COLORS, SHADOW } from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 18,
          height: 64,
          borderRadius: 24,
          backgroundColor: COLORS.card,
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          ...SHADOW,
        },
        tabBarIcon: ({ color }) => {
          let iconName = 'home';

          if (route.name === 'HomeTab') iconName = 'home';
          if (route.name === 'MyTicketTab') iconName = 'clock';
          if (route.name === 'ProfileTab') iconName = 'user';

          return <Feather name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="MyTicketTab" component={MyTicketScreen} />
      <Tab.Screen name="ProfileTab" component={ClientProfileScreen} />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 18,
          height: 64,
          borderRadius: 24,
          backgroundColor: COLORS.card,
          borderTopWidth: 0,
          paddingTop: 8,
          paddingBottom: 8,
          ...SHADOW,
        },
        tabBarIcon: ({ color }) => {
          let iconName = 'layout';

          if (route.name === 'AdminDashboardTab') iconName = 'layout';
          if (route.name === 'AdminQueueTab') iconName = 'list';
          if (route.name === 'AdminProfileTab') iconName = 'user';

          return <Feather name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="AdminDashboardTab" component={AdminDashboardScreen} />
      <Tab.Screen name="AdminQueueTab" component={QueueManagementScreen} />
      <Tab.Screen name="AdminProfileTab" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ClientTabs"
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      >
        <Stack.Screen
          name="ClientTabs"
          component={ClientTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SalonDetails"
          component={SalonDetailsScreen}
          options={{ title: 'Salon Details' }}
        />
        <Stack.Screen
          name="ServiceSelection"
          component={ServiceSelectionScreen}
          options={{ title: 'Choose Service' }}
        />
        <Stack.Screen
          name="CustomerForm"
          component={CustomerFormScreen}
          options={{ title: 'Your Details' }}
        />
        <Stack.Screen
          name="TicketCreated"
          component={TicketCreatedScreen}
          options={{ title: 'Ticket Created' }}
        />
        <Stack.Screen
          name="TicketStatus"
          component={TicketStatusScreen}
          options={{ title: 'Track Ticket' }}
        />

        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{ title: 'Admin Login' }}
        />
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}