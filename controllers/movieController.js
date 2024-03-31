const MovieModel = require("../models/Movie");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  }
};

const axios = require("axios");

exports.getMovieDesc = async (req, res) => {
  const movieId = req.params.id;

  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  axios(url, options)
  .then((response) => {
    console.log("Movie Desc : ",response.data);
      res.json(response.data); 
  })
  .catch((err) => {
      console.error("error:" + err);
      res.status(500).json({ error: 'An error occurred while fetching the movie details' });
  });


}
