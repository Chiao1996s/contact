import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Fetch contacts from Firestore
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const querySnapshot = await getDocs(collection(db, 'contacts'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Add a new contact to Firestore
export const addContact = createAsyncThunk('contacts/addContact', async (contactData) => {
  const docRef = await addDoc(collection(db, 'contacts'), contactData);
  return { id: docRef.id, ...contactData };
});

// Update an existing contact in Firestore
export const updateContact = createAsyncThunk('contacts/updateContact', async ({ id, ...contactData }) => {
  const contactRef = doc(db, 'contacts', id);
  await updateDoc(contactRef, contactData);
  return { id, ...contactData };
});

// Delete a contact from Firestore
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await deleteDoc(doc(db, 'contacts', contactId));
  return contactId;
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload; // Update contact at found index
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  }
});

export default contactSlice.reducer;
