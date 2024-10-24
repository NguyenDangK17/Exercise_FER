import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact: {
    name: '',
    email: '',
    message: '',
  },
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    submitContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export const { submitContact } = contactSlice.actions;
export default contactSlice.reducer;
