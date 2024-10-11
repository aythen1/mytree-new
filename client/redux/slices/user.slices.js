import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance, { BACKURL } from "../../apiBackend";
import {
  getAllUsers,
  getUserData,
  getUserFriendsAndFamilyLength,
} from "../actions/user";

// Actualiza la contraseña del usuario
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, newPassword, oldPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/${userId}/update-password`, {
        new_password: newPassword,
        old_password: oldPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Inicio de sesión del usuario
export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKURL}/user/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Inicia sesión con Google
export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (googleData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/google", googleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Inicia sesión con Facebook
export const facebookSignIn = createAsyncThunk(
  "user/facebookSignIn",
  async (facebookData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/facebook", facebookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Busca un usuario por número de teléfono
export const findUserByCellphone = createAsyncThunk(
  "user/findUserByCellphone",
  async (phone, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/findCell", { phone });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Busca un usuario por correo electrónico
export const findUserByEmail = createAsyncThunk(
  "user/findUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/findEmail", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Agrega un amigo
export const addFriend = createAsyncThunk(
  "user/addFriend",
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/user/${userId}/add-friend/${friendId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Elimina un amigo
export const removeFriend = createAsyncThunk(
  "user/removeFriend",
  async ({ userId, friendId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/user/${userId}/remove-friend/${friendId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Agrega a favoritos
export const addToFavorites = createAsyncThunk(
  "user/addToFavorites",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/user/${userId}/add-favorite/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene las notificaciones de usuario
export const getUserNotifications = createAsyncThunk(
  "user/getUserNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}/notifications`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene las búsquedas recientes de usuario
export const getUserRecentSearches = createAsyncThunk(
  "user/getUserRecentSearches",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}/recentSearches`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Agrega una búsqueda reciente
export const addRecentSearch = createAsyncThunk(
  "user/addRecentSearch",
  async ({ userId, searchTerm }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/user/${userId}/recentSearches/add`, {
        searchTerm,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene el feed de usuario
export const getUserFeed = createAsyncThunk(
  "user/getUserFeed",
  async ({ userId, option, param1, param2, param3 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/user/${userId}/feed?option=${option}&param1=${param1}&param2=${param2}&param3=${param3}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene los favoritos de usuario
export const getUserFavorites = createAsyncThunk(
  "user/getUserFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}/favorite`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene los amigos de usuario
export const getUserFriends = createAsyncThunk(
  "user/getUserFriends",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}/friends`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Obtiene los posts de usuario
export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/posts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Alterna el "me gusta" en un post
export const toggleLike = createAsyncThunk(
  "user/toggleLike",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/user/${userId}/post/${postId}/toggle-like`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GESTION DE USUARIOS
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice del usuario
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    allUsers: [],
    data: {},
    familyLength: 0,
    friendLength: 0,
    loading: false,
    error: null,
    screen: "Muro",
  },
  reducers: {
    // Limpia el error en el estado del usuario
    clearError: (state) => {
      state.error = null;
    },
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    clearUser: (state) => {
      (state.userData = {}),
        (state.allUsers = []),
        (state.data = {}),
        (state.loading = false),
        (state.error = null);
    },
    // Establece el estado de carga del usuario
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Actualiza un campo específico en los datos del usuario
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
    // Limpia los datos del usuario
    clearUserData: (state) => {
      state.data = {
        username: "",
        email: "",
        emailVerified: "",
        profilePicture: "",
        phone: "",
        birthDate: "",
        recentSearches: [],
        isAdmin: "",
        googleId: "",
        facebookId: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // =================== LOAD MESSAGES ===================
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== LOAD MESSAGES ===================
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // =================== LOAD Familiy and Friends ===================
      .addCase(getUserFriendsAndFamilyLength.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserFriendsAndFamilyLength.fulfilled, (state, action) => {
        state.loading = false;
        state.familyLength = action.payload.familyCount;
        state.friendLength = action.payload.friendsCount;
      })
      .addCase(getUserFriendsAndFamilyLength.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser, setScreen } = userSlice.actions;

export default userSlice.reducer;
