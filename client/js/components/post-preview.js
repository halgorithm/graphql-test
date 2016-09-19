import {Component, createElement as r} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const PostPreviewRender = ({loading, post}) => {
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

const PostPreviewWithData = graphql(query, {
  options: ({id}) => ({variables: {id}}),
  props: ({data: {loading, post}}) => ({loading, post}),
})(PostPreviewRender);

const PostPreview = PostPreviewWithData;

export default PostPreview;
