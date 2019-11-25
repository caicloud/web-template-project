import gql from 'graphql-tag';

export default gql`
  query($nid: ID!) {
    node(nid: $nid) {
      ... on Cluster {
        name
      }
    }
  }
`;
