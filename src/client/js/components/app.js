import {Component, createElement as r} from 'react';
import PostPreview from './post-preview';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {graphql, ApolloProvider} from 'react-apollo';
import {Client as WSClient} from 'subscriptions-transport-ws';
import addGraphQLSubscriptions from '../apollo-subscriptions'

export default class App extends Component {
  constructor(props) {
    super();

    let hi = true;

    const apiURL = '/graphql';
    const networkInterface = createNetworkInterface({
      uri: apiURL,
      transportBatching: true // saw this in GitHunt example
    });

    const wsClient = new WSClient(`wss://${window.location.hostname}:4000`);
    const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient
    );
    this.client = new ApolloClient({
      networkInterfaceWithSubscriptions,
      shouldBatch: true,
      dataIdFromObject: r => r.id
    });
  }

  render() {
    return r(ApolloProvider, {client: this.client}, r(PostPreview, {id: "1"}));
  }
}
