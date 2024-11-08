import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../features/contactSlice';
import ContactItem from '../components/ContactItem';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts); // Subscribe to contacts in Redux store

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onPress={() => navigation.navigate('ContactDetail', { contactId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
