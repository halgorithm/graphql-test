import Rx from 'rxjs/Rx';
import {run} from '@cycle/rxjs-run';
import {makeDOMDriver, h} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';

function main(sources) {
  const dom$ = sources.HTTP.select().flatten()
    .map(res => JSON.parse(res.text))
    .startWith(null)
    .map(res =>
      h('div', [
        h('button#fetch-button', 'fetch'),
        res && h('div', [
          h('h2', [
            h('a', {attrs: {href: res.data.post.link}}, res.data.post.title)
          ]),
          h('small', [
            h('u', `${res.data.post.upvotes} points`),
            ' posted by ',
            h('u', res.data.post.author.username),
          ]),
          h('p', res.data.post.content)
        ])
      ])
    );

  const req$ = sources.DOM
    .select('#fetch-button')
    .events('click')
    .map(e => ({
      query: `
      query postPreview($id: ID!) {
        post(id: $id) {
          title
          author { username }
          link
          content
          upvotes
        }
      }`,
      variables: {
        id: "2",
      }
    }))
    .map(gqlRequest => ({
      url: '/graphql',
      method: 'POST',
      type: 'application/json',
      accept: 'application/json',
      send: gqlRequest,
    }));

  return {
    DOM: dom$,
    HTTP: req$,
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
