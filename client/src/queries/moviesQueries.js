import { gql } from '@apollo/client';

export const MOVIES_QUERY = gql`
  query moviesQuery {
    movies {
      id
      name
      genre
      watched
      rate
      director {
        name
      }
    }
  }
`;