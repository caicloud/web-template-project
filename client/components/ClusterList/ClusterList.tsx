import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { Spin } from 'antd';
import { Link } from 'react-router';
import query from './query';

export default function ClusterList({ children }) {
  if (children) {
    return children;
  }

  return (
    <Query
      query={query}
    >
      {
        ({ data, loading }) => {
          if (loading) {
            return <Spin />
          }

          return (
            <>
              cluster list:
            <ol>
              {
                data.clusterCollection.nodes.map(({ name, phase }) => (
                  <li key={name}>{name}, status: {phase} <Link to={`/clusters/${name}`}>detail</Link></li>
                ))
              }
            </ol>
            </>
          )
        }
      }
    </Query>
  );
}
