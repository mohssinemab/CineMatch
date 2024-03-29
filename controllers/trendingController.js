const fetch = require("node-fetch");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

exports.getTrending = async (req, res) => {
    try {
      const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
  
      const response = await fetch(url, options);
      const json = await response.json();
  
      const data = json.results.map((item) => ({
        poster_path: item.poster_path,
        id: item.id,
        title: item.title 
      }));
  
      console.log("All trending done homie : ", data );
      res.status(200).send(data);
    } catch (error) {
      console.error("Error getting trending : ", error);
      res.status(500).send("Internal Server Error");
    }
  };