import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ContactItem({ contact, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
      <Text style={styles.info}>{contact.phone}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});