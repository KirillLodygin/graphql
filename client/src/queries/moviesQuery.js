import { gql } from '@apollo/client';

export const MOVIES_QUERY = gql`
query moviesQuery($name: String) {
    movies(name: $name) {
      id
      name
      genre
      watched
      rate
      director {
        name
        id
      }
    }
  }
`;

export const WATCHED_QUERY = gql`
query watched_moviesQuery($watched: Boolean, $name: String) {
    watched_movies(watched: $watched, name: $name) {
        id
      name
      genre
      watched
      rate
      director {
        name
        id
      }
    }
}
`;