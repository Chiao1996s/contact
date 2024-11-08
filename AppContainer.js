import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EditContactScreen from './screens/EditContactScreen';
import ContactDetailScreen from './screens/ContactDetailScreen';

const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Contacts',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('EditContact')}
                title="Add"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="EditContact"
          component={EditContactScreen}
          options={{ title: 'Edit Contact' }}
        />
        <Stack.Screen
          name="ContactDetail"
          component={ContactDetailScreen}
          options={{ title: 'Contact Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
