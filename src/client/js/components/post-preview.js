import {Component, createElement as r} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const render = ({loading, post}) => {
  if (loading) {
    return r('div', {}, "Loading...");
  } else {
    return r('div', {},
      r('div', {}, `${post.title}`),
      r('div', {}, `${post.author.username}`)
    );
  }
};

const query = gql`
  query postPreview($id: ID!) {
    post(id: $id) {
      title,
      author {
        username
      }
    }
  }
`;

const renderWithData = graphql(query, {
  options: ({id}) => ({variables: {id}}),
  props: ({data: {loading, post}}) => ({loading, post}),
})(render);

// TODO renderWithDataAndSubscriptions = withSubscriptions(opts)(renderWithData)
// graphql subscriptions integration stuff
// componentDidMount() {
//   const repoName = this.props.entry.repository.full_name;
//   const updateQueryFunction = this.props.updateCommentsQuery;
//   this.subscribe(repoName, updateQueryFunction);
// }
// subscribe(repoName, updateQuery){
//   // call the undocumented "subscribe" method on Apollo Client
//   this.subscriptionObserver = this.props.client.subscribe({
//     query: SUBSCRIPTION_QUERY,
//     variables: { repoFullName: repoName },
//   }).subscribe({
//     next(data) {
//       // ... call updateQuery to integrate the new comment
//       // into the existing list of comments
//     },
//     error(err) { console.error('err', err); },
//   });
// }

const PostPreview = renderWithData;

export default PostPreview;