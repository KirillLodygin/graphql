import { gql } from '@apollo/client';

export const ADD_MOVIE_MUTATION = gql`
  mutation addMovie($name: String!, $genre: String!, $watched: Boolean!, $rate: Int, $directorId: ID) {
    addMovie(name: $name, genre: $genre, watched: $watched, rate: $rate, directorId: $directorId) {
      id
    }
  }
`;

export const DELETE_MOVIE_MUTATION = gql`
  mutation deleteMovie($id: ID) {
    deleteMovie(id: $id) {
      id
    }
  }
`;