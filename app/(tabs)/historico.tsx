import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([
    { id: '1', status: 'Em andamento', description: 'Pedido 1' },
    { id: '2', status: 'Concluído', description: 'Pedido 2' },
    { id: '3', status: 'Em andamento', description: 'Pedido 3' },
  ]);

 const renderOrder = (item : any) => (
  <View style={styles.orderContainer}>
    <Text style={styles.orderId}>Pedido {item.id}</Text>
    <Text style={styles.orderStatus}>Status: {item.status}</Text>
    <Text style={styles.orderDescription}>Descrição: {item.description}</Text>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => renderOrder(item)}
        keyExtractor={(item) => item.id}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
  },
});