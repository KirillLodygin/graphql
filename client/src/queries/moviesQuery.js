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