const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/trending/all/week?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTNlYTNkNGY1OWM1NTllZjk3NTE2YmVkNDhkMGQ4YyIsInN1YiI6IjY1ZDYwMjc1MzNhMzc2MDE4Njc4M2YzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zy0z1Sub0defogGBge8nVrMc44ucJ_sog0kfKt9Idfg'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));