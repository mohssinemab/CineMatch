const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log(user);
    if (user) {
      console.log(passwordU);
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

    if (!movieId) {
      return res.status(400).json({ message: "Missing movieId" });
    }

    const user = await UserModel.findOne({ username: username });
    if (!user) {
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
