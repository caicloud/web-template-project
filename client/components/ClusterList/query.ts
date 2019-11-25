import gql from 'graphql-tag';

export default gql`
  {
    clusterCollection {
      total
      nodes {
        name
        phase
      }
    }
  }
`;
