import { gql } from '@apollo/client';

export const ADD_DIRECTOR_MUTATION = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
    }
  }
`;

export const DELETE_DIRECTOR_MUTATION = gql`
  mutation deleteDirector($id: ID) {
    deleteDirector(id: $id) {
      id
    }
  }
`;

export const UPDATE_DIRECTOR_MUTATION = gql`
  mutation updateDirector($id: ID, $name: String!, $age: Int!) {
    updateDirector(id: $id, name: $name, age: $age) {
      name
    }
  }
`;