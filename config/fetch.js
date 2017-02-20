import 'isomorphic-fetch';

const option = {
  headers: {
    "User-Agent": "your UA"
  }
};

const postOption = {
  headers: {
    "User-Agent": "your UA"
  }
};

const get = (url) => {
  return fetch(url, option);
};
const post = (url, obj)=> {
  return fetch(url, Object.assign({}, postOption, obj));
};
export default {
  get,
  post
};
