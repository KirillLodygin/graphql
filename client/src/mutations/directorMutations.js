import { gql } from '@apollo/client';

export const ADD_DIRECTOR_MUTATION = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
    }
  }
`;