const MovieModel = require("../models/Movie")
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

exports.getTrending = async (req, res) => {

    try{
        const url = 'https://api.themoviedb.org/3/trending/all/week?language=en-US';

        fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

        console.log("All done homie");
        res.send("All done homie");

    } catch (error) {ha
        console.error('Error getting trending : ', error);
        res.status(500).send('Internal Server Error');
    }
    
}