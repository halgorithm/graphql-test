import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

// The default PubSub from graphql-subscriptions is based on EventEmitters. It can easily
// be replaced with a different one, e.g. https://github.com/davidyaha/graphql-redis-subscriptions
const pubsub = new PubSub();
// FIXME memory leak with EventEmitter when reloading this file several times in dev environment

// The graphql-subscription's SubscriptionManager listens to events on the provided pubsub
// and runs the proper executors on your GraphQL schema according to the rules
// defined by the setupFunctions argument.
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  // setupFunctions is a map from a GraphQL subscription name to a map of channel names and their filter functions.
  // Here, the `post(id: ID!)` subscription from our graphql schema subscribes to the PubSub's "postChanged" channel, and re-runs the subscription query
  // every time the pubsub emits an event whose payload's post.id matches the id provided to the subscription.
  setupFunctions: {
    post: (options, args) => ({
      postChanged: post => {
        return post.id === args.id;
      },
    }),
  },
});

export { subscriptionManager, pubsub };