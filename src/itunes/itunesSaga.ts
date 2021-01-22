import { call, put, takeLatest } from 'redux-saga/effects';
import * as yup from 'yup';
import { PayloadActionFromCreator } from '../utils';
import { fetchMovies, setMovies } from './itunesSlice';

const movieSchema = yup.object({
  trackId: yup.number().defined(),
  trackPrice: yup.number().defined(),
  artworkUrl100: yup.string().defined(),
  trackName: yup.string().defined(),
  artistName: yup.string().defined(),
  country: yup.string().defined(),
});

type ApiMovie = yup.InferType<typeof movieSchema>;

export async function getMovies(searchTerm: string): Promise<ApiMovie[]> {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=movie`
  );
  const rawData: any = await response.json();
  const data = await yup
    .object({
      resultCount: yup.number().defined(),
      results: yup.array(movieSchema).defined(),
    })
    .validate(rawData);

  return data.results;
}

export function* onFetchMovies(
  action: PayloadActionFromCreator<typeof fetchMovies>
) {
  // console.log('fetching ebooks for', action.payload);
  const movies: ApiMovie[] = yield call(getMovies, action.payload);
  yield put(setMovies(movies));
  // console.log('fetching done');
}

export function* itunesSaga() {
  yield takeLatest(fetchMovies.type, onFetchMovies);
}
