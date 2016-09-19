import {Component, createElement as r} from 'react';
import PostPreview from './post-preview';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {graphql, ApolloProvider} from 'react-apollo';

export default class App extends Component {
  constructor(props) {
    super();
    const apiURL = 'https://graphql-test-halgorithm.c9users.io/graphql';
    const networkInterface = createNetworkInterface(apiURL);
    this.client = new ApolloClient({
      networkInterface,
      shouldBatch: true,
      dataIdFromObject: r => r.id
    });
  }

  render() {
    return r(ApolloProvider, {client: this.client}, r(PostPreview, {id: "1"}));
  }
}
