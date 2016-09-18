const xhr = new XMLHttpRequest();
xhr.addEventListener('load', e => console.log(e.target.responseText));
xhr.open('POST', '/graphql');
xhr.setRequestHeader('Content-Type', 'application/graphql');
xhr.setRequestHeader('Accept', 'application/json');
xhr.send(`{
  user(id: 5) {
    id
    username
  }
}`);
