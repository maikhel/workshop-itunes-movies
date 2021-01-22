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
import { selectEbooks, Ebook, fetchEbooks } from './itunesSlice';

export function EbookTable({ ebooks }: { ebooks: Ebook[] }) {
  return (
    <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Track Name</Th>
          <Th>Artist Name</Th>
          <Th>Rating</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ebooks.map((ebook) => (
          <Tr key={ebook.trackId}>
            <Td>
              <Image src={ebook.artworkUrl100} alt="Segun Adebayo" />
            </Td>
            <Td>{ebook.trackName}</Td>
            <Td>{ebook.artistName}</Td>
            <Td isNumeric>
              {ebook.averageUserRating} ({ebook.userRatingCount})
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export function Itunes() {
  const ebooks = useSelector(selectEbooks);
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
          onClick={() => dispatch(fetchEbooks(searchTerm))}
        >
          Search
        </Button>
      </Stack>
      <EbookTable ebooks={ebooks} />
    </Stack>
  );
}
