import { gql } from '@apollo/client';

export const addMovieMutation = gql`
  mutation addMovie($name: String!, $genre: String!, $watched: Boolean!, $rate: Int, $directorId: ID) {
    addMovie(name: $name, genre: $genre, watched: $watched, rate: $rate, directorId: $directorId) {
      id
    }
  }
`;