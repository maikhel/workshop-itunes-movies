import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreState } from '../store';

export type Movie = {
  trackId: number;
  artworkUrl100: string;
  artistName: string;
  trackName: string;
  country: string;
  trackPrice: number;
};

type ItunesState = {
  movies: Movie[];
};

export const itunesSlice = createSlice({
  name: 'itunes',
  initialState: {
    movies: [],
  } as ItunesState,
  reducers: {
    fetchMovies(state, action: PayloadAction<string>) {},
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
});

export const { fetchMovies, setMovies } = itunesSlice.actions;

export const selectMovies = (state: StoreState) => state.itunes.movies;
