import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchWithRetry = async (url, options = {}, retries = 3, backoff = 300) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2;
      } else {
        throw error;
      }
    }
  }
};

export const fetchAuthors = createAsyncThunk("authors/fetchAuthors", async () => {
  try {
    return await fetchWithRetry("https://valid-api.example.com/authors"); 
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    throw error;
  }
});

export const addAuthorAsync = createAsyncThunk("authors/addAuthor", async (author, { rejectWithValue }) => {
  try {
    return await fetchWithRetry("https://valid-api.example.com/authors", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    });
  } catch (error) {
    console.error('Failed to add author:', error);
    return rejectWithValue(error.message);
  }
});

export const updateAuthor = createAsyncThunk("authors/updateAuthor", async ({ id, values }) => {
  try {
    return await fetchWithRetry(`https://valid-api.example.com/authors/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  } catch (error) {
    console.error('Failed to update author:', error);
    throw error;
  }
});

const authorsSlice = createSlice({
  name: "authors",
  initialState: [],
  reducers: {
    setAuthors: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addAuthorAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(addAuthorAsync.rejected, (state, action) => {
        console.error('Failed to add author:', action.payload);
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        const index = state.findIndex((author) => author.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  },
});

export const { setAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;
