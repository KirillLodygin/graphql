import { gql } from '@apollo/client';

export const DIRECTORS_QUERY = gql`
 query directorsQuery($name: String) {
    directors(name: $name) {
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