import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import { Tab } from 'react-native-elements/dist/tab/Tab';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="operacao"
        options={{
          title: 'Operação',
          tabBarIcon: ({ color, focused }) => (
            <Feather name='tool' size={24} color="black" />
          ),
        }}
        />
      <Tabs.Screen
        name="pedido"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          )  
        }}
        />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginRight: 120,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});