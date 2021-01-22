import {
  Button,
  Image,
  Input,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, Movie, fetchMovies } from './itunesSlice';

export function MovieTable({ movies }: { movies: Movie[] }) {
  return (
    <Table variant="simple">
      <TableCaption>List of movies from iTunes</TableCaption>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Track Name</Th>
          <Th>Director</Th>
          <Th>Country</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {movies.map((movie) => (
          <Tr key={movie.trackId}>
            <Td>
              <Image src={movie.artworkUrl100} alt="Movie image" />
            </Td>
            <Td>{movie.trackName}</Td>
            <Td>{movie.artistName}</Td>
            <Td>{movie.country}</Td>
            <Td isNumeric>{movie.trackPrice}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export function Itunes() {
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Stack>
      <Stack direction="row">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={() => dispatch(fetchMovies(searchTerm))}
        >
          Search
        </Button>
      </Stack>
      <MovieTable movies={movies} />
    </Stack>
  );
}
