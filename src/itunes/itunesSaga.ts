import { call, put, takeLatest } from 'redux-saga/effects';
import * as yup from 'yup';
import { PayloadActionFromCreator } from '../utils';
import { fetchEbooks, setEbooks } from './itunesSlice';

const ebookSchema = yup.object({
  trackId: yup.number().defined(),
  artworkUrl100: yup.string().defined(),
  trackName: yup.string().defined(),
  artistName: yup.string().defined(),
  formattedPrice: yup.string().defined(),
  averageUserRating: yup.number().defined(),
  userRatingCount: yup.number().defined(),
});

type ApiEbook = yup.InferType<typeof ebookSchema>;

export async function getEbooks(searchTerm: string): Promise<ApiEbook[]> {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=ebook`
  );
  const rawData: any = await response.json();
  const data = await yup
    .object({
      resultCount: yup.number().defined(),
      results: yup.array(ebookSchema).defined(),
    })
    .validate(rawData);

  return data.results;
}

export function* onFetchEbooks(
  action: PayloadActionFromCreator<typeof fetchEbooks>
) {
  console.log('fetching ebooks for', action.payload);
  const ebooks: ApiEbook[] = yield call(getEbooks, action.payload);
  yield put(setEbooks(ebooks));
  console.log('fetching done');
}

export function* itunesSaga() {
  yield takeLatest(fetchEbooks.type, onFetchEbooks);
}
