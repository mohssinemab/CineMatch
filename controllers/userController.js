const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fetch = require('node-fetch'); 


exports.registerUser = async (req, res) => {
  console.log("registerUser Route");
  try {
    // 
    if (req.body.username && req.body.password && req.body.name ) { // favoriteGenres isnt required for the moment
      //mdp hash
      console.log(req.body);

      const salt = await bcrypt.genSalt(10);
      let pass = req.body.password;
      pass = await bcrypt.hash(pass, salt);

      const favGenres = req.body.favoriteGenres? req.body.favoriteGenres : [];
      
      let user = UserModel({
        username: req.body.username,
        password: pass,
        name: req.body.name,
        favoriteGenres: favGenres
      });

      await user.save();

      console.log("Well registred ! ");
      res.status(200).json({ message: "Well registered ! " });
    } else {
      res.status(400).json({
        message: "Missing some info (User : name, username, password, favoriteGenres)",
      });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = (req, res) => {
  const userU = req.body.username;
  const passwordU = req.body.password;
  UserModel.findOne({ username: userU }).then((user) => {
    console.log("user : ",user);
    if (user) {
      console.log("password : ",passwordU);
      bcrypt.compare(passwordU, user.password).then((result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign(
            {
              user: {
                id: user._id,
                username: user.username,
                name: user.name,
              },
            },
            process.env.SIGN,
            {}
          );
          return res.status(200).json({
            name : user.name,
            username : user.username,
            message: "login success",
            token: token,
          });
        } else {
          return res.status(401).json({
            erreur: "password incorrect",
          });
        }
      });
    } else {
      return res.status(404).json({ erreur: "No Account Found" });
    }
  });
};

exports.addToWishList = async (req, res) => {
  try {
    const username = req.body.username;
    const movieId = req.body.movieId;
    console.log(username, movieId);
    if (!movieId) {
      console.log("Missing movieId");
      return res.status(400).json({ message: "Missing movieId" });
    }

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      console.log("Missing user");

      return res.status(404).json({ message: "User not found" });
    }

    // Check if movie is already in wishlist
    if (user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: "Movie already in wishlist" });
    }

    user.wishlist.push(movieId);
    await user.save();

    res.status(200).json({ message: "Movie added to wishlist" });
  } catch (error) {
    console.error("Error adding movie to wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.removeFromWishList = async (req, res) => {
  try {
    const username = req.body.username;
    const movieId = req.body.movieId;

    if (!movieId) {
      return res.status(400).json({ message: "Missing movieId" });
    }

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if movie is not in wishlist
    if (!user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: "Movie not in wishlist" });
    }

    // Remove movie from wishlist
    user.wishlist = user.wishlist.filter((id) => id !== movieId);
    await user.save();

    res.status(200).json({ message: "Movie removed from wishlist" });
  } catch (error) {
    console.error("Error removing movie from wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getWishList = async (req, res) => {
  try {
    const username = req.body.username;

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const username = req.params.username;
    console.log("Suggestions - username : ", username);

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Suggestions - user : ", user);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };

    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${user.favoriteGenres.join(',')}`;

    const tmdbResponse = await fetch(url, options);
    const data = await tmdbResponse.json();
    console.log(" tmdbResponse : ", data.results);

    res.status(200).json({ movies: data.results });

  } catch (error) {
    console.error("Error getting favorite genres:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.isLogged = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Authorization Header:', authHeader);

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401); 
  
  }

  jwt.verify(token, process.env.SIGN, (err, user) => {
    if (err) {
      console.log('Error verifying token:', err);
      return res.sendStatus(403);
    }

    // console.log('User verified:', user); // Log the verified user
    req.user = user;
    next(); 
  });
};

exports.verifyToken = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, process.env.SIGN, (err, user) => {
      if (err) return res.sendStatus(403);
      console.log('User verified:', user);
      res.sendStatus(200); 
  });
};