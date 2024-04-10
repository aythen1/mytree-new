import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async ({ senderId, receiverId, createdAt, limit }, thunkAPI) => {
    const response = await fetch(`/chat/room?senderId=${senderId}&receiverId=${receiverId}&createdAt=${createdAt}&limit=${limit}`);
    const data = await response.json();
    return data;
  }
);

export const markAsRead = createAsyncThunk(
  'chat/markAsRead',
  async (messageId, thunkAPI) => {
    const response = await fetch(`/chat/readed/${messageId}`, {
      method: 'PUT'
    });
    const data = await response.json();
    return data;
  }
);
