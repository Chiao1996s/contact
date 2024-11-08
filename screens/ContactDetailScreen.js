import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../features/contactSlice';

export default function ContactDetailScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { contactId } = route.params;
  
  // Subscribe to contacts in Redux store to automatically reflect updates
  const contact = useSelector(state => 
    state.contacts.contacts.find(c => c.id === contactId)
  );

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
    navigation.goBack(); // Go back after deleting
  };

  if (!contact) {
    return <Text>Contact not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
      <Text style={styles.info}>{contact.company}</Text>
      <Text style={styles.info}>{contact.phone}</Text>
      <Text style={styles.info}>{contact.email}</Text>
      <Text style={styles.info}>{`${contact.address.street1}, ${contact.address.street2}`}</Text>
      <Text style={styles.info}>{`${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('EditContact', { contactId: contact.id })} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
