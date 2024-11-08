import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact, addContact } from '../features/contactSlice';

export default function EditContactScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const contactId = route.params?.contactId;
  const contact = useSelector(state =>
    state.contacts.contacts.find(c => c.id === contactId)
  ) || {};

  // Initialize state for form fields with existing contact data (or empty if new contact)
  const [firstName, setFirstName] = useState(contact.firstName || '');
  const [lastName, setLastName] = useState(contact.lastName || '');
  const [company, setCompany] = useState(contact.company || '');
  const [phone, setPhone] = useState(contact.phone || '');
  const [email, setEmail] = useState(contact.email || '');
  const [street1, setStreet1] = useState(contact.address?.street1 || '');
  const [street2, setStreet2] = useState(contact.address?.street2 || '');
  const [city, setCity] = useState(contact.address?.city || '');
  const [state, setState] = useState(contact.address?.state || '');
  const [zip, setZip] = useState(contact.address?.zip || '');

  // Function to handle saving the contact (either adds new or updates existing)
  const handleSave = () => {
    const contactData = {
      firstName,
      lastName,
      company,
      phone,
      email,
      address: { street1, street2, city, state, zip }
    };

    if (contactId) {
      dispatch(updateContact({ id: contactId, ...contactData })); // Update contact if ID exists
    } else {
      dispatch(addContact(contactData)); // Add new contact if no ID
    }
    navigation.goBack();
  };

  // Function to handle canceling the edit/add operation
  const handleCancel = () => {
    navigation.goBack(); // Go back without saving
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Street 1"
        value={street1}
        onChangeText={setStreet1}
      />
      <TextInput
        style={styles.input}
        placeholder="Street 2"
        value={street2}
        onChangeText={setStreet2}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP"
        value={zip}
        onChangeText={setZip}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={handleCancel} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
