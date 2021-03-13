import { gql } from '@apollo/client';

export const DIRECTORS_QUERY = gql`
  query directorsQuery {
    directors {
      id
      name
      age
      movies {
        name
        id
      }
    }
  }
`;