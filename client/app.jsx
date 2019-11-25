import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import routes from './routes';
import { client } from './graphql';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={browserHistory} routes={routes} />
    </ApolloProvider>
  )
}

const div = document.createElement('div');
document.body.append(div);

ReactDOM.render(<App/>, div);
