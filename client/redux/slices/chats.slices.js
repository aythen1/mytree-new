import { createSlice } from '@reduxjs/toolkit'

export const chatsSlices = createSlice({
  name: 'chats',
  initialState: {
    message: {},
    allMessagesFromContact: [],
    messages: [
      {
        id: 1,
        name: 'Maury',
        message: 'hola amigo',
        sendAgo: 'hace 11 min',
        notRead: 1
      },
      {
        id: 2,
        name: 'Marito',
        message: 'Buenos dias',
        sendAgo: 'hace 1 hora',
        notRead: 3
      },
      {
        id: 3,
        name: 'Alex',
        message: 'Hay que terminar RPA',
        sendAgo: 'hace 2 hora',
        notRead: 1
      },
      {
        id: 4,
        name: 'Juan',
        message: 'Vamos a la pile',
        sendAgo: 'hace 5 min',
        notRead: 4
      },
      {
        id: 5,
        name: 'Fer',
        message: 'Aguante editor',
        sendAgo: 'hace 10 min',
        notRead: 2
      }
    ]
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setAllMessagesFromContact: (state, action) => {
      state.allMessagesFromContact = state.message.contact()
    }
  }
})

export const { setMessage, setAllMessagesFromContact } = chatsSlices.actions

export default chatsSlices.reducer
