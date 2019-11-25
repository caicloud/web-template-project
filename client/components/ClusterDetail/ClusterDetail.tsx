import React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import query from './query';

type ClusterDetailProps = WithApolloClient<{
  params: {
    name: string
  }
}>

export default withApollo(ClusterDetail);

function ClusterDetail({ params, client }: ClusterDetailProps) {
  const { data, loading } = useQuery(query, {
    variables: { nid: `Cluster:${params.name}` },
    client
  });


  if (loading) {
    return <Spin />
  }

  return (
    <span>
      cluster name is {data.node.name}
    </span>
  )
}
