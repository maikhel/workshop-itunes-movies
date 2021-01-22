import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../store';

export type Ebook = {
  trackId: number;
  artworkUrl100: string;
  trackName: string;
  artistName: string;
  formattedPrice: string;
  averageUserRating: number;
  userRatingCount: number;
};

type ItunesState = {
  ebooks: Ebook[];
};

export const itunesSlice = createSlice({
  name: 'itunes',
  initialState: {
    ebooks: [],
  } as ItunesState,
  reducers: {
    fetchEbooks(state, action: PayloadAction<string>) {},
    setEbooks(state, action: PayloadAction<Ebook[]>) {
      state.ebooks = action.payload;
    },
  },
});

export const { fetchEbooks, setEbooks } = itunesSlice.actions;

export const selectEbooks = (state: StoreState) => state.itunes.ebooks;
